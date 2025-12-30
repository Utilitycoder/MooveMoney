import { ProcessingStage } from "@/types/chat";
import { Easing } from "react-native-reanimated";

export const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const STAGE_MESSAGES: Record<ProcessingStage, string> = {
  submitting: "Preparing transaction...",
  signing: "Signing transaction...",
  confirming: "Confirming on network...",
  completed: "Transaction completed!",
  failed: "Transaction failed",
};

export const STAGE_DETAILS = [
  { key: "submitting", label: "Prepare", icon: "document-text" },
  { key: "signing", label: "Sign", icon: "finger-print" },
  { key: "confirming", label: "Confirm", icon: "checkmark-circle" },
] as const;
