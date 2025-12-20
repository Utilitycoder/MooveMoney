import { UseVoiceRecordingProps, VoiceModalMode } from "@/types/chat";
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

export const useVoiceRecording = ({
  visible,
  onClose,
  onTranscription,
}: UseVoiceRecordingProps) => {
  // Consolidated state
  const [state, setState] = useState({
    isPlaying: false,
    isRecording: false,
    recordingDuration: 0,
    mode: "recording" as VoiceModalMode,
    recordingUri: null as string | null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasPlayingRef = useRef(false);

  // Audio hooks
  const audioRecorder = useAudioRecorder(recordingOptions);
  const audioRecorderState = useAudioRecorderState(audioRecorder, 100);
  const player = useAudioPlayer(state.recordingUri ?? undefined);
  const playerStatus = useAudioPlayerStatus(player);

  // Animation values
  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const micScale = useSharedValue(1);
  const audioLevel = useSharedValue(0);

  // Track playback completion
  const isPlayerPlaying = playerStatus?.playing ?? false;

  useEffect(() => {
    if (wasPlayingRef.current && !isPlayerPlaying) {
      setState((s) => ({ ...s, isPlaying: false }));
    }
    wasPlayingRef.current = isPlayerPlaying;
  }, [isPlayerPlaying]);

  // React to metering changes
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

  const startRecording = useCallback(async () => {
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        onClose();
        return;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setState((s) => ({ ...s, isRecording: true, recordingDuration: 0 }));

      timerRef.current = setInterval(() => {
        setState((s) => ({ ...s, recordingDuration: s.recordingDuration + 1 }));
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      onClose();
    }
  }, [audioRecorder, onClose]);

  const stopRecording = useCallback(
    async (goToPreview = false) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      try {
        if (state.isRecording && audioRecorder) {
          try {
            await audioRecorder.stop();
            const uri = audioRecorder.uri;
            if (uri && goToPreview) {
              setState((s) => ({ ...s, recordingUri: uri, mode: "preview" }));
            }
          } catch (e) {
            console.warn("Recorder stop warning:", e);
          }
        }
        await setAudioModeAsync({ allowsRecording: false });
      } catch (error) {
        console.error("Failed to stop recording:", error);
      }

      setState((s) => ({ ...s, isRecording: false }));
    },
    [state.isRecording, audioRecorder]
  );

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setState({
        recordingDuration: 0,
        mode: "recording",
        isPlaying: false,
        recordingUri: null,
        isRecording: false,
      });

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

      startRecording();
    } else {
      pulseAnim.value = withTiming(0, { duration: 300 });
      glowAnim.value = withTiming(0, { duration: 300 });
      micScale.value = withTiming(1, { duration: 200 });
      audioLevel.value = withTiming(0, { duration: 200 });

      stopRecording();
      player?.pause();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleStopRecording = useCallback(
    () => stopRecording(true),
    [stopRecording]
  );

  const handlePlayPause = useCallback(() => {
    if (!player) return;

    if (state.isPlaying) {
      player.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    } else {
      setState((s) => ({ ...s, isPlaying: true }));
      const currentPos = playerStatus?.currentTime ?? 0;
      const duration = playerStatus?.duration ?? 0;
      if (duration > 0 && (duration - currentPos < 0.5 || currentPos === 0)) {
        player.seekTo(0);
      }
      player.play();
    }
  }, [player, playerStatus, state.isPlaying]);

  const handleReRecord = useCallback(async () => {
    player?.pause();
    setState((s) => ({
      ...s,
      mode: "recording",
      recordingUri: null,
      recordingDuration: 0,
      isPlaying: false,
    }));
    await new Promise((resolve) => setTimeout(resolve, 100));
    await startRecording();
  }, [player, startRecording]);

  const handleSend = useCallback(() => {
    player?.pause();
    const mockTranscriptions = [
      "Send 10 MOVE to alice.move",
      "What is my current balance?",
      "Show me my recent transactions",
      "Swap 50 USDC to ETH",
    ];
    const randomTranscription =
      mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];

    setTimeout(() => {
      onTranscription(randomTranscription);
      onClose();
    }, 200);
  }, [player, onTranscription, onClose]);

  const handleCancel = useCallback(async () => {
    await stopRecording();
    player?.pause();
    onClose();
  }, [stopRecording, player, onClose]);

  return {
    state,
    animations: { pulseAnim, glowAnim, micScale, audioLevel },
    handlers: {
      handleStopRecording,
      handlePlayPause,
      handleReRecord,
      handleSend,
      handleCancel,
    },
  };
};
