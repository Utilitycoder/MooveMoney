import { env } from "@/constants";
import { apiFetch } from "@/lib/api";
import { TransactionDetails } from "@/types/chat";
import { Transaction, TransactionApiResponse } from "@/types/transaction";
import { apiResponseToDetails, transformTransaction } from "@/utils";

const API_BASE_URL = `${env.apiUrl}/api`;

export async function getUserBalance(address: string): Promise<string> {
  if (!address) {
    throw new Error("Wallet address is required");
  }

  const data = await apiFetch<{ data: { balance: string } }>(
    `${API_BASE_URL}/m/balance`
  );

  return data.data.balance;
}

export async function getTransactions(
  userAddress?: string
): Promise<Transaction[]> {
  const data = await apiFetch<{
    data: { transactions: TransactionApiResponse[] };
  }>(`${API_BASE_URL}/m/transactions?limit=25`);

  /*
   * Debugging: slicing to ensure immutability and logging dates to verify API consistency.
   * This handles the user report of fluctuating list content.
   */
  const transactions = data.data?.transactions || [];

  const txs = transactions
    .slice() // Create a copy to match useQuery immutability expectations
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .map((tx) => transformTransaction(tx));

  // console.log("Tx Dates:", txs.map(t => t.date)); // Log formatted dates for verification

  // Transform API response to UI format
  return txs;
}

export async function getTransactionByHash(
  hash: string
): Promise<TransactionDetails | null> {
  if (!hash) {
    throw new Error("Transaction hash is required");
  }

  try {
    const data = await apiFetch<{
      data: { transaction: TransactionApiResponse };
    }>(`${API_BASE_URL}/m/transactions/${hash}`);

    if (!data.data?.transaction) {
      return null;
    }

    // Transform API response to TransactionDetails format
    return apiResponseToDetails(data.data.transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

// Types for build/submit transaction
export interface BuildTransactionRequest {
  recipient: string;
  amount: string;
}

export interface BuildTransactionResponse {
  success: boolean;
  message?: string;
  data?: {
    rawTransaction: string;
    signingMessage: string;
    expirationTimestamp: string;
  };
}

export interface SubmitTransactionRequest {
  rawTransaction: string;
  signature: string;
  publicKey: string;
}

export interface SubmitTransactionResponse {
  success: boolean;
  hash?: string;
  vmStatus?: string;
  message?: string;
}

export async function buildTransaction(
  request: BuildTransactionRequest
): Promise<BuildTransactionResponse> {
  try {
    if (!request.recipient) {
      throw new Error("Recipient address is required");
    }

    if (!request.amount) {
      throw new Error("Amount is required");
    }

    const response = await apiFetch<{
      status: boolean;
      data: {
        success: boolean;
        rawTransaction: string;
        signingMessage: string;
        expirationTimestamp: string;
      };
    }>(`${API_BASE_URL}/m/build-transfer`, {
      method: "POST",
      body: JSON.stringify({
        recipient: request.recipient,
        amount: request.amount,
      }),
    });

    if (!response.status || !response.data.success) {
      throw new Error("Failed to generate transaction");
    }

    return {
      success: response.data.success,
      data: {
        rawTransaction: response.data.rawTransaction,
        signingMessage: response.data.signingMessage,
        expirationTimestamp: response.data.expirationTimestamp,
      },
    };
  } catch (error) {
    console.error("Error generating transaction:", error);
    return {
      success: false,
      message: "Failed to generate transaction. Please try again.",
    };
  }
}

export async function submitTransaction(
  request: SubmitTransactionRequest
): Promise<SubmitTransactionResponse> {
  try {
    // console.log("request", request);
    if (!request.rawTransaction || !request.signature) {
      throw new Error("Unable to complete the transaction. Please try again.");
    }

    const response = await apiFetch<{
      status: boolean;
      data: {
        success: boolean;
        hash: string;
        vmStatus: string;
      };
    }>(`${API_BASE_URL}/m/submit-transaction`, {
      method: "POST",
      body: JSON.stringify({
        rawTransaction: request.rawTransaction,
        signature: request.signature,
        publicKey: request.publicKey,
      }),
    });

    // console.log("response", response);

    if (!response.status || !response.data.success) {
      throw new Error("Failed to submit transaction");
    }

    return {
      success: response.data.success,
      hash: response.data.hash,
      vmStatus: response.data.vmStatus,
    };
  } catch (error) {
    console.error("Error submitting transaction:", error);
    return {
      success: false,
      message: "Failed to submit transaction. Please try again.",
    };
  }
}

export interface FaucetResponse {
  success: boolean;
  message?: string;
}

export async function getFaucetTokens(): Promise<FaucetResponse> {
  try {
    const response = await apiFetch<{
      status: boolean;
      data: { success: boolean; message?: string };
    }>(`${API_BASE_URL}/m/faucet`);

    return {
      success: response.status && response.data?.success,
      message: response.data?.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to request tokens. Please try again.",
    };
  }
}
