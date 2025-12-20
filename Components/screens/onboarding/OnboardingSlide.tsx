import { ThemeColors } from "@/constants/theme";
import { onboardingSlideStyles } from "@/styles/onboarding";
import { OnboardingSlideProps } from "@/types/onboarding";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

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
    <View style={{ ...onboardingSlideStyles.slide, width }}>
      <Animated.View style={[onboardingSlideStyles.iconWrapper, iconScale]}>
        <View
          style={[
            onboardingSlideStyles.iconGradient,
            { backgroundColor: item.iconBgColor },
          ]}
        >
          <View style={onboardingSlideStyles.iconInner}>
            <Ionicons name={item.icon} size={56} color={ThemeColors.text} />
          </View>
        </View>
        <View style={onboardingSlideStyles.iconRing} />
      </Animated.View>

      <Animated.View style={[onboardingSlideStyles.textContainer, textOpacity]}>
        <Text style={onboardingSlideStyles.title}>
          {item.title}
          {"\n"}
          <Text style={onboardingSlideStyles.highlightedTitle}>
            {item.highlightedText}
          </Text>
        </Text>
        <Text style={onboardingSlideStyles.description}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default OnboardingSlide;
