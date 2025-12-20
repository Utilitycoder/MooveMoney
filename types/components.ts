import { Ionicons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";

// Atoms
export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  variant?: "dark" | "light";
}

export interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

// Molecules
export interface AppLogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export interface PaginationDotProps {
  index: number;
  currentIndex: number;
  scrollX: SharedValue<number>;
}

export interface PaginationDotsProps {
  count: number;
  currentIndex: number;
  scrollX: SharedValue<number>;
}
