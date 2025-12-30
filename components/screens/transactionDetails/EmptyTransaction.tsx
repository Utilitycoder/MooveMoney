import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransactionDetailsHeader } from "./TransactionDetailsHeader";

const EmptyTransaction = ({ goBack }: { goBack: () => void }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[transactionDetailsStyles.container, { paddingTop: insets.top }]}
    >
      <TransactionDetailsHeader onBack={goBack} />
      <View style={transactionDetailsStyles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={ThemeColors.textMuted}
        />
        <Text style={transactionDetailsStyles.errorText}>
          Transaction details not found
        </Text>
      </View>
    </View>
  );
};

export default EmptyTransaction;
