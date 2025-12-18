import ChatBubble from "@/components/screens/chat/ChatBubble";
import ChatHeader from "@/components/screens/chat/ChatHeader";
import ChatInput from "@/components/screens/chat/ChatInput";
import EmptyChat from "@/components/screens/chat/EmptyChat";
import { ThemeColors } from "@/constants/theme";
import { ChatMessage } from "@/types/chat";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Track keyboard visibility for Android
  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/(auth)");
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
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <ChatHeader onBack={handleBack} onClear={handleClear} />

      {/* Chat Content */}
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
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
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}

        {/* Input - only add bottom padding when keyboard is NOT visible */}
        <View
          style={{
            paddingBottom:
              keyboardVisible && Platform.OS === "android" ? 0 : insets.bottom,
          }}
        >
          <ChatInput
            value={inputValue}
            onChangeText={setInputValue}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Temporary mock AI response
function getAIResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  if (input.includes("balance")) {
    return "Your current balance is 0.00 MOVE. Would you like to add funds to your wallet?";
  }
  if (input.includes("send")) {
    return "I can help you send crypto. Please confirm the amount and recipient address, and I'll prepare the transaction for you.";
  }
  if (input.includes("transaction") || input.includes("history")) {
    return "You don't have any recent transactions yet. Once you start sending or receiving crypto, they'll appear here.";
  }
  if (input.includes("swap")) {
    return "I can help you swap tokens. Currently, swaps are available between MOVE, USDC, and ETH. What would you like to swap?";
  }

  return (
    'I understand you want to: "' +
    userInput +
    "\". I'm your AI wallet assistant. I can help you send crypto, check balances, view transactions, and more. What would you like to do?"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: 16,
  },
});
