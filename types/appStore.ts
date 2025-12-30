import { LoginResponseData } from "./apis";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  privyId: string;
  walletAddress: string;
}

export interface AppStore {
  // onboarding
  onboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => void;

  // userInfo
  user: AppUser | null;
  balance: LoginResponseData["balance"] | null;

  clearUser: () => void;
  clearBalance: () => void;
  setUser: (payload: { user: AppUser }) => void;
  setBalance: (balance: LoginResponseData["balance"]) => void;
}

export interface AuthStore {
  accessToken: string | null;
  idToken: string | null;

  setAuth: (payload: { accessToken: string; idToken: string }) => void;

  clearAuth: () => void;
}
