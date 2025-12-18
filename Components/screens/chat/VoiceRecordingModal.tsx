import { ThemeColors } from "@/constants/theme";
import { VoiceModalMode, VoiceRecordingModalProps } from "@/types/chat";
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
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PreviewContent from "./voice/PreviewContent";
import RecordingContent from "./voice/RecordingContent";
import VoiceRecordingFooter from "./voice/VoiceRecordingFooter";
import VoiceRecordingHeader from "./voice/VoiceRecordingHeader";

// Recording options with metering enabled
const recordingOptions: RecordingOptions = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
};

const VoiceRecordingModal: React.FC<VoiceRecordingModalProps> = ({
  visible,
  onClose,
  onTranscription,
}) => {
  const insets = useSafeAreaInsets();
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [mode, setMode] = useState<VoiceModalMode>("recording");
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Use expo-audio hooks - poll every 100ms for smoother animations
  const audioRecorder = useAudioRecorder(recordingOptions);
  const audioRecorderState = useAudioRecorderState(audioRecorder, 100);

  // Audio player for preview
  const player = useAudioPlayer(recordingUri ?? undefined);
  const playerStatus = useAudioPlayerStatus(player);

  const [isRecording, setIsRecording] = useState(false);
  const wasPlayingRef = useRef(false);

  // Track when audio finishes playing - only reset when player TRANSITIONS from playing to not playing
  const isPlayerPlaying = playerStatus?.playing ?? false;

  useEffect(() => {
    // Only reset isPlaying when player was playing and now stopped (transition detection)
    if (wasPlayingRef.current && !isPlayerPlaying) {
      setIsPlaying(false);
    }
    // Track the previous playing state
    wasPlayingRef.current = isPlayerPlaying;
  }, [isPlayerPlaying]);

  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const micScale = useSharedValue(1);
  const audioLevel = useSharedValue(0);

  // React to metering changes from the hook - use withSpring for smoother response
  useEffect(() => {
    if (audioRecorderState.isRecording) {
      const metering = audioRecorderState.metering ?? -160;

      // Metering value ranges from about -160 (silence) to 0 (loud)
      // Normalize to 0-1 range, using -45 to 0 as the useful range for speech
      const normalizedLevel = Math.max(0, Math.min(1, (metering + 45) / 45));

      // Use withSpring for natural, bouncy response
      audioLevel.value = withSpring(normalizedLevel, {
        damping: 12,
        stiffness: 150,
        mass: 0.5,
      });

      // Scale the AI icon based on audio level
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

  // Start recording and animations when modal becomes visible
  useEffect(() => {
    if (visible) {
      // Reset state
      setMode("recording");
      setRecordingUri(null);
      setIsPlaying(false);

      // Start pulse animations immediately when modal opens
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

      // Start recording
      startRecording();
    } else {
      // Stop animations
      pulseAnim.value = withTiming(0, { duration: 300 });
      glowAnim.value = withTiming(0, { duration: 300 });
      micScale.value = withTiming(1, { duration: 200 });
      audioLevel.value = withTiming(0, { duration: 200 });

      stopRecording();
      if (player) {
        player.pause();
      }
    }

    return () => {
      stopRecording();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const startRecording = async () => {
    try {
      // Request permission using the new API
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        onClose();
        return;
      }

      // Enable recording mode FIRST (required for iOS)
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      // Small delay to ensure audio mode is fully applied on iOS
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Prepare the recorder before starting (required by expo-audio)
      await audioRecorder.prepareToRecordAsync();

      // Start recording
      audioRecorder.record();
      setIsRecording(true);
      setRecordingDuration(0);

      // Timer for duration
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      onClose();
    }
  };

  const stopRecording = async (goToPreview = false) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    try {
      // Use our state instead of audioRecorder.isRecording to avoid native object access errors
      if (isRecording && audioRecorder) {
        try {
          await audioRecorder.stop();
          // Get the recording URI
          const uri = audioRecorder.uri;
          if (uri && goToPreview) {
            setRecordingUri(uri);
            setMode("preview");
          }
        } catch (recorderError) {
          // Recorder might already be stopped or cleaned up, ignore
          console.warn("Recorder stop warning:", recorderError);
        }
      }
      // Disable recording mode
      await setAudioModeAsync({
        allowsRecording: false,
      });
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }

    setIsRecording(false);
  };

  // Stop recording and go to preview mode
  const handleStopRecording = async () => {
    await stopRecording(true);
  };

  // Play/pause the recording in preview mode
  const handlePlayPause = async () => {
    if (!player) return;

    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      // Set playing state immediately for responsive UI
      setIsPlaying(true);

      // Only seek to beginning if audio has finished (position near end)
      const currentPos = playerStatus?.currentTime ?? 0;
      const duration = playerStatus?.duration ?? 0;

      // If we're near the end (within 500ms) or at 0, seek to start
      if (duration > 0 && (duration - currentPos < 0.5 || currentPos === 0)) {
        player.seekTo(0);
      }

      player.play();
    }
  };

  // Re-record - go back to recording mode
  const handleReRecord = async () => {
    // Stop playback first
    if (player) {
      player.pause();
    }
    setIsPlaying(false);

    // Reset state
    setMode("recording");
    setRecordingUri(null);
    setRecordingDuration(0);

    // Small delay to ensure playback is fully stopped before recording
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Start new recording
    await startRecording();
  };

  const handleSend = async () => {
    if (player) {
      player.pause();
    }

    // Simulate transcription (replace with actual speech-to-text API)
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
  };

  const handleCancel = async () => {
    await stopRecording();
    if (player) {
      player.pause();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <VoiceRecordingHeader mode={mode} onClose={handleCancel} />

        {/* Main Content */}
        <View style={styles.content}>
          {mode === "recording" ? (
            <RecordingContent
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              pulseAnim={pulseAnim}
              glowAnim={glowAnim}
              micScale={micScale}
              audioLevel={audioLevel}
            />
          ) : (
            <PreviewContent
              isPlaying={isPlaying}
              recordingDuration={recordingDuration}
              onPlayPause={handlePlayPause}
            />
          )}
        </View>

        {/* Footer */}
        <VoiceRecordingFooter
          mode={mode}
          paddingBottom={insets.bottom + 24}
          onCancel={handleCancel}
          onStopRecording={handleStopRecording}
          onReRecord={handleReRecord}
          onSend={handleSend}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});

export default VoiceRecordingModal;
