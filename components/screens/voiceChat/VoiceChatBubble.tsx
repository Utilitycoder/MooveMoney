import { Fonts, ThemeColors } from "@/constants/theme";
import { VoiceChatBubbleProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const VoiceChatBubble: React.FC<VoiceChatBubbleProps> = ({
  message,
  index,
  userInitials,
}) => {
  const isUser = message.role === "user";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
      ]}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={["#FFD93D", "#F5C842", "#E5A84B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Ionicons name="sparkles" size={12} color={ThemeColors.text} />
          </LinearGradient>
        </View>
      )}

      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.aiText]}>
          {message.content}
        </Text>

        <View style={styles.footer}>
          {message.isVoiceInput && (
            <Ionicons
              name="mic"
              size={10}
              color={isUser ? "rgba(26,26,26,0.5)" : ThemeColors.textMuted}
            />
          )}
          <Text style={[styles.time, isUser ? styles.userTime : styles.aiTime]}>
            {formatTime(new Date(message.timestamp))}
          </Text>
        </View>
      </View>
      {/* User avatar - Add this for user messages */}
      {isUser && (
        <View style={{ marginLeft: 8, alignSelf: "flex-end", marginBottom: 2 }}>
          <View style={styles.avatar}>
            {userInitials ? (
              <Text
                style={{
                  color: ThemeColors.text,
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {userInitials}
              </Text>
            ) : (
              <Ionicons name="person" size={12} color={ThemeColors.text} />
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  assistantContainer: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: "flex-end",
    marginBottom: 2,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: ThemeColors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: ThemeColors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  text: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    lineHeight: 21,
  },
  userText: {
    color: ThemeColors.text,
  },
  aiText: {
    color: ThemeColors.text,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
    gap: 4,
  },
  time: {
    fontFamily: Fonts.brand,
    fontSize: 10,
  },
  userTime: {
    color: "rgba(26,26,26,0.5)",
  },
  aiTime: {
    color: ThemeColors.textMuted,
  },
});

export default VoiceChatBubble;
