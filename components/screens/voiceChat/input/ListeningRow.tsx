import { voiceChatInputStyles } from "@/styles/voiceChat";
import { ListeningRowProps } from "@/types/voiceChat";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export const ListeningRow: React.FC<ListeningRowProps> = ({
  onEndConversation,
  listeningStyle,
}) => {
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
};
