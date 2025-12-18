import { Ionicons } from "@expo/vector-icons";

export interface OnboardingSlideData {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  title: string;
  highlightedText: string;
  description: string;
}
