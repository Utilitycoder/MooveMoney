import { env } from "@/constants";
import { apiFetch } from "@/lib/api";
import { AIResponse, ChatApiResponse, TransactionDetails } from "@/types/chat";
import { LegendList } from "@legendapp/list";

const API_BASE_URL = `${env.apiUrl}/api`;

interface GetChatResponseProps {
  message: string;
  isVoice?: boolean;
  conversationId?: string;
  conversationHistory?: { role: "user" | "assistant"; content: string }[];
}

/**
 * Send transcribed text to chat API and get AI response
 */
export async function getChatResponse({
  message,
  isVoice,
  conversationId,
  conversationHistory,
}: GetChatResponseProps): Promise<AIResponse> {
  try {
    // Build messages array for the request
    // Filter out any messages with empty content to avoid API errors
    const baseMessages = conversationHistory
      ? [...conversationHistory, { role: "user" as const, content: message }]
      : [{ role: "user" as const, content: message }];

    const messages = baseMessages.filter(
      (msg) => msg.content && msg.content.trim() !== ""
    );

    // Build request body - include conversationId if provided
    const requestBody = {
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      ...(isVoice ? { isVoice } : {}),
      ...(conversationId ? { conversationId } : {}),
    };

    // Use apiFetch for authenticated requests
    const response = await apiFetch<ChatApiResponse>(`${API_BASE_URL}/m-chat`, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (!response || !response.status || !response.data) {
      const errorMessage =
        (response as any)?.info?.message || "Invalid API response format";
      throw new Error(errorMessage);
    }

    // Extract response content
    const content = response.data.response || "";

    // console.log(response?.data);

    // Parse actions to detect transaction intents and end conversation
    let isSendIntent = false;
    let isEndConversation = false;

    let transaction: TransactionDetails | undefined;

    if (response.data?.actions?.length) {
      // Check for send transaction action
      const sendAction = response.data.actions.find(
        (action) => action.type === "confirm_transfer"
      );

      if (sendAction && sendAction.data) {
        isSendIntent = true;
        transaction = {
          amount: (sendAction.data.amount as string) || "",
          recipient: (sendAction.data.to as string) || "",
          recipientName:
            (sendAction.data?.recipientName as string) || undefined,
          network: (sendAction.data.network as string) || "MOVE",
          fee: sendAction.data.estimatedGasFee
            ? `~${sendAction.data.estimatedGasFee as string} MOVE`
            : undefined,
          total: sendAction.data.total
            ? `${sendAction.data.total as string} MOVE`
            : undefined,
          type: "send",
        };
      }

      // Check for end conversation action
      const endAction = response.data.actions.find(
        (action) => action.type === "end_conversation"
      );
      if (endAction) {
        isEndConversation = true;
      }
    }

    // Build the updated conversation history:
    // If API returns conversationHistory, use it
    // Otherwise, append the new exchange to the history we sent
    // Filter out any empty messages to prevent API errors
    const buildHistory = () => {
      if (response.data.conversationHistory) {
        return response.data.conversationHistory;
      }

      const newMessages: { role: "user" | "assistant"; content: string }[] = [];

      // Add existing history
      if (conversationHistory) {
        newMessages.push(...conversationHistory);
      }

      // Add user message
      if (message && message.trim()) {
        newMessages.push({ role: "user" as const, content: message });
      }

      // Add assistant response only if not empty
      if (content && content.trim()) {
        newMessages.push({ role: "assistant" as const, content });
      }

      return newMessages;
    };

    const updatedHistory = buildHistory().filter(
      (msg) => msg.content && msg.content.trim() !== ""
    );

    return {
      content,
      transaction,
      isSendIntent,
      isEndConversation,
      actions: response.data.actions,
      conversationHistory: updatedHistory,
      conversationId: response.data.conversationId,
      isVoice: response.data.isVoice,
      audioUrl: response.data.audioUrl,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAudioText(base64String: string): Promise<string> {
  try {
    // Clean base64 string (remove newlines if any)
    const cleanBase64 = base64String.replace(/[\r\n]+/g, "");

    // m/transcribe
    const result = await apiFetch<{
      data: { success: true; text: string };
      status: true;
    }>(`${API_BASE_URL}/m/att`, {
      method: "POST",
      body: JSON.stringify({ file: cleanBase64 }),
    });

    return result.data?.text || "";
  } catch (error) {
    // console.log(JSON.stringify(error))
    console.error("Transcription error:", (error as Error)?.message);
    throw error;
  }
}
