import { Fonts, ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoSection: {
    marginBottom: 28,
  },
  logoMark: {
    width: 80,
    height: 80,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: Fonts.brand,
    fontSize: 24,
    color: ThemeColors.textSecondary,
    letterSpacing: -0.3,
  },
  titleBrand: {
    fontFamily: Fonts.brandBlack,
    fontSize: 32,
    color: ThemeColors.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  featurePills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  pillText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 12,
    color: ThemeColors.textSecondary,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ThemeColors.text,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  googleButtonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.surface,
    letterSpacing: -0.2,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
  },
  errorText: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.error,
    flex: 1,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  securityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.success,
  },
  securityText: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  terms: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: ThemeColors.primaryDark,
  },
});
