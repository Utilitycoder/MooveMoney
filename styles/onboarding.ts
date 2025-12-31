import { Fonts, ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const onBoardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  skipButton: {
    alignSelf: "flex-end",
  },
  bottomSection: {
    paddingHorizontal: 24,
    gap: 24,
  },
  primaryButton: {
    backgroundColor: ThemeColors.text,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: ThemeColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const onboardingSlideStyles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    marginBottom: 48,
    position: "relative",
  },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  iconInner: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: ThemeColors.border,
    top: -10,
    left: -10,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 4,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 34,
    color: ThemeColors.text,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 16,
  },
  highlightedTitle: {
    fontFamily: Fonts.brandBlack,
    color: ThemeColors.primaryDark,
  },
  description: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
});
