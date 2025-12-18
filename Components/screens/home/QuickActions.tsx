import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ActionItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  bgColor: string;
  onPress?: () => void;
}

const DEFAULT_ACTIONS: ActionItem[] = [
  {
    id: "send",
    icon: "send",
    title: "Send",
    color: "#0284C7",
    bgColor: "#E0F2FE",
  },
  {
    id: "receive",
    icon: "download",
    title: "Receive",
    color: "#059669",
    bgColor: "#D1FAE5",
  },
  {
    id: "swap",
    icon: "swap-horizontal",
    title: "Swap",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    id: "history",
    icon: "time",
    title: "History",
    color: "#7C3AED",
    bgColor: "#F3E8FF",
  },
];

interface QuickActionsProps {
  actions?: ActionItem[];
  delay?: number;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions = DEFAULT_ACTIONS,
  delay = 300,
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay)} style={styles.grid}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.card}
          onPress={action.onPress}
          activeOpacity={0.8}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: action.bgColor }]}
          >
            <Ionicons name={action.icon} size={20} color={action.color} />
          </View>
          <Text style={styles.title}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 14,
    color: ThemeColors.text,
  },
});

export default QuickActions;
