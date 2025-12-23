import BottomSheet from "@/components/molecules/BottomSheet";
import AIFloatingButton from "@/components/screens/home/AIFloatingButton";
import BalanceCard from "@/components/screens/home/BalanceCard";
import TransactionsList from "@/components/screens/home/TransactionsList";
import UserGreeting from "@/components/screens/home/UserGreeting";
import { useMovementWallet } from "@/hooks/useMovementWallet";
import { homeStyles } from "@/styles/home";
import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { logout, user } = usePrivy();
  const { wallet } = useMovementWallet(user);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleChatPress = () => {
    router.push("/chat");
  };

  const handleVoicePress = () => {
    router.push("/voice");
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

  const username =
    (user?.linked_accounts?.[0] as { name?: string })?.name || "User";

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
    <View style={homeStyles.container}>
      {/* Sticky Header */}
      <Animated.View
        style={[
          homeStyles.stickyHeader,
          { paddingTop: insets.top + 12 },
          headerShadowStyle,
        ]}
      >
        <Animated.View style={[homeStyles.headerBg, headerBgStyle]} />
        <UserGreeting
          username={username}
          onMenuPress={() => setMenuVisible(true)}
        />
      </Animated.View>

      {/* Scrollable Content */}
      <AnimatedScrollView
        style={homeStyles.scrollView}
        contentContainerStyle={[
          homeStyles.scrollContent,
          { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Balance Card */}
        <BalanceCard
          balance="0.00"
          walletAddress={wallet?.address}
          delay={100}
        />

        {/* Transactions */}
        <TransactionsList delay={200} />
      </AnimatedScrollView>

      {/* AI Floating Button */}
      <View
        style={[homeStyles.floatingContainer, { bottom: insets.bottom + 16 }]}
      >
        <AIFloatingButton
          onChatPress={handleChatPress}
          onVoicePress={handleVoicePress}
        />
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
