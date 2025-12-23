import PrimaryButton from "@/components/atoms/PrimaryButton";
import { ThemeColors } from "@/constants/theme";
import { transactionApprovalModalStyles } from "@/styles/chat";
import { TransactionApprovalModalProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

const TransactionApprovalModal: React.FC<TransactionApprovalModalProps> = ({
  visible,
  onClose,
  transaction,
  onApprove,
  onReject,
}) => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    console.log(
      "🔔 Modal visibility changed:",
      visible,
      "Transaction:",
      transaction
    );
    if (visible) {
      progress.value = withTiming(1, ANIMATION_CONFIG);
    } else {
      progress.value = withTiming(0, ANIMATION_CONFIG);
    }
  }, [visible, progress, transaction]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    pointerEvents: progress.value > 0 ? "auto" : "none",
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [400, 0]),
      },
    ],
  }));

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={transactionApprovalModalStyles.container}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[transactionApprovalModalStyles.backdrop, backdropStyle]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={[
            transactionApprovalModalStyles.sheet,
            { paddingBottom: insets.bottom + 20 },
            sheetStyle,
          ]}
        >
          <View style={transactionApprovalModalStyles.handleContainer}>
            <View style={transactionApprovalModalStyles.handle} />
          </View>

          {/* Header */}
          <View style={transactionApprovalModalStyles.header}>
            <View style={transactionApprovalModalStyles.iconContainer}>
              <Ionicons name="send" size={24} color={ThemeColors.text} />
            </View>
            <Text style={transactionApprovalModalStyles.title}>
              Confirm Transaction
            </Text>
            <Text style={transactionApprovalModalStyles.subtitle}>
              Please review the details before sending
            </Text>
          </View>

          {/* Transaction Details */}
          <View style={transactionApprovalModalStyles.detailsContainer}>
            <View style={transactionApprovalModalStyles.detailRow}>
              <Text style={transactionApprovalModalStyles.detailLabel}>
                Amount
              </Text>
              <Text style={transactionApprovalModalStyles.detailValue}>
                {transaction?.amount}
              </Text>
            </View>

            {transaction?.recipient && (
              <View style={transactionApprovalModalStyles.detailRow}>
                <Text style={transactionApprovalModalStyles.detailLabel}>
                  Receiver Address
                </Text>
                <Text
                  style={transactionApprovalModalStyles.addressValue}
                  numberOfLines={2}
                  ellipsizeMode="middle"
                >
                  {transaction.recipient}
                </Text>
              </View>
            )}
            {transaction?.recipientName && (
              <View style={transactionApprovalModalStyles.detailRow}>
                <Text style={transactionApprovalModalStyles.detailLabel}>
                  Recipient Name
                </Text>
                <Text style={transactionApprovalModalStyles.detailValue}>
                  {transaction.recipientName}
                </Text>
              </View>
            )}

            {transaction?.network && (
              <View style={transactionApprovalModalStyles.detailRow}>
                <Text style={transactionApprovalModalStyles.detailLabel}>
                  Network
                </Text>
                <Text style={transactionApprovalModalStyles.detailValue}>
                  {transaction.network}
                </Text>
              </View>
            )}

            {transaction?.fee && (
              <View style={transactionApprovalModalStyles.detailRow}>
                <Text style={transactionApprovalModalStyles.detailLabel}>
                  Network Fee
                </Text>
                <Text style={transactionApprovalModalStyles.detailValue}>
                  {transaction.fee}
                </Text>
              </View>
            )}

            <View style={transactionApprovalModalStyles.totalRow}>
              <Text style={transactionApprovalModalStyles.totalLabel}>
                Total
              </Text>
              <Text style={transactionApprovalModalStyles.totalValue}>
                {transaction?.total || transaction?.amount}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={transactionApprovalModalStyles.actionsContainer}>
            <TouchableOpacity
              style={transactionApprovalModalStyles.rejectButton}
              onPress={handleReject}
              activeOpacity={0.8}
            >
              <Text style={transactionApprovalModalStyles.rejectText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <PrimaryButton
              title="Approve & Send"
              onPress={handleApprove}
              icon="checkmark-circle"
              variant="dark"
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default TransactionApprovalModal;
