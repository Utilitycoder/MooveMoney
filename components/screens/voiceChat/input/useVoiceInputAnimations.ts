import { useEffect } from "react";
import {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

interface UseVoiceInputAnimationsProps {
  isRecording: boolean;
  state: string;
  micScale: { value: number };
}

export const useVoiceInputAnimations = ({
  isRecording,
  state,
  micScale,
}: UseVoiceInputAnimationsProps) => {
  const pulseRing1 = useSharedValue(0);
  const pulseRing2 = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const listeningPulse = useSharedValue(0);

  // Pulse animations for recording
  useEffect(() => {
    if (isRecording) {
      pulseRing1.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      const timeout = setTimeout(() => {
        pulseRing2.value = withRepeat(
          withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }),
          -1,
          false
        );
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      pulseRing1.value = withTiming(0, { duration: 200 });
      pulseRing2.value = withTiming(0, { duration: 200 });
    }
  }, [isRecording, pulseRing1, pulseRing2]);

  // Listening state pulse
  useEffect(() => {
    if (state === "listening") {
      listeningPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      listeningPulse.value = withTiming(0, { duration: 200 });
    }
  }, [state, listeningPulse]);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.94, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const audioScale = interpolate(
      micScale.value,
      [1, 1.25],
      [1, 1.06]
    );
    return {
      transform: [{ scale: buttonScale.value * audioScale }],
    };
  });

  const ring1Style = useAnimatedStyle(() => {
    const scale = interpolate(pulseRing1.value, [0, 1], [1, 1.8]);
    const opacity = interpolate(pulseRing1.value, [0, 0.3, 1], [0.5, 0.25, 0]);
    return { transform: [{ scale }], opacity };
  });

  const ring2Style = useAnimatedStyle(() => {
    const scale = interpolate(pulseRing2.value, [0, 1], [1, 1.6]);
    const opacity = interpolate(pulseRing2.value, [0, 0.3, 1], [0.3, 0.15, 0]);
    return { transform: [{ scale }], opacity };
  });

  const listeningStyle = useAnimatedStyle(() => ({
    opacity: listeningPulse.value,
    transform: [
      { scale: interpolate(listeningPulse.value, [0.6, 1], [0.95, 1.05]) },
    ],
  }));

  return {
    ring1Style,
    ring2Style,
    buttonAnimatedStyle,
    listeningStyle,
    handlePressIn,
    handlePressOut,
  };
};
