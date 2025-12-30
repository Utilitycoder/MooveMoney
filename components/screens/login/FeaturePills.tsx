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
        <Typography variant="caption" color="textSecondary">
          AI Assistant
        </Typography>
      </View>
      <View style={loginStyles.pill}>
        <Ionicons name="mic" size={12} color={ThemeColors.primaryDark} />
        <Typography variant="caption" color="textSecondary">
          Voice Commands
        </Typography>
      </View>
      <View style={loginStyles.pill}>
        <Ionicons name="flash" size={12} color={ThemeColors.primaryDark} />
        <Typography variant="caption" color="textSecondary">
          Instant Transfers
        </Typography>
      </View>
    </Animated.View>
  );
}
