import { ThemeColors } from "@/constants/theme";
import { useContactsStore } from "@/stores/contactsStore";
import { transactionFlowModalStyles } from "@/styles/chat";
import { TransactionFlowModalProps } from "@/types/chat";
import { errorHaptic, selectionTap, successHaptic } from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ANIMATION_CONFIG,
  STAGE_DETAILS,
} from "../../../constants/transactionFlowModal";
import ApprovalContent from "./transaction-flow/ApprovalContent";
import ProcessingContent from "./transaction-flow/ProcessingContent";
import ResultContent from "./transaction-flow/ResultContent";

const TransactionFlowModal: React.FC<TransactionFlowModalProps> = ({
  visible,
  uiState,
  processingStage,
  transaction,
  result,
  isApproving,
  onClose,
  onApprove,
  onReject,
  onTryAgain,
  onViewDetails,
  onSaveAddress,
}) => {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const iconScale = useSharedValue(0);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [contactName, setContactName] = useState("");
  const hasTriggeredHaptic = useRef(false);
  const getContactByAddress = useContactsStore((s) => s.getContactByAddress);

  const isModalVisible = visible && uiState !== "idle" && !!transaction;
  const isProcessing = uiState === "processing";
  const isResult = uiState === "result";
  const isApproval = uiState === "approval";
  const isCompleted = processingStage === "completed";
  const isFailed = processingStage === "failed";
  const isSuccess = result?.success ?? false;

  // Modal open/close animation
  useEffect(() => {
    if (isModalVisible) {
      progress.value = withTiming(1, ANIMATION_CONFIG);
      selectionTap();
    } else {
      progress.value = withTiming(0, ANIMATION_CONFIG);
      hasTriggeredHaptic.current = false;
      setShowSavePrompt(false);
      setContactName("");
    }
  }, [isModalVisible, progress]);

  // Spinner animation for processing
  useEffect(() => {
    if (isProcessing && !isCompleted && !isFailed) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotation.value = withTiming(0, { duration: 200 });
    }
  }, [isProcessing, isCompleted, isFailed, rotation]);

  // Result icon animation
  useEffect(() => {
    if (isResult && result) {
      iconScale.value = withSpring(1, { damping: 12, stiffness: 180 });
      if (!hasTriggeredHaptic.current) {
        hasTriggeredHaptic.current = true;
        if (result.success) {
          successHaptic();
        } else {
          errorHaptic();
        }
      }
    } else {
      iconScale.value = 0;
    }
  }, [isResult, result, iconScale]);

  // Save address prompt
  useEffect(() => {
    if (isResult && isSuccess && transaction?.recipient) {
      const existingContact = getContactByAddress(transaction.recipient);
      if (!existingContact) {
        const timer = setTimeout(() => setShowSavePrompt(true), 400);
        return () => clearTimeout(timer);
      }
    }
    setShowSavePrompt(false);
  }, [isResult, isSuccess, transaction, getContactByAddress]);

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    pointerEvents: progress.value > 0.5 ? ("auto" as const) : ("none" as const),
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [500, 0]) }],
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const resultIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  // Helpers
  const getRecipientDisplay = () => {
    if (transaction?.recipientName) return transaction.recipientName;
    if (transaction?.recipient) {
      const addr = transaction.recipient;
      return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
    }
    return "recipient";
  };

  const getStageIndex = (stageKey: string) =>
    STAGE_DETAILS.findIndex((s) => s.key === stageKey);
  const currentStageIndex = getStageIndex(processingStage);

  const handleSaveAddress = () => {
    if (transaction?.recipient && contactName.trim()) {
      onSaveAddress(transaction.recipient, contactName.trim());
      setShowSavePrompt(false);
      setContactName("");
    }
  };

  // Render loading fallback
  const renderFallback = () => (
    <View style={transactionFlowModalStyles.processingContent}>
      <View style={transactionFlowModalStyles.spinnerContainer}>
        <Animated.View
          style={[transactionFlowModalStyles.spinner, spinnerStyle]}
        >
          <View style={transactionFlowModalStyles.spinnerInner}>
            <Ionicons name="sync" size={28} color={ThemeColors.primary} />
          </View>
        </Animated.View>
      </View>
      <Text style={transactionFlowModalStyles.statusText}>Loading...</Text>
    </View>
  );

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={isProcessing ? undefined : onClose}
    >
      <View style={transactionFlowModalStyles.container}>
        {/* Backdrop */}
        <Animated.View
          style={[transactionFlowModalStyles.backdrop, backdropStyle]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={isProcessing ? undefined : onClose}
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            transactionFlowModalStyles.sheet,
            { paddingBottom: insets.bottom + 16 },
            sheetStyle,
          ]}
        >
          <View style={transactionFlowModalStyles.handle} />

          {/* Approval Stage */}
          <ApprovalContent
            onReject={onReject}
            onApprove={onApprove}
            isApproving={isApproving}
            transaction={transaction}
            showApprovalContent={isApproval && !!transaction}
          />

          {/* Processing Stage */}

          <ProcessingContent
            transaction={transaction}
            isCompleted={isCompleted}
            spinnerStyle={spinnerStyle}
            processingStage={processingStage}
            currentStageIndex={currentStageIndex}
            getRecipientDisplay={getRecipientDisplay}
            showProcessingContent={isProcessing && !!transaction}
          />

          {/* Result Stage */}

          <ResultContent
            result={result}
            onClose={onClose}
            isSuccess={isSuccess}
            onTryAgain={onTryAgain}
            contactName={contactName}
            transaction={transaction}
            showResultContent={isResult}
            onViewDetails={onViewDetails}
            showSavePrompt={showSavePrompt}
            setContactName={setContactName}
            onSaveAddress={handleSaveAddress}
            resultIconStyle={resultIconStyle}
            setShowSavePrompt={setShowSavePrompt}
            getRecipientDisplay={getRecipientDisplay}
          />

          {/* Fallback loading state */}
          {!isApproval && !isProcessing && !isResult && renderFallback()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default TransactionFlowModal;
