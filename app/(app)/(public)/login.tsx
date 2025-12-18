import { Fonts, ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLoginWithOAuth } from "@privy-io/expo";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
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

  const appleAuth = useLoginWithOAuth({
    onSuccess: () => {
      router.replace("/(app)/(auth)" as Href);
    },
    onError: (err) => {
      console.log("Apple auth error:", err);
      setAuthError(err.message || "Authentication failed. Please try again.");
    },
  });

  const handleGoogleLogin = () => {
    setAuthError("");
    googleAuth.login({ provider: "google" });
  };

  const handleAppleLogin = () => {
    setAuthError("");
    appleAuth.login({ provider: "apple" });
  };

  const handleEmailContinue = () => {
    if (!email.trim()) {
      setAuthError("Please enter your email address");
      return;
    }
    // Navigate to email verification or OTP screen
    // router.push({ pathname: "/(app)/(public)/verify-email", params: { email } });
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/(public)/onboarding" as Href);
    }
  };

  const isLoading =
    googleAuth.state.status === "loading" ||
    appleAuth.state.status === "loading";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.content, { paddingTop: insets.top + 10 }]}>
        {/* Back Button */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={ThemeColors.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Logo & Welcome */}
        <Animated.View
          entering={FadeInUp.delay(150).springify()}
          style={styles.logoSection}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="wallet" size={32} color={ThemeColors.text} />
            </View>
            <Text style={styles.logoText}>
              Moove<Text style={styles.logoTextAccent}>Money</Text>
            </Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign in to continue managing your crypto with ease
          </Text>
        </Animated.View>

        {/* Auth Options */}
        <View style={styles.authSection}>
          {/* Social Login Buttons */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.socialButtons}
          >
            {/* Google Button */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {googleAuth.state.status === "loading" ? (
                <ActivityIndicator size="small" color={ThemeColors.text} />
              ) : (
                <>
                  <View style={styles.socialIconContainer}>
                    <Ionicons name="logo-google" size={20} color="#DB4437" />
                  </View>
                  <Text style={styles.socialButtonText}>
                    Continue with Google
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity
              style={[styles.socialButton, styles.appleButton]}
              onPress={handleAppleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {appleAuth.state.status === "loading" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <View style={[styles.socialIconContainer, styles.appleIcon]}>
                    <Ionicons name="logo-apple" size={22} color="#FFFFFF" />
                  </View>
                  <Text
                    style={[styles.socialButtonText, styles.appleButtonText]}
                  >
                    Continue with Apple
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            style={styles.dividerContainer}
          >
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* Email Input */}
          <Animated.View
            entering={FadeInDown.delay(350).springify()}
            style={styles.emailSection}
          >
            <View
              style={[
                styles.emailInputContainer,
                isEmailFocused && styles.emailInputFocused,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={
                  isEmailFocused ? ThemeColors.primary : ThemeColors.textMuted
                }
              />
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email"
                placeholderTextColor={ThemeColors.textMuted}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.emailButton,
                (!email.trim() || isLoading) && styles.emailButtonDisabled,
              ]}
              onPress={handleEmailContinue}
              disabled={!email.trim() || isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.emailButtonText}>Continue with Email</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={ThemeColors.text}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Error Message */}
          {authError ? (
            <Animated.View
              entering={FadeInDown.duration(200)}
              style={styles.errorContainer}
            >
              <Ionicons
                name="alert-circle"
                size={18}
                color={ThemeColors.error}
              />
              <Text style={styles.errorText}>{authError}</Text>
            </Animated.View>
          ) : null}
        </View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}
        >
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 10,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: ThemeColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: Fonts.brandBlack,
    fontSize: 28,
    color: ThemeColors.text,
  },
  logoTextAccent: {
    color: ThemeColors.primaryDark,
  },
  welcomeTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 28,
    color: ThemeColors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  authSection: {
    flex: 1,
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ThemeColors.surface,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    gap: 12,
  },
  appleButton: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  socialIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: ThemeColors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  appleIcon: {
    backgroundColor: "transparent",
  },
  socialButtonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
  appleButtonText: {
    color: "#FFFFFF",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: ThemeColors.border,
  },
  dividerText: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.textMuted,
  },
  emailSection: {
    gap: 14,
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ThemeColors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: ThemeColors.border,
    paddingHorizontal: 16,
    gap: 12,
  },
  emailInputFocused: {
    borderColor: ThemeColors.primary,
  },
  emailInput: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 16,
    color: ThemeColors.text,
    paddingVertical: 16,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ThemeColors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  emailButtonDisabled: {
    opacity: 0.5,
  },
  emailButtonText: {
    fontFamily: Fonts.brandBold,
    fontSize: 16,
    color: ThemeColors.text,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 16,
    gap: 8,
  },
  errorText: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: ThemeColors.error,
    flex: 1,
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
  },
  termsText: {
    fontFamily: Fonts.brand,
    fontSize: 13,
    color: ThemeColors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: Fonts.brandBold,
    color: ThemeColors.primaryDark,
  },
});
