import BottomSheet from "@/components/molecules/BottomSheet";
import AIFloatingButton from "@/components/screens/home/AIFloatingButton";
import BalanceCard from "@/components/screens/home/BalanceCard";
import TransactionsList from "@/components/screens/home/TransactionsList";
import UserGreeting from "@/components/screens/home/UserGreeting";
import { ThemeColors } from "@/constants/theme";
import { usePrivy } from "@privy-io/expo";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout, user } = usePrivy();
  const [menuVisible, setMenuVisible] = useState(false);
  const scrollY = useSharedValue(0);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(app)/(public)/login" as Href);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleAIPress = () => {
    router.push("/(app)/(auth)/chat");
  };

  const menuOptions = [
    {
      label: "Settings",
      icon: "settings-outline" as const,
      onPress: () => console.log("Settings pressed"),
    },
    {
      label: "Help & Support",
      icon: "help-circle-outline" as const,
      onPress: () => console.log("Help pressed"),
    },
    {
      label: "Logout",
      icon: "log-out-outline" as const,
      onPress: handleLogout,
      destructive: true,
    },
  ];

  const linkedAccount = user?.linked_accounts?.[0] as
    | { name?: string }
    | undefined;
  const username = linkedAccount?.name || "User";

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Header background appears on scroll
  const headerBgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 60], [0, 1]),
  }));

  // Header shadow appears on scroll
  const headerShadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(scrollY.value, [0, 60], [0, 0.08]),
    elevation: interpolate(scrollY.value, [0, 60], [0, 4]),
  }));

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <Animated.View
        style={[
          styles.stickyHeader,
          { paddingTop: insets.top + 12 },
          headerShadowStyle,
        ]}
      >
        <Animated.View style={[styles.headerBg, headerBgStyle]} />
        <UserGreeting
          username={username}
          onMenuPress={() => setMenuVisible(true)}
        />
      </Animated.View>

      {/* Scrollable Content */}
      <AnimatedScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Balance Card */}
        <BalanceCard balance="0.00" delay={100} />

        {/* Transactions */}
        <TransactionsList delay={200} />
      </AnimatedScrollView>

      {/* AI Floating Button */}
      <View style={[styles.floatingContainer, { bottom: insets.bottom + 16 }]}>
        <AIFloatingButton onPress={handleAIPress} />
      </View>

      {/* Menu Bottom Sheet */}
      <BottomSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        options={menuOptions}
        title="Menu"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ThemeColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 24,
  },
  floatingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
