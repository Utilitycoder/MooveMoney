import { Typography } from "@/components/atoms/Typography";
import { ThemeColors } from "@/constants/theme";
import { useSecurityStore } from "@/stores/securityStore";
import { lockScreenStyles } from "@/styles/lockScreen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface LockScreenProps {
  showLock: boolean;
}

export default function LockScreen({ showLock }: LockScreenProps) {
  if (!showLock) return null;

  const setLocked = useSecurityStore((state) => state.setLocked);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const iconScale = useSharedValue(1);
  const iconRotation = useSharedValue(0);
  const pulseOpacity = useSharedValue(0.3);

  // Subtle pulse animation for the icon container
  useEffect(() => {
    pulseOpacity.value = withRepeat(
      withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setErrorDetails(null);
      setAuthStatus("idle");

      // Animate icon during authentication
      iconScale.value = withRepeat(
        withSequence(withSpring(1.05), withSpring(0.95)),
        3,
        true
      );

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        unlockApp();
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock MooveMoney",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      iconScale.value = withSpring(1);

      if (result.success) {
        handleSuccess();
      } else {
        setAuthStatus("error");
        setErrorDetails(
          result.error === "user_cancel"
            ? "Tap below to try again"
            : "Authentication failed. Try again."
        );
        shakeIcon();
      }
    } catch (err) {
      setAuthStatus("error");
      setErrorDetails("Something went wrong. Tap to retry.");
      iconScale.value = withSpring(1);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSuccess = () => {
    setAuthStatus("success");
    iconScale.value = withSpring(1.2);
    iconRotation.value = withTiming(360, { duration: 400 });
    setTimeout(() => {
      unlockApp();
    }, 600);
  };

  const unlockApp = () => {
    setLocked(false);
  };

  const shakeIcon = () => {
    iconRotation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 100 }),
      withTiming(0, { duration: 50 })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      authenticate();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotation.value}deg` },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const getIcon = () => {
    if (authStatus === "success") {
      return (
        <Ionicons name="checkmark" size={48} color={ThemeColors.success} />
      );
    }
    if (authStatus === "error") {
      return <Ionicons name="close" size={48} color={ThemeColors.error} />;
    }
    return (
      <Ionicons name="finger-print" size={48} color={ThemeColors.primary} />
    );
  };

  const getMessage = () => {
    if (authStatus === "success") return "Welcome back!";
    if (isAuthenticating) return "Verifying...";
    return "MooveMoney";
  };

  const getSubMessage = () => {
    if (authStatus === "success") return "Access granted";
    if (errorDetails) return errorDetails;
    return "Tap to unlock your wallet";
  };

  return (
    <Animated.View
      style={lockScreenStyles.container}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
    >
      {/* Background gradient */}
      <LinearGradient
        colors={["#0a0a0a", "#1a1a2e", "#0a0a0a"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative circles */}
      <View style={lockScreenStyles.decorativeCircle1} />
      <View style={lockScreenStyles.decorativeCircle2} />

      <View style={lockScreenStyles.content}>
        {/* Logo/Brand section */}
        <View style={lockScreenStyles.brandSection}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={lockScreenStyles.brandIcon}
            resizeMode="contain"
          />
        </View>

        {/* Main authentication area */}
        <TouchableOpacity
          style={lockScreenStyles.authArea}
          onPress={authenticate}
          activeOpacity={0.9}
          disabled={isAuthenticating || authStatus === "success"}
        >
          {/* Pulse ring */}
          <Animated.View style={[lockScreenStyles.pulseRing, pulseStyle]} />

          {/* Icon container */}
          <Animated.View
            style={[lockScreenStyles.iconContainer, animatedIconStyle]}
          >
            {getIcon()}
          </Animated.View>
        </TouchableOpacity>

        {/* Text section */}
        <View style={lockScreenStyles.textSection}>
          <Typography
            size="2xl"
            weight="bold"
            align="center"
            color="text"
            text={getMessage()}
          />
          <Typography
            size="sm"
            align="center"
            color="textMuted"
            style={{ marginTop: 8 }}
            text={getSubMessage()}
          />
        </View>

        {/* Bottom hint */}
        {authStatus !== "success" && (
          <View style={lockScreenStyles.bottomHint}>
            <Ionicons
              name="shield-checkmark"
              size={14}
              color={ThemeColors.textMuted}
            />
            <Typography
              size="xs"
              align="center"
              color="textMuted"
              text="Secured with Privy"
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
}
