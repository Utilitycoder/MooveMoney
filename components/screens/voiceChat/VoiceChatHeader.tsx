import { Fonts, ThemeColors } from "@/constants/theme";
import { VoiceChatHeaderProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const VoiceChatHeader: React.FC<VoiceChatHeaderProps> = ({
  state,
  isInConversation,
  onClose,
  onEndConversation,
  onClear,
}) => {
  const dotPulse = useSharedValue(0);

  useEffect(() => {
    if (
      state === "recording" ||
      state === "processing" ||
      state === "listening"
    ) {
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
    <View style={styles.header}>
      <Pressable
        style={({ pressed }) => [
          styles.headerButton,
          pressed && styles.headerButtonPressed,
        ]}
        onPress={onClose}
      >
        <Ionicons name="chevron-back" size={22} color={ThemeColors.text} />
      </Pressable>

      <View style={styles.centerContent}>
        <View style={styles.titleRow}>
          {status.showDot && (
            <Animated.View
              style={[
                styles.statusDot,
                { backgroundColor: status.color },
                dotStyle,
              ]}
            />
          )}
          <Text
            style={[styles.title, isInConversation && { color: status.color }]}
          >
            {status.text}
          </Text>
        </View>
      </View>

      {onClear ? (
        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerButtonPressed,
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
        <View style={styles.headerButtonPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderLight,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  headerButtonPlaceholder: {
    width: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
});

export default VoiceChatHeader;
