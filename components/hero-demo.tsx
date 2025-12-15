"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Mic,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_COMMANDS = [
  "Send 50 USDC to Alice",
  "Check my balance",
  "Send 0.5 ETH to bob.move",
  "Save alice.move to contacts",
  "Show my MOVE balance",
];

// Sample transactions for the live feed
const SAMPLE_TRANSACTIONS = [
  {
    type: "received",
    amount: "125 USDC",
    from: "sarah.move",
    time: "Just now",
  },
  { type: "sent", amount: "50 MOVE", to: "alex.move", time: "2s ago" },
  {
    type: "balance",
    amount: "2,450 MOVE",
    description: "Balance checked",
    time: "5s ago",
  },
  { type: "received", amount: "0.5 ETH", from: "mike.move", time: "8s ago" },
  { type: "sent", amount: "75 USDC", to: "emma.move", time: "12s ago" },
  {
    type: "saved",
    address: "emma.move",
    description: "Address saved",
    time: "15s ago",
  },
  { type: "received", amount: "300 MOVE", from: "david.move", time: "18s ago" },
  { type: "sent", amount: "1.2 ETH", to: "lisa.move", time: "22s ago" },
  { type: "received", amount: "88 USDC", from: "john.move", time: "25s ago" },
  {
    type: "balance",
    amount: "1,200 USDC",
    description: "Balance checked",
    time: "30s ago",
  },
];

interface Transaction {
  id: number;
  type: string;
  amount?: string;
  from?: string;
  to?: string;
  address?: string;
  description?: string;
  time: string;
  isNew?: boolean;
}

