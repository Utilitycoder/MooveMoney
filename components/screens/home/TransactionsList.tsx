import Skeleton from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { ThemeColors } from "@/constants/theme";
import { useTransactions } from "@/queries/useTransactions";
import { transactionsListStyles } from "@/styles/home";
import { Transaction, TransactionsListProps } from "@/types/transaction";
import {
  getTransactionIcon,
  getTransactionIconBg,
  getTransactionIconColor,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const TransactionSkeleton = () => (
  <View style={transactionsListStyles.transactionItem}>
    <Skeleton width={40} height={40} borderRadius={20} />
    <View style={[transactionsListStyles.transactionInfo, { marginLeft: 12 }]}>
      <Skeleton width={120} height={16} style={{ marginBottom: 6 }} />
      <Skeleton width={80} height={12} />
    </View>
    <View style={transactionsListStyles.transactionAmount}>
      <Skeleton width={60} height={16} style={{ marginBottom: 6 }} />
      <Skeleton width={40} height={12} />
    </View>
  </View>
);

const TransactionListEmptyState = () => {
  return (
    <View style={transactionsListStyles.emptyState}>
      <Ionicons name="receipt-outline" size={48} color={ThemeColors.border} />
      <Typography
        variant="bodyBold"
        size="lg"
        color="textSecondary"
        style={{ marginTop: 16, marginBottom: 4 }}
      >
        No transactions yet
      </Typography>
      <Typography variant="body" color="textMuted">
        Your transaction history will appear here
      </Typography>
    </View>
  );
};

const TransactionItem = ({
  item,
  onPress,
}: {
  item: Transaction;
  onPress?: () => void;
}) => (
  <Pressable style={transactionsListStyles.transactionItem} onPress={onPress}>
    <View
      style={[
        transactionsListStyles.transactionIcon,
        { backgroundColor: getTransactionIconBg(item.type) },
      ]}
    >
      <Ionicons
        name={getTransactionIcon(item.type)}
        size={18}
        color={getTransactionIconColor(item.type)}
      />
    </View>
    <View style={transactionsListStyles.transactionInfo}>
      <Typography
        variant="bodyBold"
        size="md"
        color="text"
        style={{ marginBottom: 2 }}
        text={item.title}
      />
      <Typography variant="caption" color="textMuted" text={item.subtitle} />
    </View>
    <View style={transactionsListStyles.transactionAmount}>
      <Typography
        variant="bodyBold"
        size="md"
        color={item.isPositive ? "success" : "text"}
        style={{ marginBottom: 2 }}
        text={item.amount + " MOVE"}
      />
      <Typography variant="caption" color="textMuted" text={item.date} />
    </View>
  </Pressable>
);

const TransactionsList: React.FC<TransactionsListProps> = ({
  delay = 200,
  walletAddress,
  onTransactionPress,
  showHeader = true,
}) => {
  const {
    data: txData,
    isLoading,
    isFetching,
  } = useTransactions(walletAddress);

  const showSkeleton = isLoading || (isFetching && !txData);

  return (
    <Animated.View
      entering={FadeInDown.delay(delay)}
      style={transactionsListStyles.container}
    >
      {showHeader && (
        <View style={transactionsListStyles.header}>
          <Typography variant="h4" color="text" text="Recent Activity" />
        </View>
      )}

      {showSkeleton ? (
        Array.from({ length: 7 }).map((_, i) => (
          <TransactionSkeleton key={"transaction-skeleton-" + i} />
        ))
      ) : (
        <LegendList
          data={txData || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
              item={item}
              onPress={() => onTransactionPress?.(item)}
            />
          )}
          ListEmptyComponent={<TransactionListEmptyState />}
          scrollEnabled={false}
          estimatedItemSize={76}
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Animated.View>
  );
};

export default TransactionsList;
