import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { usePrivy } from "@privy-io/expo";
import { Href, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout } = usePrivy();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(app)/(public)/login" as Href);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      {/* Header */}
      <Animated.View entering={FadeIn} style={styles.header}>
        <View style={styles.logoIcon}>
          <Ionicons name="wallet" size={24} color={ThemeColors.text} />
        </View>
        <Text style={styles.headerTitle}>MooveMoney</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={ThemeColors.textSecondary}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        <Animated.View
          entering={FadeInDown.delay(100)}
          style={styles.welcomeCard}
        >
          <View style={styles.welcomeIcon}>
            <Ionicons name="sparkles" size={32} color={ThemeColors.primary} />
          </View>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>
            {
              "You're signed in. Start managing your crypto with simple commands."
            }
          </Text>
        </Animated.View>

        {/* Command Input Preview */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.commandCard}
        >
          <View style={styles.commandHeader}>
            <View style={styles.commandIcons}>
              <TouchableOpacity style={styles.commandIconButton}>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color={ThemeColors.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.commandIconButton, styles.micButton]}
              >
                <Ionicons
                  name="mic"
                  size={20}
                  color={ThemeColors.primaryDark}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Ready</Text>
            </View>
          </View>
          <Text style={styles.commandPlaceholder}>
            Type or speak your command...
          </Text>
          <Text style={styles.commandExample}>
            {'"Send 50 USDC to alice.move"'}
          </Text>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.actionsGrid}
        >
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: "#E0F2FE" }]}>
              <Ionicons name="send" size={20} color="#0284C7" />
            </View>
            <Text style={styles.actionTitle}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: "#D1FAE5" }]}>
              <Ionicons name="download" size={20} color="#059669" />
            </View>
            <Text style={styles.actionTitle}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="swap-horizontal" size={20} color="#D97706" />
            </View>
            <Text style={styles.actionTitle}>Swap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: "#F3E8FF" }]}>
              <Ionicons name="time" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.actionTitle}>History</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    color: ThemeColors.text,
    marginLeft: 12,
    flex: 1,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  welcomeCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 24,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  commandCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  commandHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  commandIcons: {
    flexDirection: "row",
    gap: 8,
  },
  commandIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#FEF3C7",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ThemeColors.success,
  },
  statusText: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },
  commandPlaceholder: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
    marginBottom: 4,
  },
  commandExample: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "47%",
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 14,
    color: ThemeColors.text,
  },
});
