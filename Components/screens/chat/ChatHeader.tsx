import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChatHeaderProps {
  onBack: () => void;
  onClear?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, onClear }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={ThemeColors.text} />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={styles.aiIcon}>
          <Ionicons name="sparkles" size={16} color={ThemeColors.text} />
        </View>
        <Text style={styles.title}>AI Assistant</Text>
      </View>

      {/* Clear Button */}
      <TouchableOpacity
        style={styles.iconButton}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.background,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borderLight,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 17,
    color: ThemeColors.text,
  },
});

export default ChatHeader;
