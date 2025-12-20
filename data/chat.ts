import { AIResponse } from "@/types/chat";

export function getAIResponse(userInput: string): AIResponse {
  const input = userInput.toLowerCase();

  if (input.includes("balance")) {
    return {
      content:
        "Your current balance is 0.00 MOVE. Would you like to add funds to your wallet?",
    };
  }

  // Detect send intent and parse transaction details
  if (input.includes("send")) {
    console.log("💬 Parsing send intent from:", input);
    // Try to extract amount and recipient from user input
    const amountMatch = input.match(/(\d+\.?\d*)\s*(move|usdc|eth|usdt)/i);
    const addressMatch = input.match(/0x[a-fA-F0-9]{40}/);
    const nameMatch = input.match(/to\s+([a-zA-Z\s]+?)(?:\s|$|0x)/i);

    const amount = amountMatch
      ? `${amountMatch[1]} ${amountMatch[2].toUpperCase()}`
      : "0.00 MOVE";
    const recipient = addressMatch ? addressMatch[0] : undefined;
    const recipientName = nameMatch ? nameMatch[1].trim() : undefined;

    // Calculate fee (mock: 0.001 MOVE or 0.1% of amount)
    const numericAmount = amountMatch ? parseFloat(amountMatch[1]) : 0;
    const fee =
      numericAmount > 0 ? (numericAmount * 0.001).toFixed(4) : "0.0001";
    const total =
      numericAmount > 0
        ? (numericAmount + parseFloat(fee)).toFixed(4)
        : "0.0001";

    const transactionData = {
      amount,
      recipient,
      recipientName,
      network: "Move Network",
      fee: `${fee} MOVE`,
      total: `${total} MOVE`,
    };

    console.log("✅ Parsed transaction:", transactionData);

    return {
      content:
        "I've prepared your transaction. Please review and confirm the details before sending.",
      isSendIntent: true,
      transaction: transactionData,
    };
  }

  if (input.includes("transaction") || input.includes("history")) {
    return {
      content:
        "You don't have any recent transactions yet. Once you start sending or receiving crypto, they'll appear here.",
    };
  }
  if (input.includes("swap")) {
    return {
      content:
        "I can help you swap tokens. Currently, swaps are available between MOVE, USDC, and ETH. What would you like to swap?",
    };
  }

  return {
    content:
      'I understand you want to: "' +
      userInput +
      "\". I'm your AI wallet assistant. I can help you send crypto, check balances, view transactions, and more. What would you like to do?",
  };
}
