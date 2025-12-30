import { BiometricResult } from "@/types";
import * as LocalAuthentication from "expo-local-authentication";

export async function confirmBiometric(): Promise<BiometricResult> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) return { status: "not_available" };

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Approve transaction",
    fallbackLabel: "Use device passcode",
    biometricsSecurityLevel: "strong",
  });

  if (result.success) return { status: "success" };

  if (result.error === "user_cancel") return { status: "cancelled" };

  return { status: "failed" };
}
