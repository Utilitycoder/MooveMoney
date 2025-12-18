import { Fonts, ThemeColors } from "@/constants/theme";
import { ChatMessage } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ChatBubbleProps {
  message: ChatMessage;
  index: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  const isUser = message.role === "user";

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(300)}
      style={[styles.container, isUser && styles.containerUser]}
    >
      {/* Avatar */}
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="sparkles" size={16} color={ThemeColors.text} />
        </View>
      )}

      {/* Bubble */}
      <View
        style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}
      >
        <Text style={[styles.text, isUser && styles.textUser]}>
          {message.content}
        </Text>
      </View>

      {/* User Avatar */}
      {isUser && (
        <View style={styles.avatarUser}>
          <Ionicons name="person" size={14} color={ThemeColors.surface} />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  containerUser: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ThemeColors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  bubbleAI: {
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: ThemeColors.text,
    borderBottomRightRadius: 4,
  },
  text: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.text,
    lineHeight: 22,
  },
  textUser: {
    color: ThemeColors.surface,
  },
});

export default ChatBubble;
