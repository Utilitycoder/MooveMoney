import { PrivyProvider } from "@privy-io/expo";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </PrivyProvider>
  );
}
