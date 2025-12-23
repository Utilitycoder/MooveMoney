import { Fonts, ThemeColors } from "@/constants/theme";
import { CommandCardProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const CommandCard: React.FC<CommandCardProps> = ({
  placeholder = "Type or speak your command...",
  example = '"Send 50 USDC to alice.move"',
  delay = 200,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={ThemeColors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.micButton]}>
            <Ionicons name="mic" size={20} color={ThemeColors.primaryDark} />
          </TouchableOpacity>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Ready</Text>
        </View>
      </View>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <Text style={styles.example}>{example}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#FEF3C7",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ThemeColors.success,
  },
  statusText: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textSecondary,
  },
  placeholder: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
    marginBottom: 4,
  },
  example: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },
});

export default CommandCard;
