import { useCallback, useEffect } from "react";
import {
    Easing,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export const useVoiceAnimations = (audioRecorderState: any) => {
  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const micScale = useSharedValue(1);
  const audioLevel = useSharedValue(0);

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

  return {
    animations: {
      pulseAnim,
      glowAnim,
      micScale,
      audioLevel,
    },
    startRecordingAnimation,
    stopRecordingAnimation,
  };
};
