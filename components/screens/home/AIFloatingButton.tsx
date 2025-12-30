import { ThemeColors } from "@/constants/theme";
import { floatButtonStyles } from "@/styles/floatButton";
import { AIFloatingButtonProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeInUp,
  ZoomIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({
  onChatPress,
  onVoicePress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Icon animation only (safe)
  const iconRotation = useSharedValue(0);
  const iconScale = useSharedValue(1);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    iconScale.value = withSequence(
      withTiming(0.7, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    iconRotation.value = withTiming(isOpen ? 0 : 180, {
      duration: 300,
    });
  };

  const handleChatPress = () => {
    setIsOpen(false);
    onChatPress?.();
  };

  const handleVoicePress = () => {
    setIsOpen(false);
    onVoicePress?.();
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${iconRotation.value}deg` },
      { scale: iconScale.value },
    ],
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(400)}
      style={floatButtonStyles.container}
    >
      {/* Chat Button */}
      {isOpen && (
        <AnimatedTouchable
          entering={ZoomIn.duration(200)}
          exiting={ZoomOut.duration(150)}
          style={[floatButtonStyles.menuButton, floatButtonStyles.chatButton]}
          onPress={handleChatPress}
        >
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={24}
            color={ThemeColors.text}
          />
        </AnimatedTouchable>
      )}

      {/* Voice Button */}
      {isOpen && (
        <AnimatedTouchable
          entering={ZoomIn.delay(100).duration(200)}
          exiting={ZoomOut.duration(150)}
          style={[floatButtonStyles.menuButton, floatButtonStyles.voiceButton]}
          onPress={handleVoicePress}
        >
          <Ionicons name="mic" size={24} color={ThemeColors.text} />
        </AnimatedTouchable>
      )}

      {/* Main Button */}
      <AnimatedTouchable
        style={floatButtonStyles.button}
        onPress={toggleMenu}
        activeOpacity={0.9}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={isOpen ? "close" : "sparkles"}
            size={24}
            color={ThemeColors.text}
          />
        </Animated.View>
      </AnimatedTouchable>
    </Animated.View>
  );
};

export default AIFloatingButton;
