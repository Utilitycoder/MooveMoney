import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface EmptyChatProps {
  onSuggestionPress: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "Send 10 MOVE to alice.move",
  "What's my balance?",
  "Show recent transactions",
  "Swap 50 USDC to ETH",
];

const EmptyChat: React.FC<EmptyChatProps> = ({ onSuggestionPress }) => {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconBg}>
          <Ionicons name="sparkles" size={40} color={ThemeColors.text} />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>How can I help?</Text>
      <Text style={styles.subtitle}>
        Ask me to send crypto, check balances, or manage your wallet using
        natural language.
      </Text>

      {/* Suggestions */}
      <View style={styles.suggestions}>
        {SUGGESTIONS.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionButton}
            onPress={() => onSuggestionPress(suggestion)}
            activeOpacity={0.7}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={ThemeColors.textMuted}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default EmptyChat;
