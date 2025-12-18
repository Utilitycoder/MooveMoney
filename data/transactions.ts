import { Transaction } from "@/types/transaction";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "receive",
    title: "Received USDC",
    subtitle: "From 0x1234...5678",
    amount: "+50.00",
    isPositive: true,
    date: "Today",
  },
  {
    id: "2",
    type: "send",
    title: "Sent ETH",
    subtitle: "To alice.move",
    amount: "-0.025",
    isPositive: false,
    date: "Today",
  },
  {
    id: "3",
    type: "swap",
    title: "Swapped USDC → ETH",
    subtitle: "Via Movement",
    amount: "100.00",
    isPositive: true,
    date: "Yesterday",
  },
  {
    id: "4",
    type: "receive",
    title: "Received MOVE",
    subtitle: "From 0xabcd...efgh",
    amount: "+250.00",
    isPositive: true,
    date: "Yesterday",
  },
];
