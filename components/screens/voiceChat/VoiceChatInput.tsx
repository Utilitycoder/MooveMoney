import { voiceChatInputStyles } from "@/styles/voiceChat";
import { VoiceChatInputProps } from "@/types/voiceChat";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AIProcessingAnimation } from "./input/AIProcessingAnimation";
import { IdleState } from "./input/IdleState";
import { ListeningRow } from "./input/ListeningRow";
import { RecordingRow } from "./input/RecordingRow";
import { useVoiceInputAnimations } from "./input/useVoiceInputAnimations";

const VoiceChatInput: React.FC<VoiceChatInputProps> = ({
  state,
  isRecording,
  isInConversation,
  recordingDuration,
  onStartConversation,
  onStopRecording,
  onEndConversation,
  animations,
}) => {
  const {
    ring1Style,
    ring2Style,
    buttonAnimatedStyle,
    listeningStyle,
    handlePressIn,
    handlePressOut,
  } = useVoiceInputAnimations({
    isRecording,
    state,
    micScale: animations.micScale,
  });

  // Processing / Responding state
  if (state === "processing" || state === "responding") {
    return (
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={voiceChatInputStyles.container}
      >
        <AIProcessingAnimation />
      </Animated.View>
    );
  }

  // Listening state (waiting for next input in conversation)
  if (state === "listening" && isInConversation && !isRecording) {
    return (
      <ListeningRow
        onEndConversation={onEndConversation}
        listeningStyle={listeningStyle}
      />
    );
  }

  // Recording state (in conversation)
  if (isRecording && isInConversation) {
    return (
      <RecordingRow
        recordingDuration={recordingDuration}
        onStopRecording={onStopRecording}
        onEndConversation={onEndConversation}
        audioLevel={animations.audioLevel}
        ring1Style={ring1Style}
        ring2Style={ring2Style}
        buttonAnimatedStyle={buttonAnimatedStyle}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />
    );
  }

  // Idle state - start conversation
  return (
    <IdleState
      onStartConversation={onStartConversation}
      buttonAnimatedStyle={buttonAnimatedStyle}
      handlePressIn={handlePressIn}
      handlePressOut={handlePressOut}
    />
  );
};

export default VoiceChatInput;
