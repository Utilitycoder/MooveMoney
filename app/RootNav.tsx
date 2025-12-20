import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { usePrivy } from "@privy-io/expo";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootNav() {
  let [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  const { isReady } = usePrivy();

  useEffect(() => {
    if (isReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
