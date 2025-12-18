import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PreviewContentProps {
  isPlaying: boolean;
  recordingDuration: number;
  onPlayPause: () => void;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  isPlaying,
  recordingDuration,
  onPlayPause,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Preview Mode UI */}
      <View style={styles.previewContainer}>
        {/* Play/Pause Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlayPause}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={52}
            color={ThemeColors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Recording Ready</Text>
        <Text style={styles.hintText}>Tap play to preview, or send to AI</Text>
      </View>

      {/* Duration Badge */}
      <View style={styles.durationContainer}>
        <View style={styles.durationBadge}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={ThemeColors.success}
          />
          <Text style={styles.durationText}>
            {formatDuration(recordingDuration)}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  playButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: ThemeColors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  statusText: {
    fontFamily: Fonts.brandBold,
    fontSize: 28,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  hintText: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textMuted,
  },
  durationContainer: {
    alignItems: "center",
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: ThemeColors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  durationText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 18,
    color: ThemeColors.text,
    letterSpacing: 1,
  },
});

export default PreviewContent;
