import { usePrivy } from "@privy-io/expo";
import { Stack } from "expo-router";

export default function AppLayout() {
  const { user } = usePrivy();

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
