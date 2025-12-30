import PrimaryButton from "@/components/atoms/PrimaryButton";
import { ThemeColors } from "@/constants/theme";
import { transactionFlowModalStyles } from "@/styles/chat";
import { ApprovalContentProps } from "@/types/chat";
import { mediumTap, selectionTap } from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const ApprovalContent: React.FC<ApprovalContentProps> = ({
  transaction,
  isApproving,
  showApprovalContent,
  onApprove,
  onReject,
}) => {
  if (!showApprovalContent || !transaction) return null;

  const handleApprove = () => {
    if (isApproving) return;
    mediumTap();
    onApprove();
  };

  const handleReject = () => {
    if (isApproving) return;
    selectionTap();
    onReject();
  };

  return (
    <Animated.View
      key="approval"
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={transactionFlowModalStyles.contentContainer}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <View style={transactionFlowModalStyles.header}>
          <View style={transactionFlowModalStyles.headerIcon}>
            <Ionicons
              name="shield-checkmark"
              size={28}
              color={ThemeColors.primaryDark}
            />
          </View>
          <Text style={transactionFlowModalStyles.title}>
            Review Transaction
          </Text>
          <Text style={transactionFlowModalStyles.subtitle}>
            Verify the details before confirming
          </Text>
        </View>

        {/* Amount */}
        <View style={transactionFlowModalStyles.amountCard}>
          <Text style={transactionFlowModalStyles.amountLabel}>SENDING</Text>
          <Text style={transactionFlowModalStyles.amountValue}>
            {transaction.amount || "0"} MOVE
          </Text>
          {transaction.fee && (
            <View style={transactionFlowModalStyles.feeRow}>
              <Ionicons name="flash" size={14} color={ThemeColors.textMuted} />
              <Text style={transactionFlowModalStyles.feeText}>
                Fee: {transaction.fee}
              </Text>
            </View>
          )}
        </View>

        {/* Recipient */}
        <View style={transactionFlowModalStyles.recipientCard}>
          <View style={transactionFlowModalStyles.recipientHeader}>
            <View style={transactionFlowModalStyles.recipientIconBg}>
              <Ionicons
                name="person"
                size={16}
                color={ThemeColors.primaryDark}
              />
            </View>
            <Text style={transactionFlowModalStyles.sectionTitle}>To</Text>
          </View>
          {transaction.recipientName && (
            <Text style={transactionFlowModalStyles.recipientName}>
              {transaction.recipientName}
            </Text>
          )}
          {transaction.recipient && (
            <View style={transactionFlowModalStyles.addressBox}>
              <Text style={transactionFlowModalStyles.addressText}>
                {transaction.recipient}
              </Text>
            </View>
          )}
          {transaction.network && (
            <View style={transactionFlowModalStyles.networkBadge}>
              <Ionicons
                name="globe-outline"
                size={14}
                color={ThemeColors.primaryDark}
              />
              <Text style={transactionFlowModalStyles.networkText}>
                {transaction.network} network
              </Text>
            </View>
          )}
        </View>

        {/* Total */}
        <View style={transactionFlowModalStyles.totalRow}>
          <Text style={transactionFlowModalStyles.totalLabel}>Total</Text>
          <Text style={transactionFlowModalStyles.totalValue}>
            {transaction.total || transaction.amount || "0"}
          </Text>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={transactionFlowModalStyles.actions}>
        <Pressable
          style={[
            transactionFlowModalStyles.cancelBtn,
            isApproving && { opacity: 0.5 },
          ]}
          onPress={handleReject}
          disabled={isApproving}
        >
          <Text style={transactionFlowModalStyles.cancelText}>Cancel</Text>
        </Pressable>
        <PrimaryButton
          title={isApproving ? "Authenticating..." : "Confirm & Sign"}
          onPress={handleApprove}
          icon={isApproving ? undefined : "checkmark-circle"}
          variant="dark"
          disabled={isApproving}
          loading={isApproving}
        />
      </View>
    </Animated.View>
  );
};

export default ApprovalContent;
