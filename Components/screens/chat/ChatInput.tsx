import { ThemeColors } from "@/constants/theme";
import { chatInputStyles } from "@/styles/chat";
import { ChatInputProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import VoiceRecordingModal from "./VoiceRecordingModal";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  isLoading = false,
  placeholder = "Message AI assistant...",
}) => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const sendScale = useSharedValue(1);
  const micScale = useSharedValue(1);

  const canSend = value.trim().length > 0 && !isLoading;

  const handleSendPress = () => {
    if (canSend) {
      sendScale.value = withSpring(0.85, {}, () => {
        sendScale.value = withSpring(1);
      });
      onSend();
    }
  };

  const handleMicPress = () => {
    micScale.value = withSpring(0.85, {}, () => {
      micScale.value = withSpring(1);
    });
    setShowVoiceModal(true);
  };

  const handleTranscription = (text: string) => {
    onChangeText(text);
  };

  const sendAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendScale.value }],
  }));

  const micAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }));

  return (
    <>
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
          {/* Voice Button */}
          <AnimatedTouchable
            style={[chatInputStyles.micButton, micAnimatedStyle]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={22} color={ThemeColors.primaryDark} />
          </AnimatedTouchable>

          {/* Text Input */}
          <TextInput
            style={chatInputStyles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={ThemeColors.textMuted}
            multiline
            maxLength={1000}
            editable={!isLoading}
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

      {/* Voice Recording Modal */}
      <VoiceRecordingModal
        visible={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onTranscription={handleTranscription}
      />
    </>
  );
};

export default ChatInput;
