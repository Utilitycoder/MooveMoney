export interface Transaction {
  id: string;
  type: "send" | "receive" | "swap";
  title: string;
  subtitle: string;
  amount: string;
  isPositive: boolean;
  date: string;
}

export interface TransactionsListProps {
  transactions?: Transaction[];
  delay?: number;
}
