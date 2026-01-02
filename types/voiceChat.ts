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
  audioBase64?: string; // Base64 encoded audio for API/storage
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
  addMessage: (message: VoiceChatMessage) => void;
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
  userInitials?: string;
}

export interface ProcessingIndicatorProps {
  state: VoiceChatState;
}

export interface IdleStateProps {
  onStartConversation: () => void;
  buttonAnimatedStyle: any;
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export interface ListeningRowProps {
  onEndConversation: () => void;
  listeningStyle: any;
}

export interface RecordingRowProps {
  ring1Style: any;
  ring2Style: any;
  buttonAnimatedStyle: any;
  recordingDuration: number;
  handlePressIn: () => void;
  handlePressOut: () => void;
  onStopRecording: () => void;
  onEndConversation: () => void;
  audioLevel: { value: number };
}

export interface UseVoiceInputAnimationsProps {
  state: string;
  isRecording: boolean;
  micScale: { value: number };
}

export interface VoiceChatWaveBarProps {
  index: number;
  totalBars: number;
  audioLevel: { value: number };
}
