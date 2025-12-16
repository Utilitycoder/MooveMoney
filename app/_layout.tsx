import { PrivyProvider } from "@privy-io/expo";
import Constants from "expo-constants";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <Stack />
    </PrivyProvider>
  );
}
