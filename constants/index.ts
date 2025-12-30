// src/constants/env.ts
export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL!,
  environment: process.env.EXPO_PUBLIC_ENV!,
  isProd: process.env.EXPO_PUBLIC_ENV === "production",
};

if (!env.apiUrl) {
  throw new Error("EXPO_PUBLIC_API_URL is not defined");
}
