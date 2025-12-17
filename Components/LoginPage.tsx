import { useLoginWithOAuth } from "@privy-io/expo";
import { OAuthProviderID } from "@privy-io/js-sdk-core";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const OAUTH_PROVIDERS: OAuthProviderID[] = ["google"];

const LoginPage = () => {
  const [error, setError] = useState("");

  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(err.message);
    },
  });

  return (
    <View>
      <Text>This is the LoginPage</Text>
      {OAUTH_PROVIDERS.map((provider) => (
        <View key={provider}>
          <Button
            title={`Login with ${provider}`}
            disabled={oauth.state.status === "loading"}
            onPress={() => oauth.login({ provider })}
          />
        </View>
      ))}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
