import {
  UseVoiceChatProps,
  UseVoiceChatReturn,
  VoiceChatMessage,
  VoiceChatState,
} from "@/types/voiceChat";
import {
  AudioModule,
  RecordingOptions,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useVoiceAnimations } from "./useVoiceAnimations";
import { useVoiceProcessor } from "./useVoiceProcessing";

import { useCallback, useEffect, useRef, useState } from "react";

// Sanitize error messages for user display
const sanitizeErrorMessage = (err: unknown): string => {
  console.error("Voice chat error:", err);
  return "Something went wrong. Please try again.";
};

const recordingOptions: RecordingOptions = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
};

export const useVoiceChat = ({
  onTransactionDetected,
  useMockService = false,
}: UseVoiceChatProps = {}): UseVoiceChatReturn => {
  // State
  const [state, setState] = useState<VoiceChatState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isInConversation, setIsInConversation] = useState(false);
  const [messages, setMessages] = useState<VoiceChatMessage[]>([]);

  // Audio Playback
  const [responseAudioUrl, setResponseAudioUrl] = useState<string | null>(null);
  const player = useAudioPlayer(responseAudioUrl);
  const playerStatus = useAudioPlayerStatus(player);
  const onAudioCompleteRef = useRef<(() => void) | null>(null);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastAudioUriRef = useRef<string | null>(null);
  const shouldContinueConversation = useRef(false);

  // Audio hooks
  const audioRecorder = useAudioRecorder(recordingOptions);
  const audioRecorderState = useAudioRecorderState(audioRecorder, 100);
  const isRecording = audioRecorderState.isRecording;

  // Animations
  const {
    animations: { pulseAnim, glowAnim, micScale, audioLevel },
    startRecordingAnimation,
    stopRecordingAnimation,
  } = useVoiceAnimations(audioRecorderState);

  // Processor
  const { transcribe, getAIResponse } = useVoiceProcessor({ useMockService });

  // Play audio and call completion callback when done
  useEffect(() => {
    if (responseAudioUrl && player) {
      player.play();
    }
  }, [responseAudioUrl, player]);

  // Listen for playback completion
  useEffect(() => {
    if (playerStatus.didJustFinish && onAudioCompleteRef.current) {
      onAudioCompleteRef.current();
      onAudioCompleteRef.current = null;
    }
  }, [playerStatus.didJustFinish]);

  // Internal start recording function
  const beginRecording = useCallback(async () => {
    try {
      setError(null);

      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        setError("Microphone permission required");
        setIsInConversation(false);
        return false;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setState("recording");
      setRecordingDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start animations
      startRecordingAnimation();
      return true;
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError("Failed to start recording");
      setState("error");
      return false;
    }
  }, [audioRecorder, startRecordingAnimation]);

  // Start conversation - begins the continuous conversation mode
  const startConversation = useCallback(async () => {
    setIsInConversation(true);
    shouldContinueConversation.current = true;
    await beginRecording();
  }, [beginRecording]);

  // Stop recording and process, then auto-restart if in conversation mode
  const stopRecording = useCallback(async () => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop animation
    stopRecordingAnimation();

    try {
      if (!audioRecorderState.isRecording && !audioRecorder) {
        setState(isInConversation ? "listening" : "idle");
        return;
      }

      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      await setAudioModeAsync({ allowsRecording: false });

      if (!uri) {
        setError("No recording found");
        setState("error");
        return;
      }

      lastAudioUriRef.current = uri;
      setState("processing");

      try {
        // 1. Transcribe (Granular step)
        const { transcription, base64Audio } = await transcribe(uri);

        // console.log("transcription", transcription);
        // Create and add user message immediately
        const userMessage: VoiceChatMessage = {
          id: Date.now().toString(),
          role: "user",
          content: transcription,
          timestamp: new Date(),
          audioUri: uri,
          audioBase64: base64Audio,
          isVoiceInput: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setState("responding"); // Indicate AI is preparing response

        // 2. Get AI Response (Granular step)
        const aiResponse = await getAIResponse(transcription, messages);

        // Create AI response message
        const aiMessage: VoiceChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse.content,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Play audio if available and wait for completion
        if (aiResponse.audioUrl) {
          await new Promise<void>((resolve) => {
            onAudioCompleteRef.current = resolve;
            setResponseAudioUrl(aiResponse.audioUrl!);
          });
        }

        // Check for transaction intent
        if (
          aiResponse.isSendIntent &&
          aiResponse.transaction &&
          onTransactionDetected
        ) {
          onTransactionDetected(aiResponse.transaction);
          shouldContinueConversation.current = false;
          setIsInConversation(false);
          setState("idle");
          return;
        }

        // Check for end conversation action
        if (aiResponse.isEndConversation) {
          endConversation();
          return;
        }

        // If still in conversation mode, auto-restart recording after a brief pause
        if (shouldContinueConversation.current && isInConversation) {
          setState("listening");
          // Small delay before starting next recording
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (shouldContinueConversation.current) await beginRecording();
        } else {
          setState("idle");
        }
      } catch (err) {
        console.error("Processing error:", err);
        setError(sanitizeErrorMessage(err));
        setState("error");
        if (isInConversation) {
          setState("listening");
        }
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
      setError("Failed to stop recording");
      setState("error");
    }
  }, [
    audioRecorder,
    beginRecording,
    isInConversation,
    messages,
    useMockService,
    onTransactionDetected,
    stopRecordingAnimation,
    audioRecorderState.isRecording,
  ]);

  // End conversation - stops the continuous mode
  const endConversation = useCallback(async () => {
    shouldContinueConversation.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    stopRecordingAnimation();

    try {
      if (audioRecorderState.isRecording) await audioRecorder.stop();

      await setAudioModeAsync({ allowsRecording: false });
    } catch (err) {
      console.warn("Error ending conversation:", err);
    }

    setIsInConversation(false);
    setState("idle");
    setRecordingDuration(0);
  }, [audioRecorder, audioRecorderState.isRecording, stopRecordingAnimation]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  // Retry last message
  const retryLastMessage = useCallback(async () => {
    if (!lastAudioUriRef.current) {
      setError("No previous recording to retry");
      return;
    }

    setState("processing");
    setError(null);

    try {
      // 1. Transcribe (Granular step)
      const { transcription, base64Audio } = await transcribe(
        lastAudioUriRef.current
      );

      // Create and add user message immediately
      const userMessage: VoiceChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: transcription,
        timestamp: new Date(),
        audioUri: lastAudioUriRef.current,
        audioBase64: base64Audio,
        isVoiceInput: true,
      };

      setMessages((prev) => [...prev, userMessage]);
      setState("responding"); // Indicate AI is preparing response

      // 2. Get AI Response (Granular step)
      const aiResponse = await getAIResponse(transcription, messages);

      // Create AI response message
      const aiMessage: VoiceChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        // Add new fields to message logic if needed, but for now we play audio
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Play audio if available and wait for completion
      if (aiResponse.audioUrl) {
        await new Promise<void>((resolve) => {
          onAudioCompleteRef.current = resolve;
          setResponseAudioUrl(aiResponse.audioUrl!);
        });
      }

      if (
        aiResponse.isSendIntent &&
        aiResponse.transaction &&
        onTransactionDetected
      ) {
        onTransactionDetected(aiResponse.transaction);
        setIsInConversation(false);
        setState("idle");
        return;
      }

      // Check for end conversation action
      if (aiResponse.isEndConversation) {
        endConversation();
        return;
      }

      // Continue conversation if in mode
      if (shouldContinueConversation.current && isInConversation) {
        setState("listening");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (shouldContinueConversation.current) {
          await beginRecording();
        }
      } else {
        setState("idle");
      }
    } catch (err) {
      console.error("Retry error:", err);
      setError(sanitizeErrorMessage(err));
      setState("error");
    }
  }, [
    beginRecording,
    isInConversation,
    messages,
    onTransactionDetected,
    useMockService,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      shouldContinueConversation.current = false;
    };
  }, []);

  // Add message manually
  const addMessage = useCallback((message: VoiceChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    state,
    messages,
    error,
    isRecording,
    isInConversation,
    recordingDuration,
    animations: {
      pulseAnim,
      glowAnim,
      micScale,
      audioLevel,
    },
    startConversation,
    stopRecording,
    endConversation,
    clearMessages,
    retryLastMessage,
    addMessage,
  };
};
