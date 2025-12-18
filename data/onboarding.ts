import { OnboardingSlideData } from "@/types/onboarding";

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    id: "1",
    icon: "chatbubble-ellipses",
    iconBgColor: "#FEF3C7",
    title: "Your Wallet,",
    highlightedText: "Your Voice",
    description:
      "Send, receive, and manage crypto using simple chat or voice commands. No complex interfaces needed.",
  },
  {
    id: "2",
    icon: "shield-checkmark",
    iconBgColor: "#D1FAE5",
    title: "Enterprise-Grade",
    highlightedText: "Security",
    description:
      "Protected by Privy with biometric authentication, secure enclave key management, and multi-factor protection.",
  },
  {
    id: "3",
    icon: "flash",
    iconBgColor: "#FEE2E2",
    title: "Lightning",
    highlightedText: "Fast",
    description:
      "Built on Movement Network with sub-second finality. Your transfers complete before you can blink.",
  },
  {
    id: "4",
    icon: "globe",
    iconBgColor: "#E0E7FF",
    title: "Global",
    highlightedText: "Reach",
    description:
      "Send money across borders instantly. Connect with anyone, anywhere in the world with just their wallet address.",
  },
];
