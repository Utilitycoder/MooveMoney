import { usePrivy } from "@privy-io/expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomePage = () => {
  const { logout, user } = usePrivy();
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
