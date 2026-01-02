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
        <Typography
          variant="h3"
          color="textSecondary"
          align="center"
          text="Sign in to"
        />

        <Typography
          variant="h1"
          color="text"
          align="center"
          letterSpacing={-0.8}
          text="MooveMoney"
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).springify()}>
        <Typography
          variant="body"
          color="textMuted"
          align="center"
          style={loginStyles.subtitle}
          text={`Your AI-powered crypto wallet.\nSmart, secure, effortless.`}
        />
      </Animated.View>
    </>
  );
}
