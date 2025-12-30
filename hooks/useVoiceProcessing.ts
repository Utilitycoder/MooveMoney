import { getAudioText, getChatResponse } from "@/services/chatService";
import { mockService } from "@/services/voiceChatService";
import { VoiceChatMessage } from "@/types/voiceChat";
import { File as ExpoFile } from "expo-file-system";
import { useCallback } from "react";

interface UseVoiceProcessorProps {
  useMockService?: boolean;
}

export const useVoiceProcessor = ({
  useMockService = true,
}: UseVoiceProcessorProps) => {
  const transcribe = useCallback(
    async (uri: string): Promise<{ transcription: string; base64Audio?: string }> => {
      let base64Audio = undefined;
      try {
        const file = new ExpoFile(uri);
        base64Audio = await file.base64();
      } catch (readError) {
        console.error("Failed to read audio file:", readError);
      }

      if (useMockService) {
        const transcription = await mockService.transcribeAudio(uri);
        return { transcription, base64Audio };
      } else {
        if (!base64Audio) {
          throw new Error("No audio data available for transcription");
        }
        const transcription = await getAudioText(base64Audio);
        return { transcription, base64Audio };
      }
    },
    [useMockService]
  );

  const getAIResponse = useCallback(
    async (text: string, currentMessages: VoiceChatMessage[]) => {
      if (useMockService) {
        return await mockService.getChatResponse(text);
      } else {
        return await getChatResponse(
          text,
          currentMessages.map((m) => ({ role: m.role, content: m.content }))
        );
      }
    },
    [useMockService]
  );

  const processAudio = useCallback(
    async (uri: string, currentMessages: VoiceChatMessage[]) => {
      // 1. Transcribe
      const { transcription, base64Audio } = await transcribe(uri);

      // 2. Chat
      const aiResponse = await getAIResponse(transcription, currentMessages);

      // Create user message
      const userMessage: VoiceChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: transcription,
        timestamp: new Date(),
        audioUri: uri,
        audioBase64: base64Audio,
        isVoiceInput: true,
      };

      // Create AI response message
      const aiMessage: VoiceChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
      };

      return {
        userMessage,
        aiMessage,
        aiResponse,
      };
    },
    [transcribe, getAIResponse]
  );

  return { processAudio, transcribe, getAIResponse };
};
