import { ThemeColors } from "@/constants/theme";
import { TransactionDetails } from "@/types/chat";
import { Transaction, TransactionApiResponse } from "@/types/transaction";
import { formatDistanceStrict } from "date-fns";

export { copyToClipboard } from "./clipboard";

export function normalizeAptosTimestamp(ts: string | number): number {
  const n = typeof ts === "string" ? Number(ts) : ts;

  // Aptos timestamps are in microseconds
  return Math.floor(n / 1_000);
}

export function formatDate(aptosTimestamp: string | number): string {
  const txMs = Math.floor(Number(aptosTimestamp) / 1_000);

  return formatDistanceStrict(txMs, Date.now(), {
    addSuffix: true,
    roundingMethod: "floor",
  });
}

export const formatAddress = (address: string) => {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const transformTransaction = (
  apiTx: TransactionApiResponse
): Transaction => {
  const isPositive = apiTx.type === "receive";
  const amountPrefix = isPositive ? "+" : "-";
  const formattedAmount = `${amountPrefix}${apiTx.amount}`;

  // Determine title based on type
  const titleMap = {
    send: "Sent",
    receive: "Received",
    swap: "Swapped",
  };

  const title = titleMap[apiTx.type] || "Transaction";

  // Format receiver/sender address for subtitle
  const subtitle =
    apiTx.type === "receive"
      ? apiTx.receiver
        ? `From ${formatAddress(apiTx.receiver)}`
        : "Transaction"
      : apiTx.receiver
      ? `To ${formatAddress(apiTx.receiver)}`
      : "Transaction";

  // Calculate total
  // For send: total = amount + gas fee (total cost)
  // For receive: total = amount (gas paid by sender)
  const amountNum = parseFloat(apiTx.amount);
  const gasFeeNum = parseFloat(apiTx.gasFee);
  const total =
    apiTx.type === "send"
      ? (amountNum + gasFeeNum).toFixed(6)
      : amountNum.toFixed(6);

  return {
    id: apiTx.hash,
    type: apiTx.type,
    title,
    subtitle,
    amount: formattedAmount,
    isPositive,
    date: formatDate(apiTx.timestamp),
    recipient: apiTx.receiver,
    network: "MOVE",
    fee: `~${apiTx.gasFee} MOVE`,
    total: `${total} MOVE`,
    transactionId: apiTx.hash,
    // Preserve raw API response for details screen
    rawApiResponse: apiTx,
  };
};

/**
 * Convert Transaction to TransactionDetails format for transaction details screen
 */
export const transactionToDetails = (
  transaction: Transaction
): TransactionDetails => {
  // Remove +/- prefix from amount for details screen
  const cleanAmount = transaction.amount.replace(/[+-]/g, "").trim();

  return {
    amount: cleanAmount,
    recipient: transaction.recipient,
    recipientName: transaction.recipientName,
    network: transaction.network || "Move Network",
    fee: transaction.fee,
    total: transaction.total || cleanAmount,
    type: transaction.type,
  };
};

/**
 * Convert TransactionApiResponse directly to TransactionDetails format
 */
export const apiResponseToDetails = (
  apiTx: TransactionApiResponse
): TransactionDetails => {
  // Calculate total
  // For send: total = amount + gas fee (total cost)
  // For receive: total = amount (gas paid by sender)
  const amountNum = parseFloat(apiTx.amount);
  const gasFeeNum = parseFloat(apiTx.gasFee);
  const total =
    apiTx.type === "send"
      ? (amountNum + gasFeeNum).toFixed(6)
      : amountNum.toFixed(6);

  return {
    amount: apiTx.amount,
    recipient: apiTx.receiver,
    network: "MOVE",
    fee: +gasFeeNum > 0 ? `~${apiTx.gasFee} MOVE` : "N/A",
    total: `${total} MOVE`,
    type: apiTx.type,
  };
};

export const getInitials = (name: string) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "arrow-up";
    case "receive":
      return "arrow-down";
    case "swap":
      return "swap-horizontal";
    default:
      return "ellipse";
  }
};

export const getTransactionIconBg = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "#FEE2E2";
    case "receive":
      return "#D1FAE5";
    case "swap":
      return "#FEF3C7";
    default:
      return ThemeColors.borderLight;
  }
};

export const getTransactionIconColor = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return "#DC2626";
    case "receive":
      return "#059669";
    case "swap":
      return "#D97706";
    default:
      return ThemeColors.textMuted;
  }
};
