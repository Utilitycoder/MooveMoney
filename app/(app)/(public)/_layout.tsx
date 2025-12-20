import { ThemeColors } from "@/constants/theme";
import { useAppStore } from "@/stores/appStore";
import { Stack } from "expo-router";

const PublicLayout = () => {
  const onBoardCompleted = useAppStore((state) => state.onboardingCompleted);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: ThemeColors.background },
      }}
      initialRouteName={onBoardCompleted ? "login" : "onboarding"}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
};

export default PublicLayout;
