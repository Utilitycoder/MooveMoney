import { ThemeColors } from "@/constants/theme";
import { WaveBarProps } from "@/types/chat";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

// Number of wave bars
export const NUM_BARS = 9;

const WaveBar: React.FC<WaveBarProps> = ({ index, audioLevel }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const minHeight = 8;
    const maxHeight = 56;

    // Create variation between bars - center bars are taller
    const centerIndex = (NUM_BARS - 1) / 2;
    const distanceFromCenter = Math.abs(index - centerIndex);
    const heightMultiplier = 1 - distanceFromCenter * 0.12;

    // Calculate height based on audio level (0-1)
    const targetHeight =
      minHeight + audioLevel.value * (maxHeight - minHeight) * heightMultiplier;

    return {
      height: targetHeight,
    };
  });

  return <Animated.View style={[styles.waveBar, animatedStyle]} />;
};

const styles = StyleSheet.create({
  waveBar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.primary,
  },
});

export default WaveBar;
