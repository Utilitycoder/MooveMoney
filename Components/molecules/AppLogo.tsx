import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AppLogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const AppLogo: React.FC<AppLogoProps> = ({
  size = "medium",
  showText = true,
}) => {
  const sizes = {
    small: { icon: 20, container: 32, fontSize: 18, iconRadius: 8 },
    medium: { icon: 32, container: 48, fontSize: 28, iconRadius: 14 },
    large: { icon: 40, container: 64, fontSize: 32, iconRadius: 18 },
  };

  const currentSize = sizes[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            width: currentSize.container,
            height: currentSize.container,
            borderRadius: currentSize.iconRadius,
          },
        ]}
      >
        <Ionicons
          name="wallet"
          size={currentSize.icon}
          color={ThemeColors.text}
        />
      </View>
      {showText && (
        <Text style={[styles.logoText, { fontSize: currentSize.fontSize }]}>
          Moove<Text style={styles.logoTextAccent}>Money</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: Fonts.brandBlack,
    color: ThemeColors.text,
  },
  logoTextAccent: {
    color: ThemeColors.primaryDark,
  },
});

export default AppLogo;
