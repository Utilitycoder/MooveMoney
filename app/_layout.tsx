import RootNav from "./RootNav";

import LockScreen from "@/components/screens/security/LockScreen";
import { useAppStore } from "@/stores/appStore";
import { useSecurityStore } from "@/stores/securityStore";
import { PrivyProvider } from "@privy-io/expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5_000,
      gcTime: 2 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default function RootLayout() {
  const { isLocked, setLocked, requiresAuthentication } = useSecurityStore();
  const { user, onboardingCompleted } = useAppStore();
  const appState = useRef(AppState.currentState);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        (nextAppState: AppStateStatus) => {
          const isComingToForeground =
            appState.current.match(/inactive|background/) &&
            nextAppState === "active";

          const isGoingToBackground = nextAppState === "background";

          if (isComingToForeground) {
            // App coming to foreground
            const timeInBackground = Date.now() - (backgroundedAt.current || 0);
            const GRACE_PERIOD_MS = 30000; // 30 seconds

            // If backgroundedAt is null (fresh start or wasn't backgrounded properly),
            // timeInBackground will be huge, so it won't unlock automatically.
            // This preserves security on cold launches.
            if (backgroundedAt.current && timeInBackground < GRACE_PERIOD_MS) {
              setLocked(false);
            }
            backgroundedAt.current = null; // Reset
          } else if (isGoingToBackground) {
            // App going to background - Lock immediately for privacy
            if (onboardingCompleted && user?.walletAddress) {
              setLocked(true);
              backgroundedAt.current = Date.now();
            }
          }

          appState.current = nextAppState;
        };
      }
    );

    return () => {
      subscription.remove();
    };
  }, [onboardingCompleted, user, setLocked]);

  const shouldShowLockScreen =
    isLocked &&
    requiresAuthentication &&
    onboardingCompleted &&
    !!user?.walletAddress;

  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <RootNav />
            <LockScreen showLock={shouldShowLockScreen} />
          </KeyboardProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </PrivyProvider>
  );
}
