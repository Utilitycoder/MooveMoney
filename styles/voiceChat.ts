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
    paddingBottom: 10,
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
    paddingVertical: 14,
    backgroundColor: ThemeColors.surface,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.borderLight,
  },
  recordingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  waveSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  waveContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    gap: 3,
  },
  waveBar: {
    width: 2,
    borderRadius: 1,
    backgroundColor: ThemeColors.primary,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 42,
  },
  recordingDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ThemeColors.error,
  },
  timerText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textSecondary,
    letterSpacing: 0.5,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.textMuted,
  },
  sendButtonWrapper: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ThemeColors.primary + "40",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
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

export const voiceChatBubbleStyles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  assistantContainer: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginRight: 8,
    marginBottom: 2,
    alignSelf: "flex-end",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarUser: {
    width: 28,
    height: 28,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    backgroundColor: ThemeColors.text,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  userBubble: {
    backgroundColor: ThemeColors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: ThemeColors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  text: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    lineHeight: 21,
  },
  userText: {
    color: ThemeColors.text,
  },
  aiText: {
    color: ThemeColors.text,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
    gap: 4,
  },
  time: {
    fontFamily: Fonts.brand,
    fontSize: 10,
  },
  userTime: {
    color: "rgba(26,26,26,0.5)",
  },
  aiTime: {
    color: ThemeColors.textMuted,
  },
});

export const voiceChatHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderLight,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  headerButtonPlaceholder: {
    width: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
  },
  titleRow: {
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  statusDot: {
    marginTop: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
});
