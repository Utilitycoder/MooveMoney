import IconButton from "@/components/atoms/IconButton";
import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLoginWithOAuth } from "@privy-io/expo";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [authError, setAuthError] = useState("");

  const googleAuth = useLoginWithOAuth({
    onSuccess: () => {
      router.replace("/(app)/(auth)" as Href);
    },
    onError: (err) => {
      console.log("Google auth error:", err);
      setAuthError(err.message || "Authentication failed. Please try again.");
    },
  });

  const handleGoogleLogin = () => {
    setAuthError("");
    googleAuth.login({ provider: "google" });
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/(public)/onboarding" as Href);
    }
  };

  const isLoading = googleAuth.state.status === "loading";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
        <IconButton
          icon="arrow-back"
          onPress={handleBack}
          color={ThemeColors.text}
          backgroundColor={ThemeColors.surface}
        />
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Mark */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.logoSection}
        >
          <View style={styles.logoMark}>
            <Ionicons name="wallet" size={28} color={ThemeColors.text} />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={styles.titleSection}
        >
          <Text style={styles.title}>Sign in to</Text>
          <Text style={styles.titleBrand}>MooveMoney</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInUp.delay(400).springify()}
          style={styles.subtitle}
        >
          Your AI-powered crypto wallet.{"\n"}Smart, secure, effortless.
        </Animated.Text>

        {/* Features Pills */}
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
          style={styles.featurePills}
        >
          <View style={styles.pill}>
            <Ionicons
              name="sparkles"
              size={12}
              color={ThemeColors.primaryDark}
            />
            <Text style={styles.pillText}>AI Assistant</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="mic" size={12} color={ThemeColors.primaryDark} />
            <Text style={styles.pillText}>Voice Commands</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="flash" size={12} color={ThemeColors.primaryDark} />
            <Text style={styles.pillText}>Instant Transfers</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <Animated.View
        entering={FadeInDown.delay(600)}
        style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}
      >
        {/* Google Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={ThemeColors.surface} />
          ) : (
            <>
              <Ionicons
                name="logo-google"
                size={18}
                color={ThemeColors.surface}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Error */}
        {authError ? (
          <Animated.View
            entering={FadeIn.duration(200)}
            style={styles.errorContainer}
          >
            <Ionicons name="alert-circle" size={16} color={ThemeColors.error} />
            <Text style={styles.errorText}>{authError}</Text>
          </Animated.View>
        ) : null}

        {/* Security Badge */}
        <View style={styles.securityRow}>
          <View style={styles.securityDot} />
          <Text style={styles.securityText}>
            Secured by Privy • Enterprise-grade encryption
          </Text>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoSection: {
    marginBottom: 28,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontFamily: Fonts.brand,
    fontSize: 24,
    color: ThemeColors.textSecondary,
    letterSpacing: -0.3,
  },
  titleBrand: {
    fontFamily: Fonts.brandBlack,
    fontSize: 32,
    color: ThemeColors.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    color: ThemeColors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  featurePills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  pillText: {
    fontFamily: Fonts.brandMedium,
    fontSize: 12,
    color: ThemeColors.textSecondary,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ThemeColors.text,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  googleButtonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.surface,
    letterSpacing: -0.2,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
  },
  errorText: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.error,
    flex: 1,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  securityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.success,
  },
  securityText: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
  },
  terms: {
    fontFamily: Fonts.brand,
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: ThemeColors.primaryDark,
  },
});
