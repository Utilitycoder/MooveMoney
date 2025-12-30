import * as Haptics from "expo-haptics";

/**
 * Haptic feedback utilities for the app
 */

// Light tap feedback - for button presses
export const lightTap = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

// Medium tap feedback - for confirmations
export const mediumTap = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

// Heavy tap feedback - for important actions
export const heavyTap = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

// Success feedback - for completed transactions
export const successHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

// Error feedback - for failed transactions
export const errorHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

// Warning feedback - for warnings
export const warningHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

// Selection feedback - for UI selections
export const selectionTap = () => {
  Haptics.selectionAsync();
};
