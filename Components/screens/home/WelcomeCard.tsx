import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface WelcomeCardProps {
  title?: string;
  subtitle?: string;
  delay?: number;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title = "Welcome!",
  subtitle = "You're signed in. Start managing your crypto with simple commands.",
  delay = 100,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="sparkles" size={32} color={ThemeColors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 24,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default WelcomeCard;
