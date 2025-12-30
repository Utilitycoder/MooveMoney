import { TransactionDetails, TransactionResult } from "@/types/chat";
import { TransactionApiResponse } from "@/types/transaction";
import { create } from "zustand";

interface TransactionStore {
  transaction: TransactionDetails | TransactionApiResponse | null;
  result: TransactionResult | null;
  setTransaction: (
    transaction: TransactionDetails | TransactionApiResponse | null,
    result: TransactionResult | null
  ) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: null,
  result: null,
  setTransaction: (transaction, result) => set({ transaction, result }),
  clearTransaction: () => set({ transaction: null, result: null }),
}));
