import RootNav from "./RootNav";

import { PrivyProvider } from "@privy-io/expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <RootNav />
          </KeyboardProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </PrivyProvider>
  );
}
