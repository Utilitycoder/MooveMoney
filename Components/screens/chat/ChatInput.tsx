import { Fonts, ThemeColors } from "@/constants/theme";
import { ChatInputProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import VoiceRecordingModal from "./VoiceRecordingModal";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  isLoading = false,
  placeholder = "Message AI assistant...",
}) => {
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
      <View style={styles.container}>
        <View
          style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}
        >
          {/* Voice Button */}
          <AnimatedTouchable
            style={[styles.micButton, micAnimatedStyle]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={22} color={ThemeColors.primaryDark} />
          </AnimatedTouchable>

          {/* Text Input */}
          <TextInput
            style={styles.input}
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
              styles.sendButton,
              canSend && styles.sendButtonActive,
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: ThemeColors.background,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: ThemeColors.surface,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: ThemeColors.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  inputWrapperFocused: {
    borderColor: ThemeColors.primary,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(245, 200, 66, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.text,
    paddingHorizontal: 4,
    paddingVertical: 10,
    maxHeight: 120,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ThemeColors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: ThemeColors.text,
  },
});

export default ChatInput;
