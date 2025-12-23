import { ThemeColors } from "@/constants/theme";
import { AuthBoundary } from "@privy-io/expo";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  return (
    <AuthBoundary
      loading={<ActivityIndicator />}
      unauthenticated={<Redirect href="/(app)/(public)/login" />}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: ThemeColors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="chat"
          options={{
            gestureEnabled: true,
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="voice"
          options={{
            gestureEnabled: true,
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </AuthBoundary>
  );
}
