import { Typography } from "@/components/atoms/Typography";
import { loginStyles } from "@/styles/login";
import Animated, { FadeInUp } from "react-native-reanimated";

export function TitleSection() {
  return (
    <>
      <Animated.View
        entering={FadeInUp.delay(300).springify()}
        style={loginStyles.titleSection}
      >
        <Typography variant="h3" color="textSecondary" align="center">
          Sign in to
        </Typography>
        <Typography
          variant="h1"
          color="text"
          align="center"
          letterSpacing={-0.8}
        >
          MooveMoney
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).springify()}>
        <Typography
          variant="body"
          color="textMuted"
          align="center"
          style={loginStyles.subtitle}
          lines={0}
        >
          Your AI-powered crypto wallet.{"\n"}Smart, secure, effortless.
        </Typography>
      </Animated.View>
    </>
  );
}
