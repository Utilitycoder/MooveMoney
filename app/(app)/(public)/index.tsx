import { Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
import OnboardingScreen from "./onboarding";
export default function Index() {
  // const { user } = usePrivy();

  // // <RootNav />

  // // !user ? <RootNav /> : <HomePage />
  return (
    <OnboardingScreen />
    // <View style={styles.container}>
    //   {/* infinite scroll container */}
    //   <View style={styles.infiniteScrollContainer}></View>

    //   {/* content container */}
    //   <View style={styles.contentContainer}>
    //     <Image
    //       source={require("@/assets/images/wolt-logo.png")}
    //       style={styles.brandLogo}
    //     />

    //     <Animated.Text style={styles.tagline} entering={FadeInDown}>
    //       Almost everything delivered
    //     </Animated.Text>
    //   </View>

    //   {/* Login */}

    //   <View style={styles.buttonContainer}>
    //     <Animated.View entering={FadeInDown.delay(100)}>
    //       {/* Google Auth */}
    //       <GoogleAuthButton />
    //     </Animated.View>

    //     <Animated.View entering={FadeInDown.delay(100)}>
    //       {/* Other Options */}
    //       <TouchableOpacity style={styles.otherOptions}>
    //         <Text style={styles.otherOptionsText}>Other Options</Text>
    //       </TouchableOpacity>
    //     </Animated.View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  brandLogo: {
    width: "100%",
    height: 48,
    resizeMode: "contain",
    marginBottom: 20,
  },
  infiniteScrollContainer: {
    flex: 0.8,
  },
  tagline: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: Fonts.brandBlack,
    marginBottom: 50,
    lineHeight: 36,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  otherOptions: {},
  otherOptionsText: {},
});
