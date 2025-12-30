import PrimaryButton from "@/components/atoms/PrimaryButton";
import { ThemeColors } from "@/constants/theme";
import { transactionFlowModalStyles } from "@/styles/chat";
import { ResultContentProps } from "@/types/chat";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

const ResultContent: React.FC<ResultContentProps> = ({
  transaction,
  result,
  isSuccess,
  showSavePrompt,
  contactName,
  resultIconStyle,
  onViewDetails,
  onClose,
  onTryAgain,
  onSaveAddress,
  setShowSavePrompt,
  setContactName,
  getRecipientDisplay,
  showResultContent,
}) => {
  if (!showResultContent) return null;

  return (
    <Animated.View
      key="result"
      entering={SlideInRight.duration(250)}
      exiting={SlideOutLeft.duration(200)}
      style={transactionFlowModalStyles.contentContainer}
    >
      <View style={transactionFlowModalStyles.resultContent}>
        {/* Icon */}
        <Animated.View
          style={[
            transactionFlowModalStyles.resultIconContainer,
            isSuccess
              ? transactionFlowModalStyles.resultIconSuccess
              : transactionFlowModalStyles.resultIconError,
            resultIconStyle,
          ]}
        >
          <Ionicons
            name={isSuccess ? "checkmark-circle" : "alert-circle"}
            size={48}
            color={isSuccess ? ThemeColors.success : ThemeColors.error}
          />
        </Animated.View>

        <Text style={transactionFlowModalStyles.resultTitle}>
          {isSuccess ? "Transaction Sent!" : "Transaction Failed"}
        </Text>

        {isSuccess ? (
          <>
            <Text style={transactionFlowModalStyles.resultMessage}>
              {transaction?.amount || "0"} MOVE sent to {getRecipientDisplay()}
            </Text>

            {result?.transactionId && (
              <TouchableOpacity
                style={transactionFlowModalStyles.txIdRow}
                onPress={onViewDetails}
              >
                <Text style={transactionFlowModalStyles.txIdLabel}>TX ID</Text>
                <Text style={transactionFlowModalStyles.txId} numberOfLines={1}>
                  {result.transactionId}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={ThemeColors.textMuted}
                />
              </TouchableOpacity>
            )}

            {/* Save Address Prompt */}
            {/* {showSavePrompt && (
              <View style={transactionFlowModalStyles.saveCard}>
                <View style={transactionFlowModalStyles.saveHeader}>
                  <Ionicons
                    name="person-add"
                    size={18}
                    color={ThemeColors.primary}
                  />
                  <Text style={transactionFlowModalStyles.saveTitle}>
                    Save this address?
                  </Text>
                </View>
                <TextInput
                  style={transactionFlowModalStyles.saveInput}
                  placeholder="Contact name"
                  placeholderTextColor={ThemeColors.textMuted}
                  value={contactName}
                  onChangeText={setContactName}
                />
                <View style={transactionFlowModalStyles.saveActions}>
                  <TouchableOpacity
                    style={transactionFlowModalStyles.saveSkip}
                    onPress={() => setShowSavePrompt(false)}
                  >
                    <Text style={transactionFlowModalStyles.saveSkipText}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      transactionFlowModalStyles.saveSaveBtn,
                      !contactName.trim() && { opacity: 0.5 },
                    ]}
                    onPress={onSaveAddress}
                    disabled={!contactName.trim()}
                  >
                    <Text style={transactionFlowModalStyles.saveSaveText}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )} */}
          </>
        ) : (
          <>
            <Text style={transactionFlowModalStyles.errorMessage}>
              {result?.errorMessage || "Something went wrong"}
            </Text>
            <View style={transactionFlowModalStyles.safeCard}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color={ThemeColors.success}
              />
              <Text style={transactionFlowModalStyles.safeText}>
                Your funds are safe
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Actions */}
      <View style={transactionFlowModalStyles.actions}>
        {isSuccess ? (
          <>
            <TouchableOpacity
              style={transactionFlowModalStyles.cancelBtn}
              onPress={onViewDetails}
            >
              <Text style={transactionFlowModalStyles.cancelText}>
                View Details
              </Text>
            </TouchableOpacity>
            <PrimaryButton
              title="Done"
              onPress={onClose}
              icon="checkmark"
              variant="dark"
            />
          </>
        ) : (
          <>
            <PrimaryButton
              title="Try Again"
              onPress={onTryAgain}
              icon="refresh"
              variant="dark"
            />
            <TouchableOpacity
              style={transactionFlowModalStyles.cancelBtn}
              onPress={onClose}
            >
              <Text style={transactionFlowModalStyles.cancelText}>Close</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default ResultContent;
