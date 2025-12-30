import { useTransactionStore } from "@/stores/transactionStore";
import {
  getFormattedTransactionDate,
  getTransactionStatusIconBg,
  getTransactionStatusIconColor,
  getTransactionTypeInfo,
  parseResultFromState,
  parseTransactionFromState,
} from "@/utils/transactionDetails";
import { useMemo } from "react";

export function useTransactionDetails() {
  const {
    transaction: rawTransaction,
    result,
    clearTransaction,
  } = useTransactionStore();

  // Transform API response to TransactionDetails if needed
  const transaction = useMemo(
    () => parseTransactionFromState(rawTransaction),
    [rawTransaction]
  );

  // Update result with success from API response if available
  const finalResult = useMemo(
    () => parseResultFromState(result, rawTransaction),
    [result, rawTransaction]
  );

  // Get transaction type-specific information
  const typeInfo = useMemo(
    () =>
      getTransactionTypeInfo(transaction?.type, finalResult?.success ?? true),
    [transaction?.type, finalResult?.success]
  );

  // Get status icon color based on transaction type and success
  const statusIconColor = useMemo(
    () =>
      getTransactionStatusIconColor(
        transaction?.type,
        finalResult?.success ?? true
      ),
    [transaction?.type, finalResult?.success]
  );

  // Get status icon background color based on transaction type and success
  const statusIconBg = useMemo(
    () =>
      getTransactionStatusIconBg(
        transaction?.type,
        finalResult?.success ?? true
      ),
    [transaction?.type, finalResult?.success]
  );

  // Get formatted date from API response if available
  const formattedDate = useMemo(
    () => getFormattedTransactionDate(rawTransaction),
    [rawTransaction]
  );

  return {
    typeInfo,
    transaction,
    finalResult,
    statusIconBg,
    formattedDate,
    rawTransaction,
    statusIconColor,
    clearTransaction,
  };
}
