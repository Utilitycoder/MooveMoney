import AIFloatingButton from "@/components/screens/home/AIFloatingButton";
import BalanceCard from "@/components/screens/home/BalanceCard";
import TransactionsList from "@/components/screens/home/TransactionsList";
import UserGreeting from "@/components/screens/home/UserGreeting";
import { ThemeColors } from "@/constants/theme";
import { usePrivy } from "@privy-io/expo";
import { Href, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout, user } = usePrivy();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(app)/(public)/login" as Href);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleAIPress = () => {
    // TODO: Open AI assistant
    console.log("AI pressed");
  };

  // Get username from linked accounts or default
  const username =
    (user as { google?: { email?: string } })?.google?.email?.split("@")[0] ||
    "User";

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Greeting */}
        <UserGreeting username={username} onLogoutPress={handleLogout} />

        {/* Balance Card */}
        <BalanceCard balance="0.00" delay={100} />

        {/* Transactions */}
        <TransactionsList delay={200} />
      </ScrollView>

      {/* AI Floating Button */}
      <View style={[styles.floatingContainer, { bottom: insets.bottom + 16 }]}>
        <AIFloatingButton onPress={handleAIPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 24,
  },
  floatingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
