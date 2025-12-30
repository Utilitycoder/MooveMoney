  import {
  clearSessionExpiredListener,
  isInLoginGracePeriod,
  setSessionExpiredListener,
} from "@/lib/api";
import { getIdToken } from "@/lib/auth";
import { usePrivy } from "@privy-io/expo";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  const { user, logout } = usePrivy();

  // Set up session expiration listener to trigger Privy logout
  useEffect(() => {
    if (!user) return;

    setSessionExpiredListener(() => {
      // Call Privy logout when session expires
      logout().catch((error) => {
        console.error("Error during session expiration logout:", error);
      });
    });

    // Check for "zombie" session (Privy user exists but no backend token)
    const validateSession = async () => {
      const token = await getIdToken();
      if (!token && !isInLoginGracePeriod()) {
        logout().catch(console.error);
      }
    };

    // Add a small delay before validation to ensure LoginScreenUI has time to set the grace period
    const validationTimeout = setTimeout(() => {
      validateSession();
    }, 1000);

    return () => {
      clearSessionExpiredListener();
      clearTimeout(validationTimeout);
    };
  }, [user, logout]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}
