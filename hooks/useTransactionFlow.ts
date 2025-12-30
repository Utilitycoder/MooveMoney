import { confirmBiometric } from "@/lib/security";
import { buildTransaction, submitTransaction } from "@/services/walletService";
import { useTransactionStore } from "@/stores/transactionStore";
import { TransactionDetails, TransactionResult, TransactionState } from "@/types/chat";
import { IWallet } from "@/types/home";
import { errorHaptic, successHaptic } from "@/utils/haptics";
import { usePrivy } from "@privy-io/expo";
import { useSignRawHash } from "@privy-io/expo/extended-chains";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

interface UseTransactionFlowProps {
  onSuccess?: (result: TransactionResult, details: TransactionDetails) => void;
  onReject?: () => void;
  onBiometricError?: (status: string) => void;
}

export const useTransactionFlow = ({ 
  onSuccess, 
  onReject,
  onBiometricError 
}: UseTransactionFlowProps = {}) => {
  const router = useRouter();
  const { user } = usePrivy();
  const { signRawHash } = useSignRawHash();
  const qc = useQueryClient();

  const [transactionState, setTransactionState] = useState<TransactionState>({
    uiState: "idle",
    result: null,
    pendingTransaction: null,
    processingStage: "submitting",
  });

  const [isApproving, setIsApproving] = useState(false);

  const resetTransactionState = () => {
    setTransactionState({
      uiState: "idle",
      pendingTransaction: null,
      processingStage: "submitting",
      result: null,
    });
    setIsApproving(false);
  };

  const setTransaction = (transaction: TransactionDetails) => {
    setTransactionState({
      uiState: "approval",
      pendingTransaction: transaction,
      processingStage: "submitting",
      result: null,
    });
  };

  const handleApprove = async () => {
    const currentTransaction = transactionState.pendingTransaction;
    if (!currentTransaction || isApproving) return;

    setIsApproving(true);

    // Step 1: Biometric authentication
    const { status } = await confirmBiometric();
    
    if (status !== "success") {
      onBiometricError?.(status);
      setIsApproving(false);
      resetTransactionState();
      return;
    }

    try {
      // Step 2: Build transaction
      setTransactionState((prev) => ({
        ...prev,
        uiState: "processing",
        processingStage: "submitting",
      }));

      const buildResult = await buildTransaction({
        recipient: currentTransaction.recipient || "",
        amount: currentTransaction.amount || "",
      });

      if (!buildResult.success || !buildResult.data) {
        throw new Error(buildResult.message || "Failed to prepare transaction");
      }

      // Step 3: Sign transaction
      setTransactionState((prev) => ({
        ...prev,
        processingStage: "signing",
      }));

      const wallet = user?.linked_accounts.find(
        (account) => account.type === "wallet" && account.chain_type === "aptos"
      ) as IWallet | undefined;

      if (!wallet) throw new Error("Wallet not found");

      const { signature } = await signRawHash({
        chainType: "aptos",
        address: wallet.address,
        hash: buildResult.data.signingMessage as `0x${string}`,
      });

      if (!signature) throw new Error("Failed to sign transaction");

      // Step 4: Submit transaction
      setTransactionState((prev) => ({
        ...prev,
        processingStage: "confirming",
      }));

      const { success, hash: txHash, vmStatus } = await submitTransaction({
        rawTransaction: buildResult.data.rawTransaction,
        signature,
        publicKey: wallet.public_key,
      });

      if (!success || vmStatus?.toLowerCase() !== "executed successfully") {
        throw new Error("Transaction failed to complete");
      }

      // Success
      successHaptic();
      setTransactionState((prev) => ({
        ...prev,
        processingStage: "completed",
      }));

      await new Promise((resolve) => setTimeout(resolve, 800));

      const result: TransactionResult = {
        success: true,
        transactionId: txHash || "",
        completionTime: new Date().toISOString(),
      };

      setTransactionState((prev) => ({
        ...prev,
        uiState: "result",
        result,
      }));

      qc.invalidateQueries({ queryKey: ["balance", wallet.address] });
      qc.invalidateQueries({ queryKey: ["transactions", wallet.address] });

      onSuccess?.(result, currentTransaction);
    } catch (error: any) {
      console.error("Transaction error:", error);
      errorHaptic();
      setTransactionState((prev) => ({
        ...prev,
        uiState: "result",
        processingStage: "failed",
        result: {
          success: false,
          errorMessage: error.message || "An unexpected error occurred",
        },
      }));
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = () => {
    onReject?.();
    resetTransactionState();
  };

  const handleViewDetails = () => {
    if (transactionState.pendingTransaction && transactionState.result) {
      const setTx = useTransactionStore.getState().setTransaction;
      setTx(transactionState.pendingTransaction, transactionState.result);
      resetTransactionState();
      router.push("/(app)/(protected)/transaction-details");
    }
  };

  const handleTryAgain = () => {
    setTransactionState((prev) => ({
      ...prev,
      uiState: "approval",
      result: null,
    }));
  };

  return {
    transactionState,
    isApproving,
    handleApprove,
    handleReject,
    handleViewDetails,
    handleTryAgain,
    resetTransactionState,
    setTransaction,
  };
};
