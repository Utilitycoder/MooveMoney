import { ThemeColors } from "@/constants/theme";
import { useChatStore } from "@/stores/chatStore";
import { chatInputStyles } from "@/styles/chat";
import { ChatInputProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const insets = useSafeAreaInsets();
  const sendScale = useSharedValue(1);
  const inputRef = useRef<TextInput>(null);
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isLoading = useChatStore((state) => state.isWaitingForResponse);

  const canSend = message.trim().length > 0;

  const handleSendPress = async () => {
    setMessage("");
    inputRef.current?.clear();

    if (!canSend) return;

    // Capture the message value BEFORE clearing
    const messageToSend = message.trim();

    // Animate the send button
    sendScale.value = withSpring(0.85, {}, () => {
      sendScale.value = withSpring(1);
    });

    setTimeout(() => {
      onSend(messageToSend);
    }, 0);
  };

  const sendAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendScale.value }],
  }));

  return (
    <View
      style={[
        chatInputStyles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      <View
        style={[
          chatInputStyles.inputWrapper,
          isFocused && chatInputStyles.inputWrapperFocused,
        ]}
      >
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={chatInputStyles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Message AI assistant..."
          placeholderTextColor={ThemeColors.textMuted}
          multiline
          editable={!isLoading}
          maxLength={100}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Send Button */}
        <AnimatedTouchable
          style={[
            chatInputStyles.sendButton,
            canSend && chatInputStyles.sendButtonActive,
            sendAnimatedStyle,
          ]}
          onPress={handleSendPress}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={ThemeColors.surface} />
          ) : (
            <Ionicons
              name="send"
              size={18}
              color={canSend ? ThemeColors.surface : ThemeColors.textMuted}
            />
          )}
        </AnimatedTouchable>
      </View>
    </View>
  );
};

export default ChatInput;
