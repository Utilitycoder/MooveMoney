import Skeleton from "@/components/atoms/Skeleton";
import { ThemeColors } from "@/constants/theme";
import { useBalance } from "@/queries/useBalance";
import { useAppStore } from "@/stores/appStore";
import { balanceCardStyles } from "@/styles/home";
import { BalanceCardProps } from "@/types/home";
import { copyToClipboard, formatAddress } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BalanceCard: React.FC<BalanceCardProps> = ({
  walletAddress,
  delay = 100,
}) => {
  const { data: balance, isLoading: balanceLoading, isFetching } =
    useBalance(walletAddress);

  const defaultBalance = useAppStore((state) => state.balance?.balance);
  const [copied, setCopied] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Use current balance if available, otherwise fall back to stored balance or "0.000"
  const displayBalance = balance || defaultBalance || "0.000";

  const handleCopy = async () => {
    if (!walletAddress) return;

    await copyToClipboard(walletAddress, "Wallet address");

    // Micro interaction: scale and fade animation
    scale.value = withSpring(1.2, { damping: 10 }, () => {
      scale.value = withSpring(1);
    });

    setCopied(true);
    opacity.value = withTiming(0.5, { duration: 200 });

    setTimeout(() => {
      setCopied(false);
      opacity.value = withTiming(1, { duration: 200 });
    }, 1500);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const showSkeleton = balanceLoading || isFetching;

  if (showSkeleton) {
    return <BalanceCardSkeleton delay={delay} />;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(delay)}
      style={balanceCardStyles.card}
    >
      <View style={balanceCardStyles.labelRow}>
        <View style={balanceCardStyles.balanceLabelContainer}>
          <Ionicons
            size={18}
            name="wallet-outline"
            color={ThemeColors.textSecondary}
          />

          <Text style={balanceCardStyles.balanceLabel}>
            {walletAddress ? formatAddress(walletAddress) : "MOVE Balance"}
          </Text>
        </View>

        {walletAddress && (
          <AnimatedPressable
            onPress={handleCopy}
            style={[balanceCardStyles.copyButton, animatedStyle]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={copied ? "checkmark" : "copy-outline"}
              size={16}
              color={copied ? ThemeColors.success : ThemeColors.textSecondary}
            />
          </AnimatedPressable>
        )}
      </View>

      <View style={balanceCardStyles.balanceRow}>
        <Text style={balanceCardStyles.balanceAmount}>{displayBalance}</Text>
        <Text style={balanceCardStyles.currencyCode}>MOVE</Text>
      </View>
    </Animated.View>
  );
};

const BalanceCardSkeleton = ({ delay = 100 }: { delay?: number }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay)}
      style={balanceCardStyles.card}
    >
      <View style={balanceCardStyles.labelRow}>
        <View style={balanceCardStyles.balanceLabelContainer}>
          <Skeleton width={18} height={18} borderRadius={9} />
          <Skeleton width={120} height={16} style={{ marginLeft: 8 }} />
          <Skeleton width={120} height={16} style={{ marginLeft: 8 }} />
        </View>
      </View>

      <View style={[balanceCardStyles.balanceRow, { marginTop: 12 }]}>
        <Skeleton width={150} height={40} />
        <Skeleton width={60} height={20} style={{ marginLeft: 8 }} />
      </View>
    </Animated.View>
  );
};

export default BalanceCard;
