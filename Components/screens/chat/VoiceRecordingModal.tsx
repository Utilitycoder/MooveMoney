import { ThemeColors } from "@/constants/theme";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { VoiceRecordingModalProps } from "@/types/chat";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PreviewContent from "./voice/PreviewContent";
import RecordingContent from "./voice/RecordingContent";
import VoiceRecordingFooter from "./voice/VoiceRecordingFooter";
import VoiceRecordingHeader from "./voice/VoiceRecordingHeader";

const VoiceRecordingModal: React.FC<VoiceRecordingModalProps> = ({
  visible,
  onClose,
  onTranscription,
}) => {
  const insets = useSafeAreaInsets();
  const { state, animations, handlers } = useVoiceRecording({
    visible,
    onClose,
    onTranscription,
  });

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
      onRequestClose={handlers.handleCancel}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <VoiceRecordingHeader
          mode={state.mode}
          onClose={handlers.handleCancel}
        />

        <View style={styles.content}>
          {state.mode === "recording" ? (
            <RecordingContent
              isRecording={state.isRecording}
              recordingDuration={state.recordingDuration}
              pulseAnim={animations.pulseAnim}
              glowAnim={animations.glowAnim}
              micScale={animations.micScale}
              audioLevel={animations.audioLevel}
            />
          ) : (
            <PreviewContent
              isPlaying={state.isPlaying}
              recordingDuration={state.recordingDuration}
              onPlayPause={handlers.handlePlayPause}
            />
          )}
        </View>

        <VoiceRecordingFooter
          mode={state.mode}
          paddingBottom={insets.bottom + 24}
          onCancel={handlers.handleCancel}
          onStopRecording={handlers.handleStopRecording}
          onReRecord={handlers.handleReRecord}
          onSend={handlers.handleSend}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});

export default VoiceRecordingModal;
