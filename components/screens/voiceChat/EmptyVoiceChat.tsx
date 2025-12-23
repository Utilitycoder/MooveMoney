import { ThemeColors } from "@/constants/theme";
import { emptyVoiceChatStyles } from "@/styles/voiceChat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const EmptyVoiceChat: React.FC = () => {
  const pulseAnim = useSharedValue(0);

  useEffect(() => {
    // Subtle pulse for the glow
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [pulseAnim]);

  const glowStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [0.9, 1.1]);
    const opacity = interpolate(pulseAnim.value, [0, 1], [0.2, 0.4]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={emptyVoiceChatStyles.container}>
      <Animated.View
        entering={FadeIn.duration(600)}
        style={emptyVoiceChatStyles.iconWrapper}
      >
        {/* Background glow */}
        <Animated.View style={[emptyVoiceChatStyles.glow, glowStyle]} />

        {/* Static icon container */}
        <View style={emptyVoiceChatStyles.iconContainer}>
          <LinearGradient
            colors={["#FFD93D", "#F5C842", "#E5A84B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={emptyVoiceChatStyles.iconGradient}
          >
            <Ionicons name="mic" size={52} color={ThemeColors.text} />
          </LinearGradient>
        </View>

        {/* Decorative rings */}
        <View style={[emptyVoiceChatStyles.ring, emptyVoiceChatStyles.ring1]} />
        <View style={[emptyVoiceChatStyles.ring, emptyVoiceChatStyles.ring2]} />
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(200).duration(500)}
        style={emptyVoiceChatStyles.title}
      >
        Voice Chat
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(400).duration(500)}
        style={emptyVoiceChatStyles.subtitle}
      >
        Tap the microphone to start speaking.{"\n"}I will transcribe your voice
        and respond.
      </Animated.Text>

      {/* Feature hints */}
      <Animated.View
        entering={FadeInDown.delay(600).duration(500)}
        style={emptyVoiceChatStyles.features}
      >
        <FeatureItem icon="flash" text="Instant transcription" />
        <FeatureItem icon="chatbubbles" text="AI-powered responses" />
        <FeatureItem icon="wallet" text="Voice commands for wallet" />
      </Animated.View>
    </View>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <View style={emptyVoiceChatStyles.featureItem}>
    <View style={emptyVoiceChatStyles.featureIcon}>
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={16}
        color={ThemeColors.primary}
      />
    </View>
    <Text style={emptyVoiceChatStyles.featureText}>{text}</Text>
  </View>
);

export default EmptyVoiceChat;
