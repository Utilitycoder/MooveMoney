import { ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  role: "user" | "assistant";
}

export interface Chat {
  id: string;
  title: string;
  conversationId?: string;
  messages: ChatMessage[];
}

export type TransactionUIState = "idle" | "approval" | "processing" | "result";

export interface TransactionState {
  uiState: TransactionUIState;
  processingStage: ProcessingStage;
  result: TransactionResult | null;
  pendingTransaction: TransactionDetails | null;
}

export interface ChatInputProps {
  // value: string;
  onSend: (message: string) => void;
  // isLoading?: boolean;
  // placeholder?: string;
  // onChangeText: (text: string) => void;
}

export interface ChatStore {
  messages: ChatMessage[];
  isWaitingForResponse: boolean;
  conversationId: string | undefined;
  conversationHistory: { role: "user" | "assistant"; content: string }[];
  addMessage: (message: ChatMessage) => void;
  setIsWaitingForResponse: (isWaitingForResponse: boolean) => void;
  setConversationId: (conversationId: string | undefined) => void;
  setConversationHistory: (
    history: { role: "user" | "assistant"; content: string }[]
  ) => void;
  clearMessages: () => void;
}

export interface VoiceRecordingModalProps {
  visible: boolean;
  onClose: () => void;
  onTranscription: (text: string) => void;
}

export type VoiceModalMode = "recording" | "preview";

export interface WaveBarProps {
  index: number;
  audioLevel: { value: number };
}

export interface UseVoiceRecordingProps {
  visible: boolean;
  onClose: () => void;
  onTranscription: (text: string) => void;
}

export interface PreviewContentProps {
  isPlaying: boolean;
  recordingDuration: number;
  onPlayPause: () => void;
}

export interface VoiceRecordingFooterProps {
  mode: VoiceModalMode;
  paddingBottom: number;
  onCancel: () => void;
  onStopRecording: () => void;
  onReRecord: () => void;
  onSend: () => void;
}

export interface RecordingContentProps {
  isRecording: boolean;
  recordingDuration: number;
  pulseAnim: SharedValue<number>;
  glowAnim: SharedValue<number>;
  micScale: SharedValue<number>;
  audioLevel: SharedValue<number>;
}

export interface PulsingAICircleProps {
  pulseAnim: SharedValue<number>;
  glowAnim: SharedValue<number>;
  micScale: SharedValue<number>;
  audioLevel: SharedValue<number>;
}

export interface VoiceRecordingHeaderProps {
  mode: VoiceModalMode;
  onClose: () => void;
}

export interface EmptyChatProps {
  onSuggestionPress: (suggestion: string) => void;
}

export interface ChatHeaderProps {
  onBack: () => void;
  onClear?: () => void;
}

export interface ChatBubbleProps {
  message: ChatMessage;
  index: number;
}

export interface TransactionDetails {
  amount: string;
  recipient?: string;
  recipientName?: string;
  network?: string;
  fee?: string;
  total?: string;
  type?: "send" | "receive" | "swap";
}

export interface AIResponse {
  content: string;
  isSendIntent?: boolean;
  isEndConversation?: boolean;
  transaction?: TransactionDetails;
  conversationId?: string;
  actions?: ChatAction[];
  conversationHistory?: { role: "user" | "assistant"; content: string }[];
  isVoice?: boolean;
  audioUrl?: string;
}

export interface ChatAction {
  type: string;
  data: Record<string, unknown>;
}

export interface ChatApiResponse {
  status: boolean;
  data: {
    conversationId: string;
    response: string;
    actions?: ChatAction[];
    conversationHistory?: { role: "user" | "assistant"; content: string }[];
    isVoice?: boolean;
    audioUrl?: string;
  };
}

export type ProcessingStage =
  | "submitting"
  | "signing"
  | "confirming"
  | "completed"
  | "failed";

export interface TransactionResult {
  success: boolean;
  transactionId?: string;
  completionTime?: string;
  errorMessage?: string;
  errorCode?: string;
}

export interface ApprovalContentProps {
  transaction: TransactionDetails | null;
  isApproving: boolean;
  showApprovalContent: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export interface TransactionFlowModalProps {
  visible: boolean;
  uiState: TransactionUIState;
  processingStage: ProcessingStage;
  transaction: TransactionDetails | null;
  result: TransactionResult | null;
  isApproving: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onTryAgain: () => void;
  onViewDetails: () => void;
  onSaveAddress: (address: string, name: string) => void;
}

export interface ProcessingContentProps {
  transaction: {
    amount?: string;
  } | null;
  showProcessingContent: boolean;
  processingStage: ProcessingStage;
  currentStageIndex: number;
  isCompleted: boolean;
  spinnerStyle: ViewStyle;
  getRecipientDisplay: () => string;
}

export interface ResultContentProps {
  transaction: TransactionDetails | null;
  result: TransactionResult | null;
  isSuccess: boolean;
  showSavePrompt: boolean;
  contactName: string;
  resultIconStyle: ViewStyle;
  onViewDetails: () => void;
  onClose: () => void;
  onTryAgain: () => void;
  onSaveAddress: () => void;
  setShowSavePrompt: (show: boolean) => void;
  setContactName: (name: string) => void;
  getRecipientDisplay: () => string;
  showResultContent: boolean;
}
