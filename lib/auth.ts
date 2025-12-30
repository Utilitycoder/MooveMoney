import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";
const ID_TOKEN = "id_token";

export const setAuth = async ({
  idToken,
  accessToken,
}: {
  idToken?: string;
  accessToken: string;
}) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);

  if (idToken) await SecureStore.setItemAsync(ID_TOKEN, idToken);
};

export const getAuthToken = async () => {
  return SecureStore.getItemAsync(ACCESS_TOKEN);
};

export const getIdToken = async () => {
  return SecureStore.getItemAsync(ID_TOKEN);
};

export const clearAuth = async () => {
  await SecureStore.deleteItemAsync(ID_TOKEN);
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
};
