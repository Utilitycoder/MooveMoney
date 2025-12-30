import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { TransactionErrorCardProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const TransactionErrorCard: React.FC<TransactionErrorCardProps> = ({
  result,
}) => {
  if (result.success || !result.errorMessage) return null;

  return (
    <View style={transactionDetailsStyles.errorCard}>
      <View style={transactionDetailsStyles.errorHeader}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={ThemeColors.error}
        />
        <Text style={transactionDetailsStyles.errorLabel}>Error Details</Text>
      </View>
      <Text style={transactionDetailsStyles.errorMessage}>
        {result.errorMessage}
      </Text>
      {result.errorCode && (
        <View style={transactionDetailsStyles.errorCodeContainer}>
          <Text style={transactionDetailsStyles.errorCodeLabel}>
            Error Code:
          </Text>
          <Text style={transactionDetailsStyles.errorCode}>
            {result.errorCode}
          </Text>
        </View>
      )}
    </View>
  );
};
