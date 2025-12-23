import { ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const floatButtonStyles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  container: {
    position: "absolute",
    bottom: 0,
    right: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "visible",
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
    zIndex: 10,
  },
  menuButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  chatButton: {
    backgroundColor: ThemeColors.primary,
    bottom: 70, // Directly above main button
  },
  voiceButton: {
    backgroundColor: ThemeColors.primary,
    bottom: 140, // Above chat button (adjusted for larger button size)
    zIndex: 4,
  },
});
