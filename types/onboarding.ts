import { Ionicons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";

export interface OnboardingScreenProps {
  onComplete?: () => void;
}

export interface OnboardingSlideData {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  title: string;
  highlightedText: string;
  description: string;
}

export interface OnboardingSlideProps {
  item: OnboardingSlideData;
  index: number;
  scrollX: SharedValue<number>;
}
