import { Fonts, ThemeColors } from "@/constants/theme";
import { VoiceModalMode } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VoiceRecordingHeaderProps {
  mode: VoiceModalMode;
  onClose: () => void;
}

const VoiceRecordingHeader: React.FC<VoiceRecordingHeaderProps> = ({
  mode,
  onClose,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={24} color={ThemeColors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <View style={styles.aiIndicator}>
          <Ionicons
            name={mode === "recording" ? "sparkles" : "play-circle"}
            size={16}
            color={ThemeColors.primary}
          />
          <Text style={styles.aiText}>
            {mode === "recording" ? "AI Listening" : "Preview"}
          </Text>
        </View>
      </View>

      <View style={styles.headerRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
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
  aiIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: ThemeColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  aiText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 14,
    color: ThemeColors.text,
  },
  headerRight: {
    width: 44,
  },
});

export default VoiceRecordingHeader;
