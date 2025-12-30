import { ThemeColors } from "@/constants/theme";
import { userGreetingStyles } from "@/styles/home";
import { UserGreetingProps } from "@/types/home";
import { getGreeting, getInitials } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const UserGreeting: React.FC<UserGreetingProps> = ({
  username = "Welcome",
  onMenuPress,
}) => {
  return (
    <Animated.View entering={FadeIn} style={userGreetingStyles.container}>
      <View style={userGreetingStyles.leftSection}>
        {/* Avatar */}
        <View style={userGreetingStyles.avatar}>
          {username ? (
            <Text style={userGreetingStyles.avatarText}>
              {getInitials(username)}
            </Text>
          ) : (
            <Ionicons name="person" size={24} color={ThemeColors.text} />
          )}
        </View>

        {/* Greeting */}
        <View style={userGreetingStyles.greetingSection}>
          <Text style={userGreetingStyles.greeting}>{getGreeting()},</Text>
          <Text style={userGreetingStyles.username}>
            {username || "Welcome"}
          </Text>
        </View>
      </View>

      {/* Menu Button */}
      <TouchableOpacity
        style={userGreetingStyles.iconButton}
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

export default UserGreeting;
