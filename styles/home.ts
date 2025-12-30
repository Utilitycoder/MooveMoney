import { Fonts, ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  stickyHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ThemeColors.background,
    zIndex: -1,
  },
  fixedTopContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  floatingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export const balanceCardStyles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    gap: 12,
    borderColor: ThemeColors.border,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: Fonts.brandMedium,
    color: ThemeColors.textSecondary,
  },
  balanceLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  loadingIndicator: {
    width: 16,
    height: 16,
    transform: [{ scale: 0.8 }],
  },
  copyButton: {
    padding: 4,
    borderRadius: 6,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  balanceAmount: {
    fontFamily: Fonts.brandBlack,
    fontSize: 40,
    color: ThemeColors.text,
    letterSpacing: -0.5,
    lineHeight: 42,
  },
  currencyCode: {
    fontFamily: Fonts.brandBold,
    fontSize: 14,
    color: ThemeColors.primaryDark,
  },
});

export const userGreetingStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
  greetingSection: {
    gap: 2,
  },
  greeting: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  username: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
});

export const transactionsListStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
  seeAllText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.primaryDark,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 15,
    color: ThemeColors.text,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontFamily: Fonts.brandBold,
    fontSize: 15,
    marginBottom: 2,
  },
  amountPositive: {
    color: ThemeColors.success,
  },
  amountNegative: {
    color: ThemeColors.text,
  },
  dateText: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
  },
  emptyContainer: {
    flex: 1,
  },
});
