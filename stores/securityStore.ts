import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SecurityStore {
  isLocked: boolean;
  requiresAuthentication: boolean;
  setLocked: (locked: boolean) => void;
  setRequiresAuthentication: (required: boolean) => void;
}

export const useSecurityStore = create<SecurityStore>()(
  persist(
    (set) => ({
      isLocked: true, // Default to locked on app launch
      requiresAuthentication: true, // Default to requiring auth

      setLocked: (locked) => set({ isLocked: locked }),
      setRequiresAuthentication: (required) =>
        set({ requiresAuthentication: required }),
    }),
    {
      name: "security-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        requiresAuthentication: state.requiresAuthentication,
        // We don't persist isLocked because we want it to default to true (or handled by AppState) on fresh launch,
        // but typically we might want to start locked. However, persistence of isLocked can be tricky if the app crashes.
        // For now, let's NOT persist isLocked explicitly effectively, relying on the 'isLocked: true' initial state for new sessions,
        // but partialize will ignore it, so it will re-initialize to true on reload.
        // Wait, if we don't include it in partialize, it won't be saved. Correct.
      }),
    }
  )
);
