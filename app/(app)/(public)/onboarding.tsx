import PaginationDots from "@/components/molecules/PaginationDots";
import OnboardingSlide from "@/components/screens/onboarding/OnboardingSlide";
import { ThemeColors } from "@/constants/theme";
import { ONBOARDING_SLIDES } from "@/data/onboarding";
import { useAppStore } from "@/stores/appStore";
import { onBoardingStyles } from "@/styles/onboarding";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const buttonScale = useSharedValue(1);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

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

  useEffect(() => {
    buttonScale.value = withSequence(
      withTiming(0.96, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const onBoardCompleted = useAppStore((state) => state.onboardingCompleted);

  const setOnboardingComplete = useAppStore(
    (state) => state.setOnboardingCompleted
  );

  const handleGetStarted = () => {
    if (!onBoardCompleted) setOnboardingComplete(true);
    router.replace("/login");
  };

  const handleSkip = () => {
    if (!onBoardCompleted) setOnboardingComplete(true);
    router.replace("/login");
  };

  const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={[onBoardingStyles.container, { paddingTop: insets.top }]}>
      {/* Skip Button */}
      <View style={onBoardingStyles.header}>
        <View />
        <TouchableOpacity
          onPress={handleSkip}
          style={onBoardingStyles.skipButton}
        >
          <Text style={onBoardingStyles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        renderItem={({ item, index }) => (
          <OnboardingSlide item={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Bottom Section */}
      <Animated.View
        entering={FadeInDown.delay(400)}
        style={[
          onBoardingStyles.bottomSection,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        {/* Pagination Dots */}
        <PaginationDots
          count={ONBOARDING_SLIDES.length}
          currentIndex={currentIndex}
          scrollX={scrollX}
        />

        {/* Action Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            style={onBoardingStyles.primaryButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={onBoardingStyles.primaryButtonText}>
              {isLastSlide ? "Get Started" : "Continue"}
            </Text>
            <View style={onBoardingStyles.buttonIconContainer}>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={ThemeColors.text}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
