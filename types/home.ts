import { Ionicons } from "@expo/vector-icons";

export interface UserGreetingProps {
  username?: string;
  onMenuPress?: () => void;
}

export interface BalanceCardProps {
  balance?: string;
  walletAddress?: string;
  delay?: number;
}

export interface AIFloatingButtonProps {
  onChatPress?: () => void;
  onVoicePress?: () => void;
}

export interface ActionItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  bgColor: string;
  onPress?: () => void;
}

export interface QuickActionsProps {
  actions?: ActionItem[];
  delay?: number;
}

export interface CommandCardProps {
  placeholder?: string;
  example?: string;
  delay?: number;
}

export interface WelcomeCardProps {
  title?: string;
  subtitle?: string;
  delay?: number;
}

export interface IWallet {
  address: string;
  chain_id: string;
  chain_type: string;
  connector_type: string;
  delegated: boolean;
  first_verified_at: number;
  id: string;
  imported: boolean;
  latest_verified_at: number;
  public_key: string;
  recovery_method: string;
  type: string;
  verified_at: number;
  wallet_client: string;
  wallet_client_type: string;
  wallet_index: number;
}
