import { env } from "@/constants";
import { apiFetch, setLoginGracePeriod } from "@/lib/api";
import { setBalance } from "@/lib/app";
import { setAuth } from "@/lib/auth";
import { useAppStore } from "@/stores/appStore";
import { LoginResponseData } from "@/types/apis";

const API_BASE_URL = `${env.apiUrl}/api/m-auth`;

export async function loginUser(
  idToken: string
): Promise<
  Pick<LoginResponseData, "user" | "message" | "success" | "expiresAt">
> {
  if (!idToken) {
    throw new Error("Identity token is required");
  }

try {
  
  const response = await apiFetch<{ data: LoginResponseData }>(
    `${API_BASE_URL}/login`,
    {
      method: "POST",
      body: JSON.stringify({ idToken }),
    }
  );
  
  const token = response.data.token;
  const userData = response.data.user;
  const balance = response.data.balance;
  
  // Set grace period immediately after successful login
  // This prevents stale 401 responses from triggering logout
  setLoginGracePeriod();
  
  if (token) {
    await setAuth({ accessToken: token, idToken });
  }
  
  if (userData) {
    useAppStore.getState().setUser({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        privyId: userData.privyId,
        walletAddress: userData.walletAddress,
      },
    });
  }
  
  if (balance) setBalance(balance);
  
  // Return a properly formatted LoginResponseData
  const loginData = {
    user: userData,
    message: response.data.message,
    success: response.data.success,
    expiresAt: response.data.expiresAt,
  };
  
  return loginData;
} catch (error) {
  throw error
}
}

export function mapErrorToMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Something went wrong";
  }

  if (error.message.includes("internet")) {
    return "You’re offline. Check your connection.";
  }

  if (error.message.includes("timed out")) {
    return "Network is slow. Please try again.";
  }

  return error.message;
}
