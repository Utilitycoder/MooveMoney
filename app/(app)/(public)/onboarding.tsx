import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  title: string;
  highlightedText: string;
  description: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    icon: "chatbubble-ellipses",
    iconBgColor: "#FEF3C7",
    title: "Your Wallet,",
    highlightedText: "Your Voice",
    description:
      "Send, receive, and manage crypto using simple chat or voice commands. No complex interfaces needed.",
  },
  {
    id: "2",
    icon: "shield-checkmark",
    iconBgColor: "#D1FAE5",
    title: "Enterprise-Grade",
    highlightedText: "Security",
    description:
      "Protected by Privy with biometric authentication, secure enclave key management, and multi-factor protection.",
  },
  {
    id: "3",
    icon: "flash",
    iconBgColor: "#FEE2E2",
    title: "Lightning",
    highlightedText: "Fast",
    description:
      "Built on Movement Network with sub-second finality. Your transfers complete before you can blink.",
  },
  {
    id: "4",
    icon: "globe",
    iconBgColor: "#E0E7FF",
    title: "Universal",
    highlightedText: "Access",
    description:
      "Financial empowerment for anyone, anywhere. No bank account needed—just your phone and crypto.",
  },
];

const OnboardingSlideItem = ({
  item,
  index,
}: {
  item: OnboardingSlide;
  index: number;
}) => {
  return (
    <View style={styles.slide}>
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}
      >
        <Ionicons name={item.icon} size={48} color={ThemeColors.text} />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.textContainer}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.highlightedTitle}>{item.highlightedText}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};

const PaginationDot = ({
  index,
  currentIndex,
}: {
  index: number;
  currentIndex: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = index === currentIndex;
    return {
      width: withSpring(isActive ? 32 : 8),
      backgroundColor: isActive ? ThemeColors.primary : ThemeColors.border,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    // router.replace("/(app)/(public)/");
  };

  const handleSkip = () => {
    // router.replace("/(app)/(public)/");
  };

  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Skip Button */}
      <Animated.View
        entering={FadeInDown.delay(300)}
        style={styles.skipContainer}
      >
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={({ item, index }) => (
          <OnboardingSlideItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Bottom Section */}
      <View
        style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}
      >
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <PaginationDot
              key={index}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {isLastSlide ? "Get Started" : "Next"}
            </Text>
            <Ionicons
              name={isLastSlide ? "rocket" : "arrow-forward"}
              size={20}
              color={ThemeColors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  skipContainer: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 36,
    color: ThemeColors.text,
    textAlign: "center",
  },
  highlightedTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 36,
    color: ThemeColors.primaryDark,
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontFamily: Fonts.brand,
    fontSize: 17,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: ThemeColors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
});
