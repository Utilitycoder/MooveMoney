import { LoginWithOAuthInput, useLoginWithOAuth } from "@privy-io/expo";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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
      {["google"].map((provider) => (
        <View key={provider}>
          <Button
            title={`Login with ${provider}`}
            disabled={oauth.state.status === "loading"}
            onPress={() =>
              oauth.login({ provider } as unknown as LoginWithOAuthInput)
            }
          />
        </View>
      ))}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
