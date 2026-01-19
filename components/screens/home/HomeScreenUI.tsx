import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";

import { Typography } from "@/components/atoms/Typography";
import BottomSheet from "@/components/molecules/BottomSheet";
import AIFloatingButton from "@/components/screens/home/AIFloatingButton";
import BalanceCard from "@/components/screens/home/BalanceCard";
import TransactionsList from "@/components/screens/home/TransactionsList";
import UserGreeting from "@/components/screens/home/UserGreeting";
import { clearAuth } from "@/lib/auth";
import { getFaucetTokens } from "@/services/walletService";
import { useAppStore } from "@/stores/appStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { homeStyles, transactionsListStyles } from "@/styles/home";
import { TransactionResult } from "@/types/chat";
import { Transaction } from "@/types/transaction";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreenUI() {
  const router = useRouter();
  const { logout } = usePrivy();
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const user = useAppStore((state) => state.user);
  const setOnboardingCompleted = useAppStore(
    (state) => state.setOnboardingCompleted
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const setTransaction = useTransactionStore((state) => state.setTransaction);

  const handleLogout = async () => {
    try {
      clearAuth();
      await logout();
    } catch (error) {
      // console.log("Logout error:", error);
    }
  };

  const handleFaucet = async () => {
    setMenuVisible(false);
    await getFaucetTokens();
  };

  const handleChatNav = (path: "/chat" | "/voice") => {
    router.push(path);
  };

  const handleTransactionPress = (transaction: Transaction) => {
    // Pass raw API response if available, otherwise use the transaction data
    const transactionData = transaction.rawApiResponse || transaction;

    // Create TransactionResult from API response
    const transactionResult: TransactionResult = {
      success: transaction.rawApiResponse?.success ?? true,
      transactionId:
        transaction.transactionId || transaction.rawApiResponse?.hash,
    };

    // Set transaction in state and navigate
    setTransaction(transactionData, transactionResult);
    router.push("/(app)/(protected)/transaction-details");
  };

  const menuOptions = [
    {
      label: "Get Free Tokens",
      icon: "water-outline" as const,
      onPress: handleFaucet,
    },
    {
      label: "Settings",
      icon: "settings-outline" as const,
      onPress: () => setOnboardingCompleted(false),
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={{ ...homeStyles.container, paddingBottom: insets.bottom }}>
      {/* Fixed Sticky Header Top */}
      <View style={[homeStyles.stickyHeader, { paddingTop: insets.top + 12 }]}>
        <UserGreeting
          username={user?.name}
          onMenuPress={() => setMenuVisible(true)}
        />
      </View>

      {/* Fixed Content Section */}
      <View style={homeStyles.fixedTopContainer}>
        <BalanceCard walletAddress={user?.walletAddress} />

        <View style={[transactionsListStyles.header, { marginBottom: 0 }]}>
          <Typography variant="h4" color="text" text="Recent Activity" />
        </View>
      </View>

      {/* Scrollable List Section */}
      <AnimatedScrollView
        style={homeStyles.listContainer}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <TransactionsList
          delay={200}
          walletAddress={user?.walletAddress}
          onTransactionPress={handleTransactionPress}
          showHeader={false}
        />
      </AnimatedScrollView>

      {/* AI Floating Button */}
      <View
        style={[homeStyles.floatingContainer, { bottom: insets.bottom + 16 }]}
      >
        <AIFloatingButton
          onChatPress={() => handleChatNav("/chat")}
          onVoicePress={() => handleChatNav("/voice")}
        />
      </View>

      {/* Menu Bottom Sheet */}
      <BottomSheet
        title="Menu"
        visible={menuVisible}
        options={menuOptions}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}
