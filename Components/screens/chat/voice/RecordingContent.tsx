import { Fonts, ThemeColors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import PulsingAICircle from "./PulsingAICircle";
import WaveBar, { NUM_BARS } from "./WaveBar";

interface RecordingContentProps {
  isRecording: boolean;
  recordingDuration: number;
  pulseAnim: SharedValue<number>;
  glowAnim: SharedValue<number>;
  micScale: SharedValue<number>;
  audioLevel: SharedValue<number>;
}

const RecordingContent: React.FC<RecordingContentProps> = ({
  isRecording,
  recordingDuration,
  pulseAnim,
  glowAnim,
  micScale,
  audioLevel,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* AI with Glow Effects */}
      <PulsingAICircle
        pulseAnim={pulseAnim}
        glowAnim={glowAnim}
        micScale={micScale}
        audioLevel={audioLevel}
      />

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {isRecording ? "Listening..." : "Starting..."}
        </Text>
        <Text style={styles.hintText}>
          Speak naturally, I&apos;ll understand
        </Text>
      </View>

      {/* Waveform - responds to actual audio */}
      <View style={styles.waveformContainer}>
        {[...Array(NUM_BARS)].map((_, index) => (
          <WaveBar key={index} index={index} audioLevel={audioLevel} />
        ))}
      </View>

      {/* Duration */}
      <View style={styles.durationContainer}>
        <View style={styles.durationBadge}>
          <View style={styles.recordingDot} />
          <Text style={styles.durationText}>
            {formatDuration(recordingDuration)}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    gap: 6,
    marginBottom: 32,
    paddingHorizontal: 20,
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
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },
  durationText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 18,
    color: ThemeColors.text,
    letterSpacing: 1,
  },
});

export default RecordingContent;
