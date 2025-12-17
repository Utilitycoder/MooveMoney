import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const RootNav = () => {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootNav;

const styles = StyleSheet.create({});
