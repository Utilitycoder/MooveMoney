import { Chat, ChatMessage, ChatStore } from "@/types/chat";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],
      isWaitingForResponse: false,
      setIsWaitingForResponse: (isWaitingForResponse: boolean) => {
        set({ isWaitingForResponse });
      },

      createNewChat: (title: string) => {
        const newChat: Chat = {
          title,
          messages: [],
          id: Date.now().toString(),
        };

        set((state) => ({ chatHistory: [newChat, ...state.chatHistory] }));

        return newChat.id;
      },

      addNewMessage: (chatId: string, message: ChatMessage) => {
        set((state) => ({
          chatHistory: state.chatHistory.map((chat) => {
            const chatToUpdate = chat.id === chatId;

            return chatToUpdate
              ? { ...chat, messages: [...chat.messages, message] }
              : chat;
          }),
        }));
      },
    }),
    {
      name: "chat-history",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
