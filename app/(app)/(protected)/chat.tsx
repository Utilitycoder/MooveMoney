import ChatBubble from "@/components/screens/chat/ChatBubble";
import ChatHeader from "@/components/screens/chat/ChatHeader";
import ChatInput from "@/components/screens/chat/ChatInput";
import EmptyChat from "@/components/screens/chat/EmptyChat";
import TransactionApprovalModal from "@/components/screens/chat/TransactionApprovalModal";
import { getAIResponse } from "@/data/chat";
import { chatStyles } from "@/styles/chat";
import { ChatMessage, TransactionDetails } from "@/types/chat";
import { useRouter } from "expo-router";

import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
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
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [pendingTransaction, setPendingTransaction] =
    useState<TransactionDetails | null>(null);

  const { height } = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
    };
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI response (replace with actual AI call)
    setTimeout(() => {
      const response = getAIResponse(userMessage.content);

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);

      setIsLoading(false);

      // Check if response indicates a send intent
      if (response.isSendIntent && response.transaction) {
        // Set transaction first, then show modal after a brief delay
        setPendingTransaction(response.transaction);

        setTimeout(() => {
          setShowTransactionModal(true);
        }, 500);
      }

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleTransactionApprove = () => {
    // Add a confirmation message to chat
    const confirmMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: "Transaction approved! Your payment is being processed.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setPendingTransaction(null);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleTransactionReject = () => {
    // Add a cancellation message to chat
    const cancelMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "Transaction cancelled. Is there anything else I can help you with?",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, cancelMessage]);
    setPendingTransaction(null);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // console.log(
  //   new Date().toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // );

  return (
    <View style={[chatStyles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <ChatHeader onBack={handleBack} onClear={handleClear} />
      <View style={{ flex: 1 }}>
        {/* Chat Content */}

        {messages.length === 0 ? (
          <EmptyChat onSuggestionPress={handleSuggestionPress} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ChatBubble message={item} index={index} />
            )}
            contentContainerStyle={chatStyles.messagesList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}

        <ChatInput
          value={inputValue}
          onChangeText={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </View>

      {/* Transaction Approval Modal */}
      <TransactionApprovalModal
        visible={showTransactionModal && !!pendingTransaction}
        onClose={() => {
          console.log("❌ Modal closed");
          setShowTransactionModal(false);
          setPendingTransaction(null);
        }}
        transaction={pendingTransaction}
        onApprove={handleTransactionApprove}
        onReject={handleTransactionReject}
      />

      <Animated.View style={fakeView} />
    </View>
  );
}

// Response type for AI responses
