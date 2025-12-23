import { ThemeColors } from "@/constants/theme";
import { voiceChatInputStyles } from "@/styles/voiceChat";
import { VoiceChatInputProps } from "@/types/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VoiceChatInput: React.FC<VoiceChatInputProps> = ({
  state,
  isRecording,
  isInConversation,
  recordingDuration,
  onStartConversation,
  onStopRecording,
  onEndConversation,
  animations,
}) => {
  // Local animations
  const pulseRing1 = useSharedValue(0);
  const pulseRing2 = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const listeningPulse = useSharedValue(0);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Pulse animations for recording
  useEffect(() => {
    if (isRecording) {
      pulseRing1.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      setTimeout(() => {
        pulseRing2.value = withRepeat(
          withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }),
          -1,
          false
        );
      }, 300);
    } else {
      pulseRing1.value = withTiming(0, { duration: 200 });
      pulseRing2.value = withTiming(0, { duration: 200 });
    }
  }, [isRecording, pulseRing1, pulseRing2]);

  // Listening state pulse
  useEffect(() => {
    if (state === "listening") {
      listeningPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      listeningPulse.value = withTiming(0, { duration: 200 });
    }
  }, [state, listeningPulse]);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.94, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  // Animated voiceChatInputStyles
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const audioScale = interpolate(
      animations.micScale.value,
      [1, 1.25],
      [1, 1.06]
    );
    return {
      transform: [{ scale: buttonScale.value * audioScale }],
    };
  });

  const ring1Style = useAnimatedStyle(() => {
    const scale = interpolate(pulseRing1.value, [0, 1], [1, 1.8]);
    const opacity = interpolate(pulseRing1.value, [0, 0.3, 1], [0.5, 0.25, 0]);
    return { transform: [{ scale }], opacity };
  });

  const ring2Style = useAnimatedStyle(() => {
    const scale = interpolate(pulseRing2.value, [0, 1], [1, 1.6]);
    const opacity = interpolate(pulseRing2.value, [0, 0.3, 1], [0.3, 0.15, 0]);
    return { transform: [{ scale }], opacity };
  });

  const listeningStyle = useAnimatedStyle(() => ({
    opacity: listeningPulse.value,
    transform: [
      { scale: interpolate(listeningPulse.value, [0.6, 1], [0.95, 1.05]) },
    ],
  }));

  // Processing state
  if (state === "processing") {
    return (
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={voiceChatInputStyles.container}
      >
        <View style={voiceChatInputStyles.processingRow}>
          <View style={voiceChatInputStyles.processingDots}>
            <ProcessingDot delay={0} />
            <ProcessingDot delay={100} />
            <ProcessingDot delay={200} />
          </View>
          <Text style={voiceChatInputStyles.processingText}>Processing...</Text>
        </View>
      </Animated.View>
    );
  }

  // Listening state (waiting for next input in conversation)
  if (state === "listening" && isInConversation && !isRecording) {
    return (
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={voiceChatInputStyles.container}
      >
        <View style={voiceChatInputStyles.listeningRow}>
          <View style={voiceChatInputStyles.listeningIndicator}>
            <Animated.View
              style={[voiceChatInputStyles.listeningDot, listeningStyle]}
            />
            <Text style={voiceChatInputStyles.listeningText}>
              Ready for next message...
            </Text>
          </View>
          <Pressable
            style={voiceChatInputStyles.endButton}
            onPress={onEndConversation}
          >
            <Text style={voiceChatInputStyles.endButtonText}>End</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  }

  // Recording state (in conversation) - wave centered with controls below
  if (isRecording && isInConversation) {
    return (
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={voiceChatInputStyles.recordingContainer}
      >
        {/* Centered wave visualization */}
        <View style={voiceChatInputStyles.waveSection}>
          <View style={voiceChatInputStyles.waveContainer}>
            {Array.from({ length: 7 }).map((_, index) => (
              <WaveBar
                key={index}
                index={index}
                audioLevel={animations.audioLevel}
              />
            ))}
          </View>

          {/* Timer */}
          <View style={voiceChatInputStyles.timerRow}>
            <View style={voiceChatInputStyles.recordingDot} />
            <Text style={voiceChatInputStyles.timerText}>
              {formatDuration(recordingDuration)}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={voiceChatInputStyles.recordingControlsRow}>
          <Pressable
            style={voiceChatInputStyles.cancelButton}
            onPress={onEndConversation}
          >
            <Text style={voiceChatInputStyles.cancelText}>Cancel</Text>
          </Pressable>

          <View style={voiceChatInputStyles.sendButtonWrapper}>
            <Animated.View
              style={[voiceChatInputStyles.pulseRing, ring1Style]}
            />
            <Animated.View
              style={[voiceChatInputStyles.pulseRing, ring2Style]}
            />
            <AnimatedPressable
              style={[voiceChatInputStyles.sendButton, buttonAnimatedStyle]}
              onPress={onStopRecording}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </AnimatedPressable>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Idle state - start conversation
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      style={voiceChatInputStyles.container}
    >
      <View style={voiceChatInputStyles.idleRow}>
        <AnimatedPressable
          style={[voiceChatInputStyles.micButton, buttonAnimatedStyle]}
          onPress={onStartConversation}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#FFD93D", "#F5C842", "#E5A84B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={voiceChatInputStyles.micButtonGradient}
          >
            <Ionicons name="mic" size={24} color={ThemeColors.text} />
          </LinearGradient>
        </AnimatedPressable>
        <Text style={voiceChatInputStyles.hintText}>
          Tap to start conversation
        </Text>
      </View>
    </Animated.View>
  );
};

// Wave bar component
const WaveBar: React.FC<{ index: number; audioLevel: { value: number } }> = ({
  index,
  audioLevel,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const baseHeight = 6;
    const maxAddition = 40;
    const centerIndex = 3;
    const distanceFromCenter = Math.abs(index - centerIndex);
    const heightMultiplier = 1 - distanceFromCenter * 0.1;
    const phase = (index * Math.PI) / 3;
    const wave =
      (Math.sin(phase) * 0.2 + 0.8) * audioLevel.value * heightMultiplier;
    return { height: baseHeight + wave * maxAddition };
  });

  return (
    <Animated.View style={[voiceChatInputStyles.waveBar, animatedStyle]} />
  );
};

// Processing dot component
const ProcessingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const scale = useSharedValue(0.5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 350, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.5, { duration: 350, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(scale.value, [0.5, 1], [0.4, 1]),
  }));

  return (
    <Animated.View
      style={[voiceChatInputStyles.processingDot, animatedStyle]}
    />
  );
};

export default VoiceChatInput;
