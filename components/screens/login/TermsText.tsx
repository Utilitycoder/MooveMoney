import { Fonts, ThemeColors } from "@/constants/theme";
import { loginStyles } from "@/styles/login";
import { Text } from "react-native";

export function TermsText() {
  return (
    <Text style={loginStyles.terms} numberOfLines={0}>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontSize: 12,
          color: ThemeColors.textMuted,
          textAlign: "center",
        }}
      >
        By continuing, you agree to our{" "}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontSize: 12,
          color: ThemeColors.primaryDark,
        }}
      >
        Terms of Service
      </Text>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontSize: 12,
          color: ThemeColors.textMuted,
          textAlign: "center",
        }}
      >
        {" "}
        and{" "}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontSize: 12,
          color: ThemeColors.primaryDark,
        }}
      >
        Privacy Policy
      </Text>
    </Text>
  );
}
