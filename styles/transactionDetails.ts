import { Fonts, ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const transactionDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: ThemeColors.surface,
    // borderBottomWidth: 1,
    // borderBottomColor: ThemeColors.borderLight,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ThemeColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },

  // Hero Card - Modern Design
  heroCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 24,
    elevation: 1,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    color: ThemeColors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  heroDate: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
    marginBottom: 2,
  },
  heroSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
  },
  amountSection: {
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
    paddingTop: 20,
    alignItems: "center",
  },
  amountLabel: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  amountValue: {
    fontFamily: Fonts.brandBold,
    fontSize: 36,
    color: ThemeColors.primaryDark,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  typeBadgeText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Info Section
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.muted,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 0.2,
    borderWidth: 1,
    backgroundColor: ThemeColors.surface,
    borderColor: ThemeColors.borderLight,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoCardHeaderText: {
    flex: 1,
  },
  infoCardLabel: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.muted,
    marginBottom: 4,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  infoCardValue: {
    fontFamily: Fonts.brandMedium,
    fontSize: 16,
    color: ThemeColors.text,
    letterSpacing: -0.2,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  addressText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.text,
    flex: 1,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  copyButtonSmall: {
    padding: 6,
    marginLeft: 8,
  },

  totalValue: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },

  // Hash Section
  hashSection: {
    marginBottom: 24,
  },
  hashCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    elevation: 0.2,
  },
  hashHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  hashIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${ThemeColors.primaryDark}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  hashValue: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: ThemeColors.text,
    flex: 1,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  copyButtonLarge: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: ThemeColors.background,
    borderColor: ThemeColors.borderLight,
  },
  copyButtonTouchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 18,
    minHeight: 44,
  },
  copyButtonTextContainer: {
    position: "relative",
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  copyButtonTextContainerCopied: {
    minWidth: 55,
  },
  copyButtonText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.primaryDark,
    letterSpacing: 0.2,
  },
  copiedText: {
    color: ThemeColors.success,
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    letterSpacing: 0.2,
  },

  // Error Card
  errorCard: {
    backgroundColor: `${ThemeColors.error}08`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${ThemeColors.error}20`,
  },
  errorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  errorLabel: {
    fontFamily: Fonts.brandBold,
    fontSize: 15,
    color: ThemeColors.error,
  },
  errorMessage: {
    fontFamily: Fonts.brandMedium,
    fontSize: 15,
    color: ThemeColors.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  errorCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  errorCodeLabel: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
  },
  errorCode: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: ThemeColors.error,
  },

  // Explorer Card
  explorerCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    marginBottom: 8,
    elevation: 0.2,
  },
  explorerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  explorerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${ThemeColors.primaryDark}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  explorerTextContainer: {
    flex: 1,
  },
  explorerText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 16,
    color: ThemeColors.text,
    marginBottom: 2,
  },
  explorerSubtext: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
  },

  // Error Container
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    marginTop: 16,
    textAlign: "center",
  },
});
