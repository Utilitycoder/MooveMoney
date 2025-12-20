export interface AppStore {
  onboardingCompleted: boolean;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
}
