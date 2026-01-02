import { ThemeColors } from "@/constants/theme";
import { chatBubbleStyles } from "@/styles/chat";
import { getMarkdownStyle } from "@/styles/markDownStyle";
import { voiceChatBubbleStyles } from "@/styles/voiceChat";
import { VoiceChatBubbleProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import Animated, { FadeIn } from "react-native-reanimated";

const VoiceChatBubble: React.FC<VoiceChatBubbleProps> = ({
  message,
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
        voiceChatBubbleStyles.container,
        isUser
          ? voiceChatBubbleStyles.userContainer
          : voiceChatBubbleStyles.assistantContainer,
      ]}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <View style={voiceChatBubbleStyles.avatarContainer}>
          <LinearGradient
            colors={["#FFD93D", "#F5C842", "#E5A84B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={voiceChatBubbleStyles.avatar}
          >
            <Ionicons name="sparkles" size={12} color={ThemeColors.text} />
          </LinearGradient>
        </View>
      )}

      <View
        style={[
          voiceChatBubbleStyles.bubble,
          isUser
            ? voiceChatBubbleStyles.userBubble
            : voiceChatBubbleStyles.aiBubble,
        ]}
      >
        <Markdown style={getMarkdownStyle(isUser)}>{message.content}</Markdown>

        <View style={voiceChatBubbleStyles.footer}>
          {message.isVoiceInput && (
            <Ionicons
              name="mic"
              size={10}
              color={isUser ? "rgba(26,26,26,0.5)" : ThemeColors.textMuted}
            />
          )}
          <Text
            style={[
              voiceChatBubbleStyles.time,
              isUser
                ? voiceChatBubbleStyles.userTime
                : voiceChatBubbleStyles.aiTime,
            ]}
          >
            {formatTime(new Date(message.timestamp))}
          </Text>
        </View>
      </View>
      {/* User avatar - Add this for user messages */}

      {isUser && (
        <View
          style={{
            ...chatBubbleStyles.avatarUser,
            alignSelf: "flex-end",
            marginLeft: 8,
          }}
        >
          {userInitials ? (
            <Text
              style={{
                color: ThemeColors.surface,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {userInitials}
            </Text>
          ) : (
            <Ionicons name="person" size={14} color={ThemeColors.surface} />
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default VoiceChatBubble;
