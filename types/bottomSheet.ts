import { Ionicons } from "@expo/vector-icons";

export interface BottomSheetOption {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  destructive?: boolean;
}

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  options: BottomSheetOption[];
  title?: string;
}
