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
    // console.log("💬 Parsing send intent from:", input);
    // Try to extract amount and recipient from user input
    const amountMatch = input.match(/(\d+\.?\d*)\s*(move|usdc|eth|usdt)/i);
    const addressMatch = input.match(/0x[a-fA-F0-9]{40}/);
    // Match domain-style addresses like "alice.move" or names after "to"
    // Updated regex to be more flexible and catch "alice.move" format
    const domainMatch = input.match(
      /to\s+([a-zA-Z0-9][a-zA-Z0-9._-]*\.[a-zA-Z0-9]+)/i
    );
    const nameMatch = input.match(/to\s+([a-zA-Z\s]+?)(?:\s|$|0x)/i);


    const amount = amountMatch
      ? `${amountMatch[1]} ${amountMatch[2].toUpperCase()}`
      : "0.00 MOVE";

    // Prefer hex address, then domain-style address, then name
    let recipient = addressMatch
      ? addressMatch[0]
      : domainMatch && domainMatch[1].includes(".")
      ? domainMatch[1]
      : undefined;
    let recipientName =
      nameMatch && !domainMatch
        ? nameMatch[1].trim()
        : domainMatch && !domainMatch[1].includes(".")
        ? domainMatch[1]
        : undefined;

    // If we have a domain-style name but no recipient, use it as recipient
    if (!recipient && domainMatch) {
      recipient = domainMatch[1];
    }

    // If we still don't have a recipient, try to extract from "to X" pattern
    if (!recipient) {
      const toMatch = input.match(/to\s+([^\s]+)/i);
      if (toMatch) {
        recipient = toMatch[1];
      }
    }

    // console.log("📝 Extracted recipient data:", {
    //   recipient,
    //   recipientName,
    //   domainMatch: domainMatch?.[1],
    //   nameMatch: nameMatch?.[1],
    // });

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

    // console.log("✅ Parsed transaction:", transactionData);

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
