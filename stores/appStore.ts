import { AppStore } from "@/types/appStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      balance: null,
      onboardingCompleted: false,

      setOnboardingCompleted: (onboardingCompleted) =>
        set({ onboardingCompleted }),

      setUser: ({ user }) =>
        set({
          user,
        }),

      setBalance: (balance) => set({ balance }),

      clearBalance: () => set({ balance: null }),

      clearUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        balance: state.balance,
        onboardingCompleted: state.onboardingCompleted,
      }),
    }
  )
);
