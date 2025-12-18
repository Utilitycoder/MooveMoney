import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  variant?: "dark" | "light";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon = "arrow-forward",
  disabled = false,
  variant = "dark",
}) => {
  const isDark = variant === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDark ? styles.buttonDark : styles.buttonLight,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <Text
        style={[styles.buttonText, isDark ? styles.textLight : styles.textDark]}
      >
        {title}
      </Text>
      <View
        style={[
          styles.iconContainer,
          isDark ? styles.iconContainerLight : styles.iconContainerDark,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isDark ? ThemeColors.text : ThemeColors.background}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
  },
  buttonDark: {
    backgroundColor: ThemeColors.text,
  },
  buttonLight: {
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 17,
  },
  textLight: {
    color: ThemeColors.background,
  },
  textDark: {
    color: ThemeColors.text,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerLight: {
    backgroundColor: ThemeColors.background,
  },
  iconContainerDark: {
    backgroundColor: ThemeColors.text,
  },
});

export default PrimaryButton;
