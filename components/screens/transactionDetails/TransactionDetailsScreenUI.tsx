import EmptyTransaction from "@/components/screens/transactionDetails/EmptyTransaction";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { copyToClipboard } from "@/utils/clipboard";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransactionDetailsHeader } from "./TransactionDetailsHeader";
import { TransactionErrorCard } from "./TransactionErrorCard";
import { TransactionExplorerLink } from "./TransactionExplorerLink";
import { TransactionHashCard } from "./TransactionHashCard";
import { TransactionHeroCard } from "./TransactionHeroCard";
import { TransactionInfoSection } from "./TransactionInfoSection";

export default function TransactionDetailsScreenUI() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    typeInfo,
    transaction,
    finalResult,
    statusIconBg,
    formattedDate,
    statusIconColor,
    clearTransaction,
  } = useTransactionDetails();

  // Clear transaction state when component unmounts
  useEffect(() => {
    return () => {
      clearTransaction();
    };
  }, [clearTransaction]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleCopy = copyToClipboard;

  const handleExplorerPress = () => {
    // console.log("Open explorer for:", finalResult?.transactionId);
  };

  if (!transaction || !finalResult) {
    return <EmptyTransaction goBack={handleBack} />;
  }

  return (
    <View
      style={[transactionDetailsStyles.container, { paddingTop: insets.top }]}
    >
      <TransactionDetailsHeader onBack={handleBack} />

      <ScrollView
        style={transactionDetailsStyles.scrollView}
        contentContainerStyle={[
          transactionDetailsStyles.scrollContent,
          { paddingBottom: insets.bottom + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TransactionHeroCard
          transaction={transaction}
          result={finalResult}
          typeInfo={typeInfo}
          statusIconColor={statusIconColor}
          statusIconBg={statusIconBg}
          formattedDate={formattedDate}
        />

        <TransactionInfoSection
          transaction={transaction}
          typeInfo={typeInfo}
          statusIconColor={statusIconColor}
          onCopy={handleCopy}
        />

        <TransactionHashCard result={finalResult} onCopy={handleCopy} />

        <TransactionErrorCard result={finalResult} />

        <TransactionExplorerLink
          result={finalResult}
          onPress={handleExplorerPress}
        />
      </ScrollView>
    </View>
  );
}
