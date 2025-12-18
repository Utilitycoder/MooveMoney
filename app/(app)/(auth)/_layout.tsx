import { ThemeColors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
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
          animation: "slide_from_bottom",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />
    </Stack>
  );
}
