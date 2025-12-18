import { ThemeColors } from "@/constants/theme";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface PaginationDotProps {
  index: number;
  currentIndex: number;
  scrollX: SharedValue<number>;
}

const PaginationDot: React.FC<PaginationDotProps> = ({
  index,
  currentIndex,
  scrollX,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 28, 8],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolation.CLAMP
    );
    return {
      width: dotWidth,
      opacity,
      backgroundColor:
        index === currentIndex ? ThemeColors.primary : ThemeColors.border,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

interface PaginationDotsProps {
  count: number;
  currentIndex: number;
  scrollX: SharedValue<number>;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  currentIndex,
  scrollX,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <PaginationDot
          key={index}
          index={index}
          currentIndex={currentIndex}
          scrollX={scrollX}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default PaginationDots;
