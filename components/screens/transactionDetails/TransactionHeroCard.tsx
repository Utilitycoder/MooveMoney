import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { TransactionHeroCardProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const TransactionHeroCard: React.FC<TransactionHeroCardProps> = ({
  transaction,
  result,
  typeInfo,
  statusIconColor,
  statusIconBg,
  formattedDate,
}) => {
  return (
    <View style={transactionDetailsStyles.heroCard}>
      <View style={transactionDetailsStyles.heroContent}>
        <View
          style={[
            transactionDetailsStyles.statusIconContainer,
            { backgroundColor: statusIconBg },
          ]}
        >
          <Ionicons
            name={result.success ? typeInfo.iconName : ("close" as const)}
            size={28}
            color={statusIconColor}
          />
        </View>
        <View style={transactionDetailsStyles.heroTextContainer}>
          <Text style={transactionDetailsStyles.heroTitle}>
            {typeInfo.heroTitle}
          </Text>
          {formattedDate && (
            <Text style={transactionDetailsStyles.heroDate}>
              {formattedDate}
            </Text>
          )}
        </View>
      </View>

      {/* Amount Display */}
      <View style={transactionDetailsStyles.amountSection}>
        <Text style={transactionDetailsStyles.amountLabel}>Amount</Text>
        <Text style={[transactionDetailsStyles.amountValue]}>
          {transaction.amount || "0"} MOVE
        </Text>
      </View>
    </View>
  );
};
