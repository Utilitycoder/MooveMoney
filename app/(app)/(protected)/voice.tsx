import TransactionFlowModal from "@/components/screens/chat/TransactionFlowModal";
import EmptyVoiceChat from "@/components/screens/voiceChat/EmptyVoiceChat";
import VoiceChatBubble from "@/components/screens/voiceChat/VoiceChatBubble";
import VoiceChatHeader from "@/components/screens/voiceChat/VoiceChatHeader";
import VoiceChatInput from "@/components/screens/voiceChat/VoiceChatInput";
import { ThemeColors } from "@/constants/theme";
import { useTransactionFlow } from "@/hooks/useTransactionFlow";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import { useContactsStore } from "@/stores/contactsStore";
import { voiceChatStyles as styles } from "@/styles/voiceChat";
import { TransactionDetails } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { LegendList, LegendListRef } from "@legendapp/list";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VoiceChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const legendListRef = useRef<LegendListRef>(null);
  const addContact = useContactsStore((state) => state.addContact);

  const setTransactionRef = useRef<
    ((transaction: TransactionDetails) => void) | null
  >(null);

  const handleTransactionDetected = useCallback(
    (transaction: TransactionDetails) => {
      setTimeout(() => {
        if (setTransactionRef.current) {
          setTransactionRef.current(transaction);
        }
      }, 500);
    },
    []
  );

  const {
    state,
    messages,
    error,
    isRecording,
    isInConversation,
    recordingDuration,
    animations,
    startConversation,
    stopRecording,
    endConversation,
    clearMessages,
    retryLastMessage,
    addMessage,
  } = useVoiceChat({
    onTransactionDetected: handleTransactionDetected,
    useMockService: false,
  });

  // Use reusable transaction flow hook
  const {
    transactionState,
    isApproving,
    handleApprove: handleTransactionApprove,
    handleReject: handleTransactionReject,
    handleViewDetails,
    handleTryAgain,
    resetTransactionState,
    setTransaction,
  } = useTransactionFlow({
    onSuccess: (result, details) => {
      // Add success message to chat
      addMessage({
        id: `${Date.now()}-success`,
        role: "assistant",
        content: `✅ Transaction completed! ${details.amount} MOVE has been sent successfully.`,
        timestamp: new Date(),
      });
    },

    onReject: () => {
      // Add a cancellation message to chat
      addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Transaction cancelled. Is there anything else I can help you with?",
        timestamp: new Date(),
      });
    },

    onBiometricError: (status) => {
      const biometricErrors: Record<string, string> = {
        not_available:
          "Biometric authentication is not available on this device. Please enable it in your device settings.",
        cancelled: "Transaction cancelled.",
        failed: "Biometric authentication failed. Please try again.",
      };

      const errorContent = biometricErrors[status];

      if (errorContent) {
        addMessage({
          id: `${Date.now()}-biometric-${status}`,
          role: "assistant",
          content: errorContent,
          timestamp: new Date(),
        });
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      legendListRef.current?.scrollToEnd({ animated: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  // Connect the ref to the hook's setTransaction
  useEffect(() => {
    setTransactionRef.current = setTransaction;
  }, [setTransaction]);

  const handleClose = () => {
    // End conversation before closing
    endConversation();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  // Show empty state only when not in conversation and no messages
  const showEmptyState = messages.length === 0 && !isInConversation;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <VoiceChatHeader
        state={state}
        isInConversation={isInConversation}
        onClose={handleClose}
        onEndConversation={isInConversation ? endConversation : undefined}
        onClear={
          messages.length > 0 && !isInConversation ? clearMessages : undefined
        }
      />

      {/* Content */}
      <View style={{ flex: 1, marginTop: 1 }}>
        {showEmptyState ? (
          <EmptyVoiceChat />
        ) : (
          <LegendList
            ref={legendListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <VoiceChatBubble message={item} index={index} />
            )}
            style={{ flex: 1 }}
            contentContainerStyle={[styles.messagesList, { paddingBottom: 0 }]}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Error display */}
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={ThemeColors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={retryLastMessage}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Voice Input */}
        <VoiceChatInput
          state={state}
          isRecording={isRecording}
          isInConversation={isInConversation}
          recordingDuration={recordingDuration}
          onStartConversation={startConversation}
          onStopRecording={stopRecording}
          onEndConversation={endConversation}
          animations={{
            pulseAnim: animations.pulseAnim,
            micScale: animations.micScale,
            audioLevel: animations.audioLevel,
          }}
        />
      </View>

      {/* Safe area bottom padding */}
      <View style={{ height: insets.bottom }} />

      {/* Unified Transaction Flow Modal */}
      <TransactionFlowModal
        visible={transactionState.uiState !== "idle"}
        uiState={transactionState.uiState}
        processingStage={transactionState.processingStage}
        transaction={transactionState.pendingTransaction}
        result={transactionState.result}
        isApproving={isApproving}
        onClose={resetTransactionState}
        onApprove={handleTransactionApprove}
        onReject={handleTransactionReject}
        onTryAgain={handleTryAgain}
        onViewDetails={handleViewDetails}
        onSaveAddress={(address: string, name: string) => {
          addContact(name, address);
        }}
      />
    </View>
  );
}
