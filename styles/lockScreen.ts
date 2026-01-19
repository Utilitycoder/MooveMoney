import { ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const lockScreenStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    alignItems: "center",
    justifyContent: "center",
  },
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 215, 0, 0.05)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(255, 165, 0, 0.03)",
  },
  content: {
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  brandSection: {
    marginBottom: 60,
  },
  brandIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  authArea: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  pulseRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: ThemeColors.primary,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 80,
  },
  bottomHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    opacity: 0.6,
  },
  hintText: {
    color: ThemeColors.textMuted,
    fontSize: 12,
  },
});
