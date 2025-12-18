import { Fonts, ThemeColors } from "@/constants/theme";
import { OnboardingSlideData } from "@/types/onboarding";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface OnboardingSlideProps {
  item: OnboardingSlideData;
  index: number;
  scrollX: SharedValue<number>;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  item,
  index,
  scrollX,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const iconScale = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }] };
  });

  const textOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, -50],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <View style={styles.slide}>
      <Animated.View style={[styles.iconWrapper, iconScale]}>
        <View
          style={[styles.iconGradient, { backgroundColor: item.iconBgColor }]}
        >
          <View style={styles.iconInner}>
            <Ionicons name={item.icon} size={56} color={ThemeColors.text} />
          </View>
        </View>
        <View style={styles.iconRing} />
      </Animated.View>

      <Animated.View style={[styles.textContainer, textOpacity]}>
        <Text style={styles.title}>
          {item.title}
          {"\n"}
          <Text style={styles.highlightedTitle}>{item.highlightedText}</Text>
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    marginBottom: 48,
    position: "relative",
  },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  iconInner: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: ThemeColors.border,
    top: -10,
    left: -10,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 34,
    color: ThemeColors.text,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 16,
  },
  highlightedTitle: {
    fontFamily: Fonts.brandBlack,
    color: ThemeColors.primaryDark,
  },
  description: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
});

export default OnboardingSlide;
