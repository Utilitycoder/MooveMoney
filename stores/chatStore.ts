import { ChatMessage, ChatStore } from "@/types/chat";
import { create } from "zustand";

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  conversationId: undefined,
  conversationHistory: [],
  isWaitingForResponse: false,

  setIsWaitingForResponse: (isWaitingForResponse: boolean) => {
    set({ isWaitingForResponse });
  },

  addMessage: (message: ChatMessage) => {
    // Use functional update for better performance
    set((state) => {
      // Create new array reference to trigger re-render
      const newMessages = [...state.messages, message];
      return { messages: newMessages };
    });
  },

  setConversationId: (conversationId: string | undefined) => {
    set({ conversationId });
  },

  setConversationHistory: (
    history: { role: "user" | "assistant"; content: string }[]
  ) => {
    set({ conversationHistory: history });
  },

  clearMessages: () => {
    set({
      messages: [],
      conversationId: undefined,
      conversationHistory: [],
    });
  },
}));
