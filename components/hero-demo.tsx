"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Mic, Zap, Shield, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_COMMANDS = [
  "Send 50 USDC to Alice",
  "Swap 100 MOVE for USDC",
  "Check my balance",
  "Send 0.5 ETH to bob.move",
  "What's the price of MOVE?",
];

export function HeroDemo() {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(EXAMPLE_COMMANDS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSteps, setShowSteps] = useState({ step1: false, step2: false });
  const [activeIcon, setActiveIcon] = useState<"chat" | "voice" | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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

  // Handle submission
  const handleSubmit = () => {
    if (!inputValue.trim() && !isRecording) return;

    setIsProcessing(true);
    setShowSteps({ step1: false, step2: false });

    // Simulate processing steps
    setTimeout(() => setShowSteps((s) => ({ ...s, step1: true })), 800);
    setTimeout(() => setShowSteps((s) => ({ ...s, step2: true })), 1500);
    setTimeout(() => {
      setIsProcessing(false);
      setInputValue("");
    }, 2500);
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-border/50 pb-6">
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

      {/* Transaction Steps */}
      <div className="mt-6 space-y-3">
        {/* Step 1: Transaction Prepared */}
        <div
          className={cn(
            "flex items-center gap-4 rounded-2xl p-5 border transition-all duration-500",
            showSteps.step1
              ? "bg-linear-to-r from-primary/10 to-primary/5 border-primary/20 opacity-100 translate-x-0"
              : "bg-muted/30 border-border/50 opacity-50"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500",
              showSteps.step1
                ? "bg-primary/20 scale-100"
                : "bg-muted/50 scale-90"
            )}
          >
            <Zap
              className={cn(
                "h-5 w-5 transition-colors duration-500",
                showSteps.step1 ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Transaction Prepared</div>
            <div className="text-xs text-muted-foreground">
              {inputValue || "50 USDC"} →{" "}
              {inputValue.includes("bob") ? "bob.move" : "alice.move"}
            </div>
          </div>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500",
              showSteps.step1
                ? "bg-green-500/20 text-green-500 scale-100"
                : "bg-muted/50 text-muted-foreground scale-75"
            )}
          >
            {showSteps.step1 ? "✓" : "○"}
          </div>
        </div>

        {/* Step 2: Security Check */}
        <div
          className={cn(
            "flex items-center gap-4 rounded-2xl p-5 border transition-all duration-500",
            showSteps.step2
              ? "bg-linear-to-r from-primary/10 to-primary/5 border-primary/20 opacity-100 translate-x-0"
              : "bg-muted/30 border-border/50 opacity-50"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500",
              showSteps.step2
                ? "bg-primary/20 scale-100"
                : "bg-muted/50 scale-90"
            )}
          >
            <Shield
              className={cn(
                "h-5 w-5 transition-colors duration-500",
                showSteps.step2 ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Security Check</div>
            <div className="text-xs text-muted-foreground">
              Verified by Privy
            </div>
          </div>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500",
              showSteps.step2
                ? "bg-green-500/20 text-green-500 scale-100"
                : "bg-muted/50 text-muted-foreground scale-75"
            )}
          >
            {showSteps.step2 ? "✓" : "○"}
          </div>
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
