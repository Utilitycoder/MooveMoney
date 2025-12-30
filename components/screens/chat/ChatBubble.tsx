import { ThemeColors } from "@/constants/theme";
import { chatBubbleStyles } from "@/styles/chat";
import { getMarkdownStyle } from "@/styles/markDownStyle";
import { ChatBubbleProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";
import Animated, { FadeInDown } from "react-native-reanimated";

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  const isUser = message.role === "user";

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(300)}
      style={[
        chatBubbleStyles.container,
        isUser && chatBubbleStyles.containerUser,
      ]}
    >
      {/* Avatar */}
      {!isUser && (
        <View style={chatBubbleStyles.avatar}>
          <Ionicons name="sparkles" size={16} color={ThemeColors.text} />
        </View>
      )}

      {/* Bubble */}
      <View
        style={[
          chatBubbleStyles.bubble,
          isUser ? chatBubbleStyles.bubbleUser : chatBubbleStyles.bubbleAI,
        ]}
      >
        <Markdown style={getMarkdownStyle(isUser)}>{message.content}</Markdown>
      </View>

      {/* User Avatar */}
      {isUser && (
        <View style={chatBubbleStyles.avatarUser}>
          <Ionicons name="person" size={14} color={ThemeColors.surface} />
        </View>
      )}
    </Animated.View>
  );
};

export default ChatBubble;
