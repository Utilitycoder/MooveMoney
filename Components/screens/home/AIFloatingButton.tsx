import { ThemeColors } from "@/constants/theme";
import { AIFloatingButtonProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onPress }) => {
  return (
    <Animated.View entering={FadeInUp.delay(400)} style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Ionicons name="sparkles" size={24} color={ThemeColors.text} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default AIFloatingButton;
