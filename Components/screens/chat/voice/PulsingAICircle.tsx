import { ThemeColors } from "@/constants/theme";
import { PulsingAICircleProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const PulsingAICircle: React.FC<PulsingAICircleProps> = ({
  pulseAnim,
  glowAnim,
  micScale,
  audioLevel,
}) => {
  // Outer pulse ring 1 - responds to audio
  const pulse1Style = useAnimatedStyle(() => {
    const baseScale = interpolate(pulseAnim.value, [0, 1], [1, 1.3]);
    const audioBoost = audioLevel.value * 0.5;
    const scale = baseScale + audioBoost;

    const baseOpacity = interpolate(
      pulseAnim.value,
      [0, 0.5, 1],
      [0.2, 0.1, 0]
    );
    const audioOpacity = audioLevel.value * 0.4;

    return {
      transform: [{ scale }],
      opacity: Math.min(0.6, baseOpacity + audioOpacity),
    };
  });

  // Outer pulse ring 2 - responds to audio (slightly delayed feel)
  const pulse2Style = useAnimatedStyle(() => {
    const baseScale = interpolate(pulseAnim.value, [0, 1], [1, 1.2]);
    const audioBoost = audioLevel.value * 0.3;
    const scale = baseScale + audioBoost;

    const baseOpacity = interpolate(
      pulseAnim.value,
      [0, 0.5, 1],
      [0.3, 0.15, 0]
    );
    const audioOpacity = audioLevel.value * 0.5;

    return {
      transform: [{ scale }],
      opacity: Math.min(0.7, baseOpacity + audioOpacity),
    };
  });

  // Inner glow animation - responds strongly to audio
  const innerGlowStyle = useAnimatedStyle(() => {
    const baseOpacity = interpolate(glowAnim.value, [0, 1], [0.4, 0.6]);
    const audioBoost = audioLevel.value * 0.4;
    const baseScale = 1;
    const audioScale = audioLevel.value * 0.15;

    return {
      opacity: Math.min(1, baseOpacity + audioBoost),
      transform: [{ scale: baseScale + audioScale }],
    };
  });

  // AI scale animation - responds to audio
  const aiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }));

  return (
    <View style={styles.aiContainer}>
      {/* Pulse rings */}
      <Animated.View
        style={[styles.pulseRing, styles.pulseRing1, pulse1Style]}
      />
      <Animated.View
        style={[styles.pulseRing, styles.pulseRing2, pulse2Style]}
      />

      {/* Inner glow */}
      <Animated.View style={[styles.innerGlow, innerGlowStyle]} />

      {/* AI circle */}
      <Animated.View style={[styles.aiCircle, aiStyle]}>
        <Ionicons name="sparkles" size={52} color={ThemeColors.text} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  aiContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  pulseRing: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: ThemeColors.primary,
  },
  pulseRing1: {
    width: 200,
    height: 200,
  },
  pulseRing2: {
    width: 160,
    height: 160,
  },
  innerGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: ThemeColors.primary,
  },
  aiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
});

export default PulsingAICircle;
