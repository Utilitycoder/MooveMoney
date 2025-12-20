import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemeColors } from "@/constants/theme";
import { emptyChatStyles } from "@/styles/chat";
import { EmptyChatProps } from "@/types/chat";

const SUGGESTIONS = [
  "Send 10 MOVE to alice.move",
  "What's my balance?",
  "Show recent transactions",
  "Swap 50 USDC to ETH",
];

const EmptyChat: React.FC<EmptyChatProps> = ({ onSuggestionPress }) => {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={emptyChatStyles.container}
    >
      {/* Title */}
      <Text style={emptyChatStyles.title}>How can I help?</Text>
      <Text style={emptyChatStyles.subtitle}>
        Ask me to send crypto, check balances, or manage your wallet using
        natural language.
      </Text>

      {/* Suggestions */}
      <View style={emptyChatStyles.suggestions}>
        {SUGGESTIONS.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={emptyChatStyles.suggestionButton}
            onPress={() => onSuggestionPress(suggestion)}
            activeOpacity={0.7}
          >
            <Text style={emptyChatStyles.suggestionText}>{suggestion}</Text>
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

export default EmptyChat;
