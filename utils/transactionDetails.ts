import { ThemeColors } from "@/constants/theme";
import { TransactionDetails, TransactionResult } from "@/types/chat";
import { TransactionApiResponse } from "@/types/transaction";
import {
  apiResponseToDetails,
  formatDate,
  getTransactionIconBg,
  getTransactionIconColor,
} from "./index";

export interface TransactionTypeInfo {
  heroTitle: string;
  directionLabel: string;
  directionIcon:
    | "arrow-up-outline"
    | "arrow-down-outline"
    | "swap-horizontal-outline"
    | "person-outline";
  iconName: "arrow-up" | "arrow-down" | "swap-horizontal" | "checkmark";
}

/**
 * Parse and transform transaction from state
 */
export function parseTransactionFromState(
  rawTransaction: TransactionDetails | TransactionApiResponse | null
): TransactionDetails | null {
  if (!rawTransaction) return null;

  // Check if it's a TransactionApiResponse (has hash, gasFee, etc.)
  const isApiResponse =
    typeof rawTransaction === "object" &&
    rawTransaction !== null &&
    "hash" in rawTransaction &&
    "gasFee" in rawTransaction &&
    "timestamp" in rawTransaction;

  if (isApiResponse) {
    return apiResponseToDetails(rawTransaction as TransactionApiResponse);
  }

  // Otherwise, assume it's already TransactionDetails
  return rawTransaction as TransactionDetails;
}

/**
 * Parse and enhance result from state with API response data
 */
export function parseResultFromState(
  result: TransactionResult | null,
  rawTransaction: TransactionDetails | TransactionApiResponse | null
): TransactionResult | null {
  if (!result) return null;

  const isApiResponse =
    typeof rawTransaction === "object" &&
    rawTransaction !== null &&
    "hash" in rawTransaction &&
    "gasFee" in rawTransaction &&
    "timestamp" in rawTransaction;

  if (isApiResponse) {
    return {
      ...result,
      success: (rawTransaction as TransactionApiResponse).success as boolean,
      transactionId:
        (rawTransaction as TransactionApiResponse).hash || result.transactionId,
    };
  }

  return result;
}

/**
 * Get transaction type-specific information (title, labels, icons)
 */
export function getTransactionTypeInfo(
  type: TransactionDetails["type"] | undefined,
  success: boolean
): TransactionTypeInfo {
  const transactionType = type || "send";

  switch (transactionType) {
    case "send":
      return {
        heroTitle: success ? "Transaction Sent" : "Transaction Failed",
        directionLabel: "To",
        directionIcon: "arrow-up-outline",
        iconName: "arrow-up",
      };
    case "receive":
      return {
        heroTitle: success ? "Transaction Received" : "Transaction Failed",
        directionLabel: "From",
        directionIcon: "arrow-down-outline",
        iconName: "arrow-down",
      };
    case "swap":
      return {
        heroTitle: success ? "Swap Completed" : "Swap Failed",
        directionLabel: "Via",
        directionIcon: "swap-horizontal-outline",
        iconName: "swap-horizontal",
      };
    default:
      return {
        heroTitle: success ? "Transaction Sent" : "Transaction Failed",
        directionLabel: "To",
        directionIcon: "person-outline",
        iconName: "checkmark",
      };
  }
}

/**
 * Get status icon color based on transaction type and success
 */
export function getTransactionStatusIconColor(
  type: TransactionDetails["type"] | undefined,
  success: boolean
): string {
  if (!success) {
    return ThemeColors.error;
  }
  // Use transaction type-specific color when successful
  if (type) {
    return getTransactionIconColor(type);
  }
  return ThemeColors.success;
}

/**
 * Get status icon background color based on transaction type and success
 */
export function getTransactionStatusIconBg(
  type: TransactionDetails["type"] | undefined,
  success: boolean
): string {
  if (!success) {
    return "#FEE2E2"; // Light red for errors
  }
  // Use transaction type-specific background when successful
  if (type) {
    return getTransactionIconBg(type);
  }
  return "#D1FAE5"; // Light green default
}

/**
 * Get formatted date from raw transaction if available
 */
export function getFormattedTransactionDate(
  rawTransaction: TransactionDetails | TransactionApiResponse | null
): string | null {
  if (
    rawTransaction &&
    typeof rawTransaction === "object" &&
    rawTransaction !== null &&
    "timestamp" in rawTransaction
  ) {
    const timestamp = (rawTransaction as TransactionApiResponse).timestamp;
    if (timestamp) {
      return formatDate(timestamp);
    }
  }
  return null;
}
