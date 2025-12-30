import { loginStyles } from "@/styles/login";
import { Image, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export function LogoSection() {
  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={loginStyles.logoSection}
    >
      <View>
        <Image
          source={require("@/assets/images/logo.png")}
          style={loginStyles.logoMark}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}
