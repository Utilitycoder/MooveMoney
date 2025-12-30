import { Typography } from "@/components/atoms/Typography";
import { ThemeColors } from "@/constants/theme";
import { loginStyles } from "@/styles/login";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, View } from "react-native";

interface GoogleLoginButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export function GoogleLoginButton({
  onPress,
  isLoading,
}: GoogleLoginButtonProps) {
  return (
    <Pressable
      style={loginStyles.googleButton}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={ThemeColors.surface} />
      ) : (
        <View style={loginStyles.googleButtonContent}>
          <Ionicons name="logo-google" size={18} color={ThemeColors.surface} />
          <Typography variant="buttonBold" color="surface">
            Continue with Google
          </Typography>
        </View>
      )}
    </Pressable>
  );
}
