import { ThemeColors } from "@/constants/theme";
import { chatHeaderStyles } from "@/styles/chat";
import { ChatHeaderProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, onClear }) => {
  return (
    <View style={chatHeaderStyles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={chatHeaderStyles.iconButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={ThemeColors.text} />
      </TouchableOpacity>

      {/* Title */}
      <View style={chatHeaderStyles.titleContainer}>
        <View style={chatHeaderStyles.aiIcon}>
          <Ionicons name="sparkles" size={16} color={ThemeColors.text} />
        </View>
        <Text style={chatHeaderStyles.title}>Moovemoney AI Assistant</Text>
      </View>

      {/* Clear Button */}
      <TouchableOpacity
        style={chatHeaderStyles.iconButton}
        onPress={onClear}
        activeOpacity={0.7}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={ThemeColors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
