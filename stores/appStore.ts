import { AppStore } from "@/types/appStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      onboardingCompleted: false,
      setOnboardingCompleted: (onboardingCompleted: boolean) => {
        set({ onboardingCompleted });
      },
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
