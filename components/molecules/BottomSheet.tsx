import { Fonts, ThemeColors } from "@/constants/theme";
import { BottomSheetOption, BottomSheetProps } from "@/types/bottomSheet";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ANIMATION_CONFIG = {
  duration: 350,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  options,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const [isRendered, setIsRendered] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      progress.value = withTiming(1, ANIMATION_CONFIG);
    } else if (isRendered) {
      progress.value = withTiming(0, ANIMATION_CONFIG, (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
        }
      });
    }
  }, [visible, isRendered, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    pointerEvents: progress.value > 0 ? "auto" : "none",
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [400, 0]),
      },
    ],
  }));

  const handleClose = () => {
    onClose();
  };

  const handleOptionPress = (option: BottomSheetOption) => {
    onClose();
    setTimeout(option.onPress, 350);
  };

  if (!isRendered) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + 16 },
          sheetStyle,
        ]}
      >
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        {title && <Text style={styles.title}>{title}</Text>}

        <View style={styles.options}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.optionIcon,
                  option.destructive && styles.optionIconDestructive,
                ]}
              >
                <Ionicons
                  name={option.icon}
                  size={22}
                  color={
                    option.destructive ? ThemeColors.error : ThemeColors.text
                  }
                />
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  option.destructive && styles.optionLabelDestructive,
                ]}
              >
                {option.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={ThemeColors.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleClose}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: ThemeColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: ThemeColors.border,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    color: ThemeColors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  options: {
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.background,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 14,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
  },
  optionIconDestructive: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  optionLabel: {
    flex: 1,
    fontFamily: Fonts.brandMedium,
    fontSize: 16,
    color: ThemeColors.text,
  },
  optionLabelDestructive: {
    color: ThemeColors.error,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: ThemeColors.background,
    alignItems: "center",
  },
  cancelText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.textSecondary,
  },
});

export default BottomSheet;
