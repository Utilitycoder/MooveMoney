import { Fonts, ThemeColors } from "@/constants/theme";
import { MOCK_TRANSACTIONS } from "@/data/transactions";
import { Transaction, TransactionsListProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "arrow-up";
    case "receive":
      return "arrow-down";
    case "swap":
      return "swap-horizontal";
    default:
      return "ellipse";
  }
};

const getTransactionIconBg = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "#FEE2E2";
    case "receive":
      return "#D1FAE5";
    case "swap":
      return "#FEF3C7";
    default:
      return ThemeColors.borderLight;
  }
};

const getTransactionIconColor = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "#DC2626";
    case "receive":
      return "#059669";
    case "swap":
      return "#D97706";
    default:
      return ThemeColors.textMuted;
  }
};

const TransactionItem = ({ item }: { item: Transaction }) => (
  <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
    <View
      style={[
        styles.transactionIcon,
        { backgroundColor: getTransactionIconBg(item.type) },
      ]}
    >
      <Ionicons
        name={getTransactionIcon(item.type)}
        size={18}
        color={getTransactionIconColor(item.type)}
      />
    </View>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionTitle}>{item.title}</Text>
      <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
    </View>
    <View style={styles.transactionAmount}>
      <Text
        style={[
          styles.amountText,
          item.isPositive ? styles.amountPositive : styles.amountNegative,
        ]}
      >
        {item.amount}
      </Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions = MOCK_TRANSACTIONS,
  delay = 200,
}) => {
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={48} color={ThemeColors.border} />
      <Text style={styles.emptyTitle}>No transactions yet</Text>
      <Text style={styles.emptySubtitle}>
        Your transaction history will appear here
      </Text>
    </View>
  );

  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Activity</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={
          transactions.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
  seeAllText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.primaryDark,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 15,
    color: ThemeColors.text,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontFamily: Fonts.brandBold,
    fontSize: 15,
    marginBottom: 2,
  },
  amountPositive: {
    color: ThemeColors.success,
  },
  amountNegative: {
    color: ThemeColors.text,
  },
  dateText: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
  },
  emptyContainer: {
    flex: 1,
  },
});

export default TransactionsList;
