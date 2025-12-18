import { ThemeColors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: ThemeColors.background },
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
