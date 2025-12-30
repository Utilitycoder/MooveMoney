import { Typography } from "@/components/atoms/Typography";
import { ThemeColors } from "@/constants/theme";
import { loginStyles } from "@/styles/login";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      style={loginStyles.errorContainer}
    >
      <Ionicons name="alert-circle" size={16} color={ThemeColors.error} />
      <Typography variant="body" color="error" style={{ flex: 1 }}>
        {message}
      </Typography>
    </Animated.View>
  );
}
