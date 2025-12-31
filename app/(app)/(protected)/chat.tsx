import ChatBubble from "@/components/screens/chat/ChatBubble";
import ChatHeader from "@/components/screens/chat/ChatHeader";
import ChatInput from "@/components/screens/chat/ChatInput";
import EmptyChat from "@/components/screens/chat/EmptyChat";
import TransactionFlowModal from "@/components/screens/chat/TransactionFlowModal";
import { useTransactionFlow } from "@/hooks/useTransactionFlow";
import { getChatResponse } from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";
import { useContactsStore } from "@/stores/contactsStore";
import { chatStyles } from "@/styles/chat";
import { ChatMessage } from "@/types/chat";
import { LegendList, LegendListRef } from "@legendapp/list";
import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";

import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet";
        height.value = Math.max(event.height, 0);
      },
    },
    []
  );
  return { height };
};

export default function ChatScreen() {
  const router = useRouter();
  const { user } = usePrivy();
  const insets = useSafeAreaInsets();
  const legendListRef = useRef<LegendListRef | null>(null);
  const addContact = useContactsStore((state) => state.addContact);

  // Use chatStore for messages and conversation state
  const {
    messages,
    addMessage,
    clearMessages,
    conversationId,
    setConversationId,
    conversationHistory,
    setConversationHistory,
    setIsWaitingForResponse,
  } = useChatStore();

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

  const { height } = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
    };
  }, []);

  const isLoading = useChatStore((state) => state.isWaitingForResponse);

  useEffect(() => {
    const timer = setTimeout(() => {
      legendListRef.current?.scrollToEnd({ animated: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleClear = () => {
    clearMessages();
  };

  const handleSend = async (message: string) => {
    const messageContent = message.trim();

    if (!messageContent || isLoading) return;

    // Set loading state immediately for better UX
    setIsWaitingForResponse(true);

    const userMessage: ChatMessage = {
      role: "user",
      timestamp: new Date(),
      content: messageContent,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    };

    // Add user message to store immediately (synchronous)
    addMessage(userMessage);

    try {
      // Call the real API
      const response = await getChatResponse(
        messageContent,
        conversationHistory.length > 0 ? conversationHistory : undefined,
        conversationId
      );

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      };

      // Add AI response to store
      addMessage(aiResponse);

      // Update conversation state from API response
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      // Always use the conversation history returned from the API response
      // The service handles building it correctly whether API returns it or not
      if (response.conversationHistory) {
        setConversationHistory(response.conversationHistory);
      }

      setIsWaitingForResponse(false);

      // Check if response indicates a send intent
      if (response?.isSendIntent && response?.transaction) {
        // Set transaction and show approval modal after a brief delay
        setTimeout(() => {
          setTransaction(response.transaction!);
        }, 500);
      }
    } catch (error) {
      console.error("Chat API error:", error);
      setIsWaitingForResponse(false);

      // Show a friendly error message to the user
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please try again in a moment. 😊",
        timestamp: new Date(),
      };

      addMessage(errorMessage);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    // Send the suggestion directly as a message
    handleSend(suggestion);
  };

  return (
    <View style={[chatStyles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <ChatHeader onBack={handleBack} onClear={handleClear} />
      <View style={{ flex: 1, marginTop: 1 }}>
        {/* Chat Content */}

        {messages.length === 0 ? (
          <EmptyChat onSuggestionPress={handleSuggestionPress} />
        ) : (
          <LegendList
            ref={legendListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ChatBubble
                message={item}
                index={index}
                userInitials={
                  (user as any)?.email?.address
                    ?.substring(0, 2)
                    .toUpperCase() || "U"
                }
              />
            )}
            contentContainerStyle={[
              chatStyles.messagesList,
              { paddingBottom: 0 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}

        <ChatInput onSend={handleSend} />
      </View>

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

      <Animated.View style={fakeView} />
    </View>
  );
}
