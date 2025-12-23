import TransactionApprovalModal from "@/components/screens/chat/TransactionApprovalModal";
import EmptyVoiceChat from "@/components/screens/voiceChat/EmptyVoiceChat";
import VoiceChatBubble from "@/components/screens/voiceChat/VoiceChatBubble";
import VoiceChatHeader from "@/components/screens/voiceChat/VoiceChatHeader";
import VoiceChatInput from "@/components/screens/voiceChat/VoiceChatInput";
import { ThemeColors } from "@/constants/theme";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import { voiceChatStyles as styles } from "@/styles/voiceChat";
import { TransactionDetails } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VoiceChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  // Transaction modal state
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [pendingTransaction, setPendingTransaction] =
    useState<TransactionDetails | null>(null);

  const handleClose = () => {
    // End conversation before closing
    endConversation();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleTransactionDetected = (transaction: TransactionDetails) => {
    setPendingTransaction(transaction);
    setTimeout(() => {
      setShowTransactionModal(true);
    }, 500);
  };

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
  } = useVoiceChat({
    onTransactionDetected: handleTransactionDetected,
    useMockService: true,
  });

  // Scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleTransactionApprove = () => {
    console.log("Transaction approved:", pendingTransaction);
    setShowTransactionModal(false);
    setPendingTransaction(null);
  };

  const handleTransactionReject = () => {
    console.log("Transaction rejected");
    setShowTransactionModal(false);
    setPendingTransaction(null);
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
      <View style={{ flex: 1 }}>
        {showEmptyState ? (
          <EmptyVoiceChat />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <VoiceChatBubble message={item} index={index} />
            )}
            contentContainerStyle={styles.messagesList}
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

      {/* Transaction Approval Modal */}
      <TransactionApprovalModal
        visible={showTransactionModal && !!pendingTransaction}
        onClose={() => {
          setShowTransactionModal(false);
          setPendingTransaction(null);
        }}
        transaction={pendingTransaction}
        onApprove={handleTransactionApprove}
        onReject={handleTransactionReject}
      />
    </View>
  );
}
