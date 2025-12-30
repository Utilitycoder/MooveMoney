import { Typography } from "@/components/atoms/Typography";
import { loginStyles } from "@/styles/login";
import { View } from "react-native";

export function SecurityBadge() {
  return (
    <View style={loginStyles.securityRow}>
      <View style={loginStyles.securityDot} />
      <Typography variant="caption" color="textMuted" lines={2}>
        Secured by Privy • Enterprise-grade encryption
      </Typography>
    </View>
  );
}
