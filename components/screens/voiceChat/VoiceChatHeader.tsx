import { ThemeColors } from "@/constants/theme";
import { voiceChatHeaderStyles } from "@/styles/voiceChat";
import { VoiceChatHeaderProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  withRepeat,
  withTiming,
  interpolate,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const VoiceChatHeader: React.FC<VoiceChatHeaderProps> = ({
  state,
  onClear,
  onClose,
  isInConversation,
}) => {
  const dotPulse = useSharedValue(0);

  useEffect(() => {
    const isInProcess = [
      "listening",
      "recording",
      "responding",
      "processing",
    ].includes(state);

    if (isInProcess) {
      dotPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      dotPulse.value = withTiming(0, { duration: 200 });
    }
  }, [state, dotPulse]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(dotPulse.value, [0, 1], [0.4, 1]),
    transform: [{ scale: interpolate(dotPulse.value, [0, 1], [0.8, 1.2]) }],
  }));

  const getStatusConfig = () => {
    if (isInConversation) {
      switch (state) {
        case "recording":
          return {
            text: "Listening",
            color: ThemeColors.error,
            showDot: true,
          };
        case "processing":
          return {
            text: "Thinking",
            color: ThemeColors.primary,
            showDot: true,
          };
        case "responding":
          return {
            text: "Thinking",
            color: ThemeColors.primary,
            showDot: true,
          };
        case "listening":
          return {
            text: "Your turn",
            color: ThemeColors.success,
            showDot: true,
          };
        default:
          return {
            text: "In conversation",
            color: ThemeColors.success,
            showDot: true,
          };
      }
    }

    return {
      text: "Voice Chat",
      color: ThemeColors.textSecondary,
      showDot: false,
    };
  };

  const status = getStatusConfig();

  return (
    <View style={voiceChatHeaderStyles.header}>
      <Pressable
        style={({ pressed }) => [
          voiceChatHeaderStyles.headerButton,
          pressed && voiceChatHeaderStyles.headerButtonPressed,
        ]}
        onPress={onClose}
      >
        <Ionicons name="chevron-back" size={22} color={ThemeColors.text} />
      </Pressable>

      <View style={voiceChatHeaderStyles.centerContent}>
        <View style={voiceChatHeaderStyles.titleRow}>
          {status.showDot && (
            <Animated.View
              style={[
                voiceChatHeaderStyles.statusDot,
                { backgroundColor: status.color },
                dotStyle,
              ]}
            />
          )}
          <Text
            style={[
              voiceChatHeaderStyles.title,
              isInConversation && { color: status.color },
            ]}
          >
            {status.text}
          </Text>
        </View>
      </View>

      {onClear ? (
        <Pressable
          style={({ pressed }) => [
            voiceChatHeaderStyles.headerButton,
            pressed && voiceChatHeaderStyles.headerButtonPressed,
          ]}
          onPress={onClear}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={ThemeColors.textSecondary}
          />
        </Pressable>
      ) : (
        <View style={voiceChatHeaderStyles.headerButtonPlaceholder} />
      )}
    </View>
  );
};

export default VoiceChatHeader;
