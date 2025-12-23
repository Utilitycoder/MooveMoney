import { mockService, processVoiceMessage } from "@/services/voiceChatService";
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
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const recordingOptions: RecordingOptions = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
};

export const useVoiceChat = ({
  onTransactionDetected,
  useMockService = true,
}: UseVoiceChatProps = {}): UseVoiceChatReturn => {
  // State
  const [state, setState] = useState<VoiceChatState>("idle");
  const [messages, setMessages] = useState<VoiceChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isInConversation, setIsInConversation] = useState(false);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastAudioUriRef = useRef<string | null>(null);
  const shouldContinueConversation = useRef(false);

  // Audio hooks
  const audioRecorder = useAudioRecorder(recordingOptions);
  const audioRecorderState = useAudioRecorderState(audioRecorder, 100);

  // Animation values
  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const micScale = useSharedValue(1);
  const audioLevel = useSharedValue(0);

  // Track recording state from recorder
  const isRecording = audioRecorderState.isRecording;

  // React to metering changes for audio visualization
  useEffect(() => {
    if (audioRecorderState.isRecording) {
      const metering = audioRecorderState.metering ?? -160;
      const normalizedLevel = Math.max(0, Math.min(1, (metering + 45) / 45));

      audioLevel.value = withSpring(normalizedLevel, {
        damping: 12,
        stiffness: 150,
        mass: 0.5,
      });

      micScale.value = withSpring(1 + normalizedLevel * 0.25, {
        damping: 12,
        stiffness: 150,
      });
    }
  }, [
    audioRecorderState.metering,
    audioRecorderState.isRecording,
    audioLevel,
    micScale,
  ]);

  // Start recording animation
  const startRecordingAnimation = useCallback(() => {
    pulseAnim.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    glowAnim.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [pulseAnim, glowAnim]);

  // Stop recording animation
  const stopRecordingAnimation = useCallback(() => {
    pulseAnim.value = withTiming(0, { duration: 300 });
    glowAnim.value = withTiming(0, { duration: 300 });
    micScale.value = withTiming(1, { duration: 200 });
    audioLevel.value = withTiming(0, { duration: 200 });
  }, [pulseAnim, glowAnim, micScale, audioLevel]);

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

      // Process the voice message
      const service = useMockService ? mockService : { processVoiceMessage };

      try {
        const { transcription, aiResponse } = await service.processVoiceMessage(
          uri,
          messages.map((m) => ({ role: m.role, content: m.content }))
        );

        // Add user message with transcription
        const userMessage: VoiceChatMessage = {
          id: Date.now().toString(),
          role: "user",
          content: transcription,
          timestamp: new Date(),
          audioUri: uri,
          isVoiceInput: true,
        };

        // Add AI response
        const aiMessage: VoiceChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse.content,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, aiMessage]);

        // Check for transaction intent
        if (
          aiResponse.isSendIntent &&
          aiResponse.transaction &&
          onTransactionDetected
        ) {
          onTransactionDetected(aiResponse.transaction);
          // End conversation when transaction is detected
          shouldContinueConversation.current = false;
          setIsInConversation(false);
          setState("idle");
          return;
        }

        // If still in conversation mode, auto-restart recording after a brief pause
        if (shouldContinueConversation.current && isInConversation) {
          setState("listening");
          // Small delay before starting next recording
          await new Promise((resolve) => setTimeout(resolve, 800));

          if (shouldContinueConversation.current) {
            await beginRecording();
          }
        } else {
          setState("idle");
        }
      } catch (err) {
        console.error("Processing error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to process voice message"
        );
        setState("error");
        // On error, pause conversation but don't end it
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
    audioRecorderState.isRecording,
    beginRecording,
    isInConversation,
    messages,
    onTransactionDetected,
    stopRecordingAnimation,
    useMockService,
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
      if (audioRecorderState.isRecording) {
        await audioRecorder.stop();
      }
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
      const service = useMockService ? mockService : { processVoiceMessage };
      const { transcription, aiResponse } = await service.processVoiceMessage(
        lastAudioUriRef.current,
        messages.map((m) => ({ role: m.role, content: m.content }))
      );

      const userMessage: VoiceChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: transcription,
        timestamp: new Date(),
        audioUri: lastAudioUriRef.current,
        isVoiceInput: true,
      };

      const aiMessage: VoiceChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, aiMessage]);

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

      // Continue conversation if in mode
      if (shouldContinueConversation.current && isInConversation) {
        setState("listening");
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (shouldContinueConversation.current) {
          await beginRecording();
        }
      } else {
        setState("idle");
      }
    } catch (err) {
      console.error("Retry error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process voice message"
      );
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
  };
};
