import { SharedValue } from "react-native-reanimated";

export interface ChatMessage {
  id: string;
  text?: string;
  content: string;
  timestamp: Date;
  role: "user" | "assistant";
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface ChatStore {
  chatHistory: Chat[];
  isWaitingForResponse: boolean;
  createNewChat: (title: string) => string;
  addNewMessage: (chatId: string, message: ChatMessage) => void;
  setIsWaitingForResponse: (isWaitingForResponse: boolean) => void;
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
}

export interface TransactionApprovalModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: TransactionDetails | null;
  onApprove: () => void;
  onReject: () => void;
}

export interface AIResponse {
  content: string;
  isSendIntent?: boolean;
  transaction?: TransactionDetails;
}
