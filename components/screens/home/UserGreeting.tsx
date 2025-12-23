import { Fonts, ThemeColors } from "@/constants/theme";
import { UserGreetingProps } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const UserGreeting: React.FC<UserGreetingProps> = ({
  username = "User",
  onMenuPress,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.leftSection}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(username)}</Text>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color={ThemeColors.text}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
  greetingSection: {
    gap: 2,
  },
  greeting: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textSecondary,
  },
  username: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
});

export default UserGreeting;
