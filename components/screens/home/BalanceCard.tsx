import { Fonts, ThemeColors } from "@/constants/theme";
import { BalanceCardProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance = "0.00",
  walletAddress,
  delay = 100,
}) => {
  // Format wallet address to show first 6 and last 4 characters
  const formatAddress = (address: string) => {
    if (!address) return "";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons
          name="wallet-outline"
          size={18}
          color={ThemeColors.textSecondary}
        />
        <Text style={styles.balanceLabel}>
          {walletAddress ? formatAddress(walletAddress) : "MOVE Balance"}
        </Text>
      </View>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>{balance}</Text>
        <Text style={styles.currencyCode}>MOVE</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  balanceLabel: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  balanceAmount: {
    fontFamily: Fonts.brandBlack,
    fontSize: 40,
    color: ThemeColors.text,
    letterSpacing: -1,
    lineHeight: 42,
  },
  currencyCode: {
    fontFamily: Fonts.brandBold,
    fontSize: 14,
    color: ThemeColors.primaryDark,
  },
});

export default BalanceCard;
