import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TransactionDetailsHeaderProps {
  onBack: () => void;
}

export const TransactionDetailsHeader: React.FC<
  TransactionDetailsHeaderProps
> = ({ onBack }) => {
  return (
    <View style={transactionDetailsStyles.header}>
      <Pressable onPress={onBack} style={transactionDetailsStyles.backButton}>
        <View style={transactionDetailsStyles.backButtonInner}>
          <Ionicons name="arrow-back" size={22} color={ThemeColors.text} />
        </View>
      </Pressable>
      <Text style={transactionDetailsStyles.headerTitle}>
        Transaction Details
      </Text>
      <View style={transactionDetailsStyles.backButton} />
    </View>
  );
};