export function HeroDemo() {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(EXAMPLE_COMMANDS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeIcon, setActiveIcon] = useState<"chat" | "voice" | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txIdCounter, setTxIdCounter] = useState(0);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = EXAMPLE_COMMANDS.indexOf(prev);
        return EXAMPLE_COMMANDS[(currentIndex + 1) % EXAMPLE_COMMANDS.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Initialize transactions
  useEffect(() => {
    const initialTxs = SAMPLE_TRANSACTIONS.slice(0, 3).map((tx, i) => ({
      ...tx,
      id: i,
      isNew: false,
    }));
    setTransactions(initialTxs);
    setTxIdCounter(3);
  }, []);

  // Add new transaction periodically
  const addNewTransaction = useCallback(() => {
    const randomTx =
      SAMPLE_TRANSACTIONS[
        Math.floor(Math.random() * SAMPLE_TRANSACTIONS.length)
      ];
    const newTx: Transaction = {
      ...randomTx,
      id: txIdCounter,
      time: "Just now",
      isNew: true,
    };

    setTransactions((prev) => {
      const updated = [newTx, ...prev.slice(0, 4)].map((tx, i) => ({
        ...tx,
        isNew: i === 0,
        time:
          i === 0
            ? "Just now"
            : i === 1
            ? "3s ago"
            : i === 2
            ? "8s ago"
            : i === 3
            ? "15s ago"
            : "25s ago",
      }));
      return updated;
    });

    setTxIdCounter((prev) => prev + 1);

    // Remove "new" highlight after animation
    setTimeout(() => {
      setTransactions((prev) => prev.map((tx) => ({ ...tx, isNew: false })));
    }, 1000);
  }, [txIdCounter]);

  // Periodically add new transactions
  useEffect(() => {
    const interval = setInterval(() => {
      addNewTransaction();
    }, 4000); // New transaction every 4 seconds

    return () => clearInterval(interval);
  }, [addNewTransaction]);

  // Handle submission
  const handleSubmit = () => {
    if (!inputValue.trim() && !isRecording) return;

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setInputValue("");
    }, 1500);
  };

  // Handle voice recording simulation
  const handleVoiceClick = () => {
    setIsRecording(true);
    setActiveIcon("voice");

    // Simulate voice recording
    setTimeout(() => {
      setInputValue("Send 50 USDC to Alice");
      setIsRecording(false);
      setActiveIcon(null);
      handleSubmit();
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className="overflow-hidden glass-card gradient-border border-0 p-6 md:p-8 rounded-3xl">
      {/* Input Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4">
        <div className="flex gap-3">
          {/* Chat Icon */}
          <button
            onClick={() => setActiveIcon(activeIcon === "chat" ? null : "chat")}
            onMouseEnter={() => !isRecording && setActiveIcon("chat")}
            onMouseLeave={() => !isRecording && setActiveIcon(null)}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer",
              activeIcon === "chat"
                ? "icon-gradient border-primary/50 scale-110 shadow-lg glow-sm"
                : "icon-gradient border-primary/20 hover:border-primary/40 hover:scale-105"
            )}
          >
            <MessageSquare
              className={cn(
                "h-7 w-7 transition-colors duration-300",
                activeIcon === "chat" ? "text-primary" : "text-primary/70"
              )}
            />
          </button>

          {/* Voice Icon */}
          <button
            onClick={handleVoiceClick}
            onMouseEnter={() => !isRecording && setActiveIcon("voice")}
            onMouseLeave={() => !isRecording && setActiveIcon(null)}
            disabled={isRecording}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer relative",
              activeIcon === "voice" || isRecording
                ? "icon-gradient border-primary/50 scale-110 shadow-lg glow-sm"
                : "icon-gradient border-primary/20 hover:border-primary/40 hover:scale-105"
            )}
          >
            <Mic
              className={cn(
                "h-7 w-7 transition-colors duration-300",
                activeIcon === "voice" || isRecording
                  ? "text-primary"
                  : "text-primary/70"
              )}
            />
            {/* Recording indicator */}
            {isRecording && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Input Field */}
        <div className="flex-1 w-full">
          <div className="mb-1 text-sm text-muted-foreground">
            {isRecording ? "Listening..." : "Type or speak your command"}
          </div>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isRecording}
              className={cn(
                "w-full bg-transparent text-xl font-semibold outline-none placeholder:text-muted-foreground/50 transition-all duration-300 pr-10",
                isRecording && "animate-pulse"
              )}
            />
            {inputValue && !isProcessing && (
              <button
                onClick={handleSubmit}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
              >
                <Send className="h-5 w-5 text-primary" />
              </button>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
            isProcessing
              ? "bg-primary/20 text-primary"
              : isRecording
              ? "bg-red-500/20 text-red-500"
              : "bg-muted/50 text-muted-foreground"
          )}
        >
          {isProcessing ? (
            <>
              <div className="flex gap-1">
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-sm font-medium">Processing</span>
            </>
          ) : isRecording ? (
            <>
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium">Recording</span>
            </>
          ) : (
            <>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">Ready</span>
            </>
          )}
        </div>
      </div>

      {/* Live Transaction Feed */}
      <div className="mt-4">
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border bg-muted/30 transition-colors duration-300",
                tx.isNew ? "border-primary/40" : "border-border/50"
              )}
            >
              {/* Transaction Icon */}
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-all duration-300",
                  tx.type === "received"
                    ? "bg-green-500/20"
                    : tx.type === "sent"
                    ? "bg-blue-500/20"
                    : tx.type === "balance"
                    ? "bg-primary/20"
                    : "bg-orange-500/20"
                )}
              >
                {tx.type === "received" ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-500" />
                ) : tx.type === "sent" ? (
                  <ArrowUpRight className="h-4 w-4 text-blue-500" />
                ) : tx.type === "balance" ? (
                  <Wallet className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4 text-orange-500" />
                )}
              </div>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {tx.type === "received" && (
                    <>
                      Received{" "}
                      <span className="text-green-500">{tx.amount}</span>
                    </>
                  )}
                  {tx.type === "sent" && (
                    <>
                      Sent <span className="text-blue-500">{tx.amount}</span>
                    </>
                  )}
                  {tx.type === "balance" && (
                    <>
                      Balance: <span className="text-primary">{tx.amount}</span>
                    </>
                  )}
                  {tx.type === "saved" && (
                    <>
                      Saved{" "}
                      <span className="text-orange-500">{tx.address}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {tx.type === "received" && `From ${tx.from}`}
                  {tx.type === "sent" && `To ${tx.to}`}
                  {tx.type === "balance" && tx.description}
                  {tx.type === "saved" && "Added to contacts"}
                </div>
              </div>

              {/* Time */}
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {tx.time}
              </div>

              {/* New indicator */}
              {tx.isNew && (
                <span className="flex items-center justify-center h-5 w-5 text-[9px] font-bold bg-primary text-primary-foreground rounded-full animate-pulse">
                  ●
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hint Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Try typing a command or click the{" "}
          <span className="text-primary font-medium">microphone</span> to
          simulate voice input
        </p>
      </div>
    </Card>
  );
}
