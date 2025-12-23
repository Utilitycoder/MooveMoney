import { Fonts, ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const voiceChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderLight,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
  headerSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textSecondary,
    marginTop: 2,
  },

  // Messages list
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  // Message bubble
  messageBubbleContainer: {
    marginBottom: 16,
  },
  userBubbleContainer: {
    alignItems: "flex-end",
  },
  assistantBubbleContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: ThemeColors.primary,
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    backgroundColor: ThemeColors.surface,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  messageText: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: ThemeColors.text,
  },
  assistantMessageText: {
    color: ThemeColors.text,
  },
  voiceIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  voiceIndicatorText: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  messageTime: {
    fontFamily: Fonts.brand,
    fontSize: 11,
    color: ThemeColors.textMuted,
    marginTop: 6,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: ThemeColors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 24,
    color: ThemeColors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  emptySubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },

  // Voice input area
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
    backgroundColor: ThemeColors.surface,
  },

  // Recording indicator
  recordingContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  recordingWaveContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginBottom: 16,
  },
  recordingTime: {
    fontFamily: Fonts.brandMedium,
    fontSize: 18,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  recordingLabel: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },

  // Voice button
  voiceButtonContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  voiceButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: ThemeColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  voiceButtonRecording: {
    backgroundColor: ThemeColors.error,
  },
  voiceButtonHint: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textSecondary,
    marginTop: 12,
  },

  // Processing state
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },
  processingText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },

  // Error state
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 10,
  },
  errorText: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.error,
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: ThemeColors.error,
  },
  retryButtonText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: "#FFFFFF",
  },

  // Action buttons row
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  cancelButtonText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 15,
    color: ThemeColors.textSecondary,
  },
});

export const emptyVoiceChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  glow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: ThemeColors.primary,
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 16,
  },
  iconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  ring1: {
    width: 160,
    height: 160,
    opacity: 0.5,
  },
  ring2: {
    width: 200,
    height: 200,
    opacity: 0.25,
  },
  title: {
    fontFamily: Fonts.brandBlack,
    fontSize: 28,
    color: ThemeColors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  features: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ThemeColors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  featureText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
});

export const voiceChatInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.surface,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
  },

  // Idle state
  idleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  micButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  micButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },

  // Recording state
  recordingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: ThemeColors.surface,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
  },
  waveSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  waveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    gap: 6,
    marginBottom: 12,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: ThemeColors.primary,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ThemeColors.error,
  },
  timerText: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    color: ThemeColors.text,
    letterSpacing: 0.5,
  },
  recordingControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: ThemeColors.background,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  cancelText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 15,
    color: ThemeColors.textSecondary,
  },
  sendButtonWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: ThemeColors.primary,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ThemeColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  endConvoButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: ThemeColors.background,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  endConvoText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },

  // Listening state
  listeningRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listeningIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  listeningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ThemeColors.success,
  },
  listeningText: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  endButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: ThemeColors.background,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  endButtonText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },

  // Processing state
  processingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 8,
  },
  processingDots: {
    flexDirection: "row",
    gap: 5,
  },
  processingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ThemeColors.primary,
  },
  processingText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
});
