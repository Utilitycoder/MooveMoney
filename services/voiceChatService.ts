import { AIResponse } from "@/types/chat";
import { VoiceChatConfig } from "@/types/voiceChat";

// Default configuration - replace with your actual API endpoints
const defaultConfig: VoiceChatConfig = {
  transcriptionEndpoint: "https://api.example.com/transcribe",
  chatEndpoint: "https://api.example.com/chat",
  apiKey: "", // Set via environment or config
};

let config = { ...defaultConfig };

/**
 * Configure the voice chat service with your API endpoints
 */
export function configureVoiceChatService(newConfig: Partial<VoiceChatConfig>) {
  config = { ...config, ...newConfig };
}

/**
 * Transcribe audio file to text using speech-to-text API
 */
export async function transcribeAudio(audioUri: string): Promise<string> {
  try {
    // Create form data with the audio file
    const formData = new FormData();

    // Extract file extension from URI
    const fileExtension = audioUri.split(".").pop() || "m4a";
    const mimeType = getMimeType(fileExtension);

    formData.append("file", {
      uri: audioUri,
      type: mimeType,
      name: `recording.${fileExtension}`,
    } as unknown as Blob);

    formData.append("model", "whisper-1"); // For OpenAI Whisper API

    const response = await fetch(config.transcriptionEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        // Don't set Content-Type - let fetch handle multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Transcription failed: ${error}`);
    }

    const result = await response.json();
    return result.text || result.transcription || "";
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
}

/**
 * Send transcribed text to chat API and get AI response
 */
export async function getChatResponse(
  message: string,
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
): Promise<AIResponse> {
  try {
    const response = await fetch(config.chatEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        message,
        history: conversationHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Chat API failed: ${error}`);
    }

    const result = await response.json();
    return {
      content: result.content || result.message || result.response,
      isSendIntent: result.isSendIntent,
      transaction: result.transaction,
    };
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
}

/**
 * Combined function: transcribe audio and get AI response
 */
export async function processVoiceMessage(
  audioUri: string,
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
): Promise<{
  transcription: string;
  aiResponse: AIResponse;
}> {
  // Step 1: Transcribe the audio
  const transcription = await transcribeAudio(audioUri);

  if (!transcription.trim()) {
    throw new Error("No speech detected in the recording");
  }

  // Step 2: Get AI response for the transcribed text
  const aiResponse = await getChatResponse(transcription, conversationHistory);

  return {
    transcription,
    aiResponse,
  };
}

/**
 * Helper function to get MIME type from file extension
 */
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    m4a: "audio/m4a",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    webm: "audio/webm",
    ogg: "audio/ogg",
    aac: "audio/aac",
    flac: "audio/flac",
  };
  return mimeTypes[extension.toLowerCase()] || "audio/m4a";
}

// Mock implementations for development/testing
export const mockService = {
  /**
   * Mock transcription - returns random sample transcription
   */
  async transcribeAudio(_audioUri: string): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockTranscriptions = [
      "Send 10 MOVE to alice.move",
      "What is my current balance?",
      "Show me my recent transactions",
      "Swap 50 USDC to ETH",
      "Send 25 USDT to 0x1234567890abcdef",
    ];

    return mockTranscriptions[
      Math.floor(Math.random() * mockTranscriptions.length)
    ];
  },

  /**
   * Mock chat response - parses intent from message
   */
  async getChatResponse(message: string): Promise<AIResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Import and use the existing mock function
    const { getAIResponse } = await import("@/data/chat");
    return getAIResponse(message);
  },

  /**
   * Mock combined processing
   */
  async processVoiceMessage(
    audioUri: string,
    conversationHistory?: { role: "user" | "assistant"; content: string }[]
  ): Promise<{
    transcription: string;
    aiResponse: AIResponse;
  }> {
    const transcription = await this.transcribeAudio(audioUri);
    const aiResponse = await this.getChatResponse(transcription);

    return { transcription, aiResponse };
  },
};
