import { ThemeColors } from "@/constants/theme";
import { voiceChatInputStyles } from "@/styles/voiceChat";
import { IdleStateProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const IdleState: React.FC<IdleStateProps> = ({
  onStartConversation,
  buttonAnimatedStyle,
  handlePressIn,
  handlePressOut,
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      style={voiceChatInputStyles.container}
    >
      <View style={voiceChatInputStyles.idleRow}>
        <AnimatedPressable
          style={[voiceChatInputStyles.micButton, buttonAnimatedStyle]}
          onPress={onStartConversation}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#FFD93D", "#F5C842", "#E5A84B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={voiceChatInputStyles.micButtonGradient}
          >
            <Ionicons name="mic" size={24} color={ThemeColors.text} />
          </LinearGradient>
        </AnimatedPressable>
        <Text style={voiceChatInputStyles.hintText}>
          Tap to start conversation
        </Text>
      </View>
    </Animated.View>
  );
};
