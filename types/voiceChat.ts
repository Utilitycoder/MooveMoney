import { SharedValue } from "react-native-reanimated";
import { ChatMessage, TransactionDetails } from "./chat";

export interface VoiceChatConfig {
  transcriptionEndpoint: string;
  chatEndpoint: string;
  apiKey: string;
}

export type VoiceChatState =
  | "idle" // Not in conversation
  | "listening" // In conversation, waiting for user to speak
  | "recording" // Currently recording
  | "processing" // Transcribing and getting AI response
  | "responding" // AI is responding
  | "error"; // An error occurred

export interface VoiceChatMessage extends ChatMessage {
  audioUri?: string; // Original audio URI for user messages
  isVoiceInput?: boolean; // Whether this was from voice input
}

export interface UseVoiceChatProps {
  onTransactionDetected?: (transaction: TransactionDetails) => void;
  useMockService?: boolean; // Use mock service for development
}

export interface UseVoiceChatReturn {
  // State
  state: VoiceChatState;
  messages: VoiceChatMessage[];
  error: string | null;
  isRecording: boolean;
  isInConversation: boolean;
  recordingDuration: number;

  // Animations
  animations: {
    pulseAnim: SharedValue<number>;
    glowAnim: SharedValue<number>;
    micScale: SharedValue<number>;
    audioLevel: SharedValue<number>;
  };

  // Actions
  startConversation: () => Promise<void>;
  stopRecording: () => Promise<void>;
  endConversation: () => void;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}

export interface VoiceChatHeaderProps {
  state: VoiceChatState;
  isInConversation: boolean;
  onClose: () => void;
  onEndConversation?: () => void;
  onClear?: () => void;
}

export interface VoiceChatInputProps {
  state: VoiceChatState;
  isRecording: boolean;
  isInConversation: boolean;
  recordingDuration: number;
  onStartConversation: () => void;
  onStopRecording: () => void;
  onEndConversation: () => void;
  animations: {
    pulseAnim: SharedValue<number>;
    micScale: SharedValue<number>;
    audioLevel: SharedValue<number>;
  };
}

export interface VoiceChatBubbleProps {
  message: VoiceChatMessage;
  index: number;
}

export interface ProcessingIndicatorProps {
  state: VoiceChatState;
}
