import { Fonts, ThemeColors } from "@/constants/theme";
import { Platform, StatusBar, StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 16,
  },
});

export const chatHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    backgroundColor: ThemeColors.background,
    borderBottomColor: ThemeColors.borderLight,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 17,
    color: ThemeColors.text,
  },
});

export const emptyChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 26,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  suggestions: {
    width: "100%",
    gap: 10,
  },
  suggestionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  suggestionText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.text,
    flex: 1,
  },
});

export const chatBubbleStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  containerUser: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ThemeColors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  bubbleAI: {
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: ThemeColors.text,
    borderBottomRightRadius: 4,
  },
  text: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.text,
    lineHeight: 22,
  },
  textUser: {
    color: ThemeColors.surface,
  },
});

export const chatInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: ThemeColors.background,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: ThemeColors.surface,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: ThemeColors.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  inputWrapperFocused: {
    borderColor: ThemeColors.primary,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(245, 200, 66, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.text,
    paddingHorizontal: 4,
    paddingVertical: 10,
    maxHeight: 120,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ThemeColors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: ThemeColors.text,
  },
});

export const transactionApprovalModalStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: ThemeColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
    maxHeight: "90%",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: ThemeColors.border,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 22,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: ThemeColors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  detailLabel: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textMuted,
    flex: 1,
  },
  detailValue: {
    fontFamily: Fonts.brandMedium,
    fontSize: 15,
    color: ThemeColors.text,
    flex: 1,
    textAlign: "right",
  },
  addressValue: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: ThemeColors.text,
    textAlign: "right",
    flex: 1,
    letterSpacing: 0.3,
    maxWidth: "60%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
  },
  totalLabel: {
    fontSize: 17,
    color: ThemeColors.text,
    fontFamily: Fonts.brandBold,
  },
  totalValue: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    color: ThemeColors.text,
  },
  actionsContainer: {
    gap: 12,
  },
  rejectButton: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: ThemeColors.background,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  rejectText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },
});
