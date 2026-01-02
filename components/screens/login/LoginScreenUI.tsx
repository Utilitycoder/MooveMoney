import { setLoginGracePeriod } from "@/lib/api";
import { loginUser, mapErrorToMessage } from "@/services/authService";
import { loginStyles } from "@/styles/login";
import { useIdentityToken, useLoginWithOAuth } from "@privy-io/expo";
import { useCreateWallet } from "@privy-io/expo/extended-chains";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ErrorMessage } from "./ErrorMessage";
import { FeaturePills } from "./FeaturePills";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { SecurityBadge } from "./SecurityBadge";
import { TermsText } from "./TermsText";
import { TitleSection } from "./TitleSection";
import { LogoSection } from "./LogoSection";

function LoginScreenUI() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createWallet } = useCreateWallet();
  const [authError, setAuthError] = useState("");
  const { getIdentityToken } = useIdentityToken();

  const { login, state } = useLoginWithOAuth({
    onSuccess: async (user) => {
      // Set grace period IMMEDIATELY when Privy login succeeds
      // This prevents stale 401 errors from triggering logout before backend login completes
      setLoginGracePeriod();

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

      console.log("idToken::: ", idToken);

      try {
        await loginUser(idToken || "");
      } catch (e) {
        setAuthError(mapErrorToMessage(e));
      }
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
        <LogoSection />
        <TitleSection />
        <FeaturePills />
      </View>

      {/* Bottom Section */}
      <Animated.View
        entering={FadeInDown.delay(600)}
        style={[
          loginStyles.bottomSection,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <GoogleLoginButton onPress={handleGoogleLogin} isLoading={isLoading} />
        <ErrorMessage message={authError} />
        <SecurityBadge />
        <TermsText />
      </Animated.View>
    </View>
  );
}

export default LoginScreenUI;
