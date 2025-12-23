import { Fonts, ThemeColors } from "@/constants/theme";
import { VoiceRecordingFooterProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const VoiceRecordingFooter: React.FC<VoiceRecordingFooterProps> = ({
  mode,
  paddingBottom,
  onCancel,
  onStopRecording,
  onReRecord,
  onSend,
}) => {
  return (
    <View style={[styles.footer, { paddingBottom }]}>
      {mode === "recording" ? (
        <>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={onStopRecording}
            activeOpacity={0.8}
          >
            <Ionicons name="stop" size={20} color={ThemeColors.text} />
            <Text style={styles.sendText}>Done</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.reRecordButton}
            onPress={onReRecord}
            activeOpacity={0.7}
          >
            <Ionicons
              name="refresh"
              size={20}
              color={ThemeColors.textSecondary}
            />
            <Text style={styles.reRecordText}>Re-record</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={onSend}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={20} color={ThemeColors.text} />
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  cancelText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 17,
    color: ThemeColors.textSecondary,
  },
  sendButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: ThemeColors.primary,
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendText: {
    fontFamily: Fonts.brandBold,
    fontSize: 17,
    color: ThemeColors.text,
  },
  reRecordButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  reRecordText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 17,
    color: ThemeColors.textSecondary,
  },
});

export default VoiceRecordingFooter;
