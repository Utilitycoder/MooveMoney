import { voiceChatInputStyles } from "@/styles/voiceChat";
import { VoiceChatWaveBarProps } from "@/types/voiceChat";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export const WaveBar: React.FC<VoiceChatWaveBarProps> = ({
  index,
  totalBars,
  audioLevel,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const baseHeight = 2;
    const maxAddition = 48;
    const centerIndex = (totalBars - 1) / 2;
    const distanceFromCenter = Math.abs(index - centerIndex);
    const relativeDistance = distanceFromCenter / (totalBars / 2);

    const heightMultiplier = 1 - relativeDistance * 0.4;
    const opacity = 1 - relativeDistance * 0.7;

    const phase = (index * Math.PI) / (totalBars / 4);
    const voiceIntensity = Math.pow(audioLevel.value, 0.8);
    const wave =
      (Math.sin(phase) * 0.2 + 0.8) * voiceIntensity * heightMultiplier;

    return {
      height: baseHeight + wave * maxAddition,
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[voiceChatInputStyles.waveBar, animatedStyle]} />
  );
};
