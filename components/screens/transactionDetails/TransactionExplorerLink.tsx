import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { TransactionExplorerLinkProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const TransactionExplorerLink: React.FC<
  TransactionExplorerLinkProps
> = ({ result, onPress }) => {
  if (!result.success || !result.transactionId) return null;

  return (
    <Pressable style={transactionDetailsStyles.explorerCard} onPress={onPress}>
      <View style={transactionDetailsStyles.explorerContent}>
        <View style={transactionDetailsStyles.explorerIconContainer}>
          <Ionicons
            name="open-outline"
            size={22}
            color={ThemeColors.primaryDark}
          />
        </View>
        <View style={transactionDetailsStyles.explorerTextContainer}>
          <Text style={transactionDetailsStyles.explorerText}>
            View on Explorer
          </Text>
          <Text style={transactionDetailsStyles.explorerSubtext}>
            Open transaction in block explorer
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={ThemeColors.textMuted}
        />
      </View>
    </Pressable>
  );
};
