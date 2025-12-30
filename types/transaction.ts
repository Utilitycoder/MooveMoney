import { TransactionDetails, TransactionResult } from "./chat";

export interface Transaction {
  id: string;
  type: "send" | "receive" | "swap";
  title: string;
  subtitle: string;
  amount: string;
  isPositive: boolean;
  date: string;
  // Additional fields for transaction details
  recipient?: string;
  recipientName?: string;
  network?: string;
  fee?: string;
  total?: string;
  transactionId?: string;
  // Raw API response for passing to details screen
  rawApiResponse?: TransactionApiResponse;
}

// API Response type for transactions
export interface TransactionApiResponse {
  amount: string;
  gasFee: string;
  gasUnitPrice: string;
  gasUsed: string;
  hash: string;
  receiver: string;
  success: boolean;
  timestamp: string;
  type: "send" | "receive" | "swap";
  vm_status: string;
}

export interface TransactionsListProps {
  delay?: number;
  walletAddress?: string;
  transactions?: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
  showHeader?: boolean;
}

export interface TransactionHeroCardProps {
  transaction: TransactionDetails;
  result: TransactionResult;
  typeInfo: {
    heroTitle: string;
    iconName:
      | "arrow-up"
      | "arrow-down"
      | "swap-horizontal"
      | "checkmark"
      | "close";
  };
  statusIconColor: string;
  statusIconBg: string;
  formattedDate?: string | null;
}

export interface TransactionExplorerLinkProps {
  result: TransactionResult;
  onPress: () => void;
}

export interface TransactionErrorCardProps {
  result: TransactionResult;
}

export interface TransactionHashCardProps {
  result: TransactionResult;
  onCopy: (text: string, label?: string) => void;
}

export interface TransactionInfoSectionProps {
  transaction: TransactionDetails;
  typeInfo: {
    directionLabel: string;
    directionIcon:
      | "arrow-up-outline"
      | "arrow-down-outline"
      | "swap-horizontal-outline"
      | "person-outline";
  };
  statusIconColor: string;
  onCopy: (text: string, label?: string) => void;
}
