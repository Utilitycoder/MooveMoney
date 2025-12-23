import { ThemeColors } from "@/constants/theme";
import { loginStyles } from "@/styles/login";
import { Ionicons } from "@expo/vector-icons";
import { useIdentityToken, useLoginWithOAuth } from "@privy-io/expo";
import { useCreateWallet } from "@privy-io/expo/extended-chains";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
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
  const { createWallet } = useCreateWallet();
  const { getIdentityToken } = useIdentityToken();
  const [authError, setAuthError] = useState("");

  const { login, state } = useLoginWithOAuth({
    onSuccess: async (user) => {
      const movementWallet = user.linked_accounts.find(
        (account) => account.type === "wallet" && account.chain_type === "aptos"
      );

      if (!movementWallet) {
        try {
          await createWallet({ chainType: "aptos" });
        } catch {
          console.error("Failed to create Movement wallet");
        }
      }

      const idToken = await getIdentityToken();
      // console.log("idToken", idToken);

      //  "id": "did:privy:cmjbhtym400mtkv0dvaa7evsx"

      // console.log("movementWallet", movementWallet);

      // User state will update and redirect happens via layout
      router.replace("/(app)/(protected)");
    },
    onError: (err) => {
      // If already logged in, redirect instead of showing error
      if (err.message?.includes("Already logged in")) {
        router.replace("/(app)/(protected)");
        return;
      }

      setAuthError("Authentication failed. Please try again.");
    },
  });

  const handleGoogleLogin = () => {
    setAuthError("");
    login({ provider: "google" });
  };

  const isLoading = state.status === "loading";

  return (
    <View style={[loginStyles.container, { paddingTop: insets.top }]}>
      {/* Main Content */}
      <View style={loginStyles.content}>
        {/* Logo Mark */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={loginStyles.logoSection}
        >
          <View>
            <Image
              source={require("@/assets/images/logo.png")}
              style={loginStyles.logoMark}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInUp.delay(300).springify()}
          style={loginStyles.titleSection}
        >
          <Text style={loginStyles.title}>Sign in to</Text>
          <Text style={loginStyles.titleBrand}>MooveMoney</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInUp.delay(400).springify()}
          style={loginStyles.subtitle}
        >
          Your AI-powered crypto wallet.{"\n"}Smart, secure, effortless.
        </Animated.Text>

        {/* Features Pills */}
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
          style={loginStyles.featurePills}
        >
          <View style={loginStyles.pill}>
            <Ionicons
              name="sparkles"
              size={12}
              color={ThemeColors.primaryDark}
            />
            <Text style={loginStyles.pillText}>AI Assistant</Text>
          </View>
          <View style={loginStyles.pill}>
            <Ionicons name="mic" size={12} color={ThemeColors.primaryDark} />
            <Text style={loginStyles.pillText}>Voice Commands</Text>
          </View>
          <View style={loginStyles.pill}>
            <Ionicons name="flash" size={12} color={ThemeColors.primaryDark} />
            <Text style={loginStyles.pillText}>Instant Transfers</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <Animated.View
        entering={FadeInDown.delay(600)}
        style={[
          loginStyles.bottomSection,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        {/* Google Button */}
        <TouchableOpacity
          style={loginStyles.googleButton}
          onPress={handleGoogleLogin}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={ThemeColors.surface} />
          ) : (
            <View style={loginStyles.googleButtonContent}>
              <Ionicons
                name="logo-google"
                size={18}
                color={ThemeColors.surface}
              />
              <Text style={loginStyles.googleButtonText}>
                Continue with Google
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Error */}
        {authError ? (
          <Animated.View
            entering={FadeIn.duration(200)}
            style={loginStyles.errorContainer}
          >
            <Ionicons name="alert-circle" size={16} color={ThemeColors.error} />
            <Text style={loginStyles.errorText}>{authError}</Text>
          </Animated.View>
        ) : null}

        {/* Security Badge */}
        <View style={loginStyles.securityRow}>
          <View style={loginStyles.securityDot} />
          <Text style={loginStyles.securityText}>
            Secured by Privy • Enterprise-grade encryption
          </Text>
        </View>

        {/* Terms */}
        <Text style={loginStyles.terms}>
          By continuing, you agree to our{" "}
          <Text style={loginStyles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={loginStyles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}
