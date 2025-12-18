export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
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
