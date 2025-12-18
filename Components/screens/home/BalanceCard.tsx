import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface BalanceCardProps {
  balance?: string;
  delay?: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance = "0.00",
  delay = 100,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons
          name="wallet-outline"
          size={18}
          color={ThemeColors.textSecondary}
        />
        <Text style={styles.balanceLabel}>MOVE Balance</Text>
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
    padding: 24,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  balanceLabel: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  balanceAmount: {
    fontFamily: Fonts.brandBlack,
    fontSize: 40,
    color: ThemeColors.text,
    letterSpacing: -1,
    lineHeight: 48,
  },
  currencyCode: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.primaryDark,
  },
});

export default BalanceCard;
