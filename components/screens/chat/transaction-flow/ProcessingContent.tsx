import { ThemeColors } from "@/constants/theme";
import { transactionFlowModalStyles } from "@/styles/chat";
import { ProcessingContentProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import {
  STAGE_DETAILS,
  STAGE_MESSAGES,
} from "../../../../constants/transactionFlowModal";

const ProcessingContent: React.FC<ProcessingContentProps> = ({
  transaction,
  isCompleted,
  spinnerStyle,
  processingStage,
  currentStageIndex,
  getRecipientDisplay,
  showProcessingContent,
}) => {
  if (!showProcessingContent) return null;

  return (
    <Animated.View
      key="processing"
      entering={SlideInRight.duration(250)}
      exiting={SlideOutLeft.duration(200)}
      style={transactionFlowModalStyles.contentContainer}
    >
      <View style={transactionFlowModalStyles.processingContent}>
        {/* Spinner */}
        <View style={transactionFlowModalStyles.spinnerContainer}>
          {isCompleted ? (
            <View style={transactionFlowModalStyles.completedIcon}>
              <Ionicons
                name="checkmark-circle"
                size={56}
                color={ThemeColors.success}
              />
            </View>
          ) : (
            <Animated.View
              style={[transactionFlowModalStyles.spinner, spinnerStyle]}
            >
              <View style={transactionFlowModalStyles.spinnerInner}>
                <Ionicons name="sync" size={28} color={ThemeColors.primary} />
              </View>
            </Animated.View>
          )}
        </View>

        {/* Status */}
        <Text style={transactionFlowModalStyles.statusText}>
          {STAGE_MESSAGES[processingStage]}
        </Text>

        {/* Transaction Info */}
        <View style={transactionFlowModalStyles.infoCard}>
          <Text style={transactionFlowModalStyles.infoAmount}>
            {transaction?.amount || "0"} MOVE
          </Text>
          <Text style={transactionFlowModalStyles.infoRecipient}>
            to {getRecipientDisplay()}
          </Text>
        </View>

        {/* Progress Steps */}
        <View style={transactionFlowModalStyles.stepsContainer}>
          {STAGE_DETAILS.map((step, idx) => {
            const isActive = idx <= currentStageIndex;
            const isDone = idx < currentStageIndex;
            return (
              <React.Fragment key={step.key}>
                <View style={transactionFlowModalStyles.stepItem}>
                  <View
                    style={[
                      transactionFlowModalStyles.stepDot,
                      isActive && transactionFlowModalStyles.stepDotActive,
                      isDone && transactionFlowModalStyles.stepDotDone,
                    ]}
                  >
                    {isDone ? (
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    ) : (
                      <Ionicons
                        name={step.icon as any}
                        size={14}
                        color={
                          isActive ? ThemeColors.primary : ThemeColors.textMuted
                        }
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      transactionFlowModalStyles.stepLabel,
                      isActive && transactionFlowModalStyles.stepLabelActive,
                    ]}
                  >
                    {step.label}
                  </Text>
                </View>
                {idx < STAGE_DETAILS.length - 1 && (
                  <View
                    style={[
                      transactionFlowModalStyles.stepLine,
                      isDone && transactionFlowModalStyles.stepLineActive,
                    ]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default ProcessingContent;
