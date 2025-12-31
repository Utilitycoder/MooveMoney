import { Typography } from "@/components/atoms/Typography";
import { ThemeColors } from "@/constants/theme";
import { loginStyles } from "@/styles/login";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export function FeaturePills() {
  return (
    <Animated.View
      entering={FadeInUp.delay(500).springify()}
      style={loginStyles.featurePills}
    >
      <View style={loginStyles.pill}>
        <Ionicons name="sparkles" size={12} color={ThemeColors.primaryDark} />
        <Typography
          variant="caption"
          color="textSecondary"
          text="AI Assistant"
        />
      </View>
      <View style={loginStyles.pill}>
        <Ionicons name="mic" size={12} color={ThemeColors.primaryDark} />
        <Typography
          variant="caption"
          color="textSecondary"
          text="Voice Commands"
        />
      </View>
      <View style={loginStyles.pill}>
        <Ionicons name="flash" size={12} color={ThemeColors.primaryDark} />
        <Typography
          variant="caption"
          color="textSecondary"
          text="Instant Transfers"
        />
      </View>
    </Animated.View>
  );
}
