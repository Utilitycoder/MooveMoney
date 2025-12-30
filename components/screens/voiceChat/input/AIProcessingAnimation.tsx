import { ThemeColors } from "@/constants/theme";
import { voiceChatInputStyles } from "@/styles/voiceChat";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export const AIProcessingAnimation = () => {
  return (
    <View style={voiceChatInputStyles.processingRow}>
      <View style={{ width: 60, height: 40, alignItems: "center", justifyContent: "center" }}>
        <AIOrb delay={0} index={0} />
        <AIOrb delay={200} index={1} />
        <AIOrb delay={400} index={2} />
      </View>
    </View>
  );
};

const AIOrb: React.FC<{ delay: number; index: number }> = ({ delay, index }) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0.4);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.5, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      rotation.value = withRepeat(
        withTiming(1, { duration: 2500, easing: Easing.linear }),
        -1,
        false
      );
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, scale, opacity, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    const radius = 12;
    const angle = rotation.value * 2 * Math.PI + (index * 2 * Math.PI) / 3;
    const tx = Math.cos(angle) * radius;
    const ty = Math.sin(angle) * (radius * 0.5);

    return {
      position: "absolute",
      transform: [
        { translateX: tx },
        { translateY: ty },
        { scale: scale.value },
      ],
      opacity: opacity.value,
      shadowColor: ThemeColors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
    };
  });

  return (
    <Animated.View
      style={[voiceChatInputStyles.processingDot, animatedStyle]}
    />
  );
};
