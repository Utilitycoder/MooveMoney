import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { TransactionHashCardProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const TransactionHashCard: React.FC<TransactionHashCardProps> = ({
  result,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  // Animation values
  const progress = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const backgroundOpacity = useSharedValue(0);

  const handleCopy = async () => {
    await onCopy(result.transactionId!, "Transaction Hash");

    // Set copied state
    setCopied(true);

    // Button press feedback - smooth micro-interaction
    buttonScale.value = withSequence(
      withTiming(0.98, {
        duration: 100,
        easing: Easing.out(Easing.quad),
      }),
      withSpring(1, {
        damping: 18,
        stiffness: 300,
      })
    );

    // Main animation sequence - smooth and synchronized
    progress.value = withTiming(1, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Icon rotation - smooth continuous rotation
    iconRotation.value = withTiming(360, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Background color fade - smooth transition
    backgroundOpacity.value = withSequence(
      withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      }),
      withDelay(
        1500,
        withTiming(0, {
          duration: 400,
          easing: Easing.in(Easing.quad),
        })
      )
    );

    // Reset after animation completes
    setTimeout(() => {
      progress.value = withTiming(0, {
        duration: 400,
        easing: Easing.in(Easing.quad),
      });
      iconRotation.value = withTiming(0, {
        duration: 400,
        easing: Easing.in(Easing.quad),
      });
      setTimeout(() => {
        setCopied(false);
      }, 400);
    }, 2000);
  };

  // Icon animation - smooth rotation with gentle scale
  const iconAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 0.4, 0.7, 1],
      [1, 1.1, 1.02, 1],
      "clamp"
    );
    const rotate = `${iconRotation.value}deg`;

    return {
      transform: [{ rotate }, { scale }],
    };
  });

  // Text animation - smooth fade with minimal movement
  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.3, 0.6, 1],
      [1, 0.3, 0, 0],
      "clamp"
    );
    const translateY = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, -3, -4],
      "clamp"
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // Checkmark animation - smooth entrance
  const checkmarkAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.4, 0.6, 1],
      [0, 0, 1, 1],
      "clamp"
    );
    const scale = interpolate(
      progress.value,
      [0, 0.4, 0.6, 0.8, 1],
      [0.9, 0.9, 1.02, 1, 1],
      "clamp"
    );
    const translateY = interpolate(
      progress.value,
      [0, 0.4, 0.6, 1],
      [2, 2, 0, 0],
      "clamp"
    );

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  // Button background animation - smooth color transition
  const buttonBackgroundStyle = useAnimatedStyle(() => {
    const bgOpacity = backgroundOpacity.value;
    const borderInterpolation = interpolate(
      backgroundOpacity.value,
      [0, 0.5, 1],
      [0, 0.5, 1]
    );

    return {
      backgroundColor: `rgba(34, 197, 94, ${bgOpacity * 0.08})`,
      borderColor:
        borderInterpolation > 0.3
          ? ThemeColors.success
          : ThemeColors.borderLight,
    };
  });

  // Button scale animation
  const buttonScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  if (!result?.transactionId) return null;

  return (
    <View style={transactionDetailsStyles.hashSection}>
      <Text style={transactionDetailsStyles.sectionTitle}>
        Transaction Hash
      </Text>
      <View style={transactionDetailsStyles.hashCard}>
        <View style={transactionDetailsStyles.hashHeader}>
          <View style={transactionDetailsStyles.hashIconContainer}>
            <Ionicons
              name="finger-print-outline"
              size={20}
              color={ThemeColors.primaryDark}
            />
          </View>
          <Text style={transactionDetailsStyles.hashValue} selectable>
            {result.transactionId}
          </Text>
        </View>
        <Animated.View style={buttonScaleStyle}>
          <Animated.View
            style={[
              transactionDetailsStyles.copyButtonLarge,
              buttonBackgroundStyle,
            ]}
          >
            <Pressable
              onPress={handleCopy}
              style={transactionDetailsStyles.copyButtonTouchable}
            >
              <Animated.View style={iconAnimatedStyle}>
                <Ionicons
                  name={copied ? "checkmark-circle" : "copy-outline"}
                  size={18}
                  color={copied ? ThemeColors.success : ThemeColors.primary}
                />
              </Animated.View>
              <View
                style={[
                  transactionDetailsStyles.copyButtonTextContainer,
                  copied &&
                    transactionDetailsStyles.copyButtonTextContainerCopied,
                  { marginLeft: copied ? 3 : 10 },
                ]}
              >
                <Animated.Text
                  style={[
                    transactionDetailsStyles.copyButtonText,
                    textAnimatedStyle,
                  ]}
                >
                  Copy Hash
                </Animated.Text>
                <Animated.Text
                  style={[
                    transactionDetailsStyles.copyButtonText,
                    transactionDetailsStyles.copiedText,
                    checkmarkAnimatedStyle,
                  ]}
                >
                  Copied!
                </Animated.Text>
              </View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};
