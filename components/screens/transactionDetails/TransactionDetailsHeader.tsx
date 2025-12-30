import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TransactionDetailsHeaderProps {
  onBack: () => void;
}

export const TransactionDetailsHeader: React.FC<
  TransactionDetailsHeaderProps
> = ({ onBack }) => {
  return (
    <View style={transactionDetailsStyles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={transactionDetailsStyles.backButton}
      >
        <View style={transactionDetailsStyles.backButtonInner}>
          <Ionicons name="arrow-back" size={22} color={ThemeColors.text} />
        </View>
      </TouchableOpacity>
      <Text style={transactionDetailsStyles.headerTitle}>
        Transaction Details
      </Text>
      <View style={transactionDetailsStyles.backButton} />
    </View>
  );
};
