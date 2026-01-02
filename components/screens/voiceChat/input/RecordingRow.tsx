import { voiceChatInputStyles } from "@/styles/voiceChat";
import { RecordingRowProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { WaveBar } from "./WaveBar";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const RecordingRow: React.FC<RecordingRowProps> = ({
  recordingDuration,
  onStopRecording,
  onEndConversation,
  audioLevel,
  ring1Style,
  ring2Style,
  buttonAnimatedStyle,
  handlePressIn,
  handlePressOut,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      style={voiceChatInputStyles.recordingContainer}
    >
      <View style={voiceChatInputStyles.recordingRow}>
        <Pressable
          style={voiceChatInputStyles.cancelButton}
          onPress={onEndConversation}
        >
          <Text style={voiceChatInputStyles.cancelText}>Cancel</Text>
        </Pressable>

        <View style={voiceChatInputStyles.waveSection}>
          <View style={voiceChatInputStyles.timerRow}>
            <View style={voiceChatInputStyles.recordingDot} />
            <Text style={voiceChatInputStyles.timerText}>
              {formatDuration(recordingDuration)}
            </Text>
          </View>

          <View style={voiceChatInputStyles.waveContainer}>
            {Array.from({ length: 22 }).map((_, index) => (
              <WaveBar
                key={index}
                index={index}
                audioLevel={audioLevel}
                totalBars={22}
              />
            ))}
          </View>
        </View>

        <View style={voiceChatInputStyles.sendButtonWrapper}>
          <Animated.View style={[voiceChatInputStyles.pulseRing, ring1Style]} />
          <Animated.View style={[voiceChatInputStyles.pulseRing, ring2Style]} />
          <AnimatedPressable
            style={[voiceChatInputStyles.sendButton, buttonAnimatedStyle]}
            onPress={onStopRecording}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" />
          </AnimatedPressable>
        </View>
      </View>
    </Animated.View>
  );
};
