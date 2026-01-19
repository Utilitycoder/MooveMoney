import { ThemeColors } from "@/constants/theme";
import { transactionDetailsStyles } from "@/styles/transactionDetails";
import { TransactionInfoSectionProps } from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const TransactionInfoSection: React.FC<TransactionInfoSectionProps> = ({
  transaction,
  typeInfo,
  statusIconColor,
  onCopy,
}) => {
  return (
    <View style={transactionDetailsStyles.infoSection}>
      <Text style={transactionDetailsStyles.sectionTitle}>
        Transaction Info
      </Text>

      {/* Recipient/Sender Card */}
      {(transaction.recipient || transaction.recipientName) && (
        <View style={transactionDetailsStyles.infoCard}>
          <View style={transactionDetailsStyles.infoCardHeader}>
            <View
              style={[
                transactionDetailsStyles.infoIconContainer,
                { backgroundColor: `${statusIconColor}15` },
              ]}
            >
              <Ionicons
                name={typeInfo.directionIcon}
                size={18}
                color={statusIconColor}
              />
            </View>
            <View style={transactionDetailsStyles.infoCardHeaderText}>
              <Text style={transactionDetailsStyles.infoCardLabel}>
                {typeInfo.directionLabel}
              </Text>
              {transaction.recipientName && (
                <Text style={transactionDetailsStyles.infoCardValue}>
                  {transaction.recipientName}
                </Text>
              )}
            </View>
          </View>
          {transaction.recipient && (
            <View style={transactionDetailsStyles.addressContainer}>
              <Text style={transactionDetailsStyles.addressText} selectable>
                {transaction.recipient}
              </Text>
              <Pressable
                onPress={() => onCopy(transaction.recipient!, "Address")}
                style={transactionDetailsStyles.copyButtonSmall}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name="copy-outline"
                  size={16}
                  color={ThemeColors.primary}
                />
              </Pressable>
            </View>
          )}
        </View>
      )}

      {/* Network & Fee Row */}
      {transaction?.fee && (
        <View style={[transactionDetailsStyles.infoCard]}>
          <View style={transactionDetailsStyles.infoCardHeader}>
            <View
              style={[
                transactionDetailsStyles.infoIconContainer,
                { backgroundColor: `${ThemeColors.primaryDark}15` },
              ]}
            >
              <Ionicons
                name="flash-outline"
                size={16}
                color={ThemeColors.primaryDark}
              />
            </View>
            <View style={transactionDetailsStyles.infoCardHeaderText}>
              <Text style={transactionDetailsStyles.infoCardLabel}>Fee</Text>
              <Text style={transactionDetailsStyles.infoCardValue}>
                {transaction.fee}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Total Card */}
      {transaction.total && (
        <View style={[transactionDetailsStyles.infoCard]}>
          <View style={transactionDetailsStyles.infoCardHeader}>
            <View
              style={[
                transactionDetailsStyles.infoIconContainer,
                { backgroundColor: `${statusIconColor}15` },
              ]}
            >
              <Ionicons
                name="calculator-outline"
                size={18}
                color={statusIconColor}
              />
            </View>
            <View style={transactionDetailsStyles.infoCardHeaderText}>
              <Text style={transactionDetailsStyles.infoCardLabel}>Total</Text>
              <Text
                style={[
                  transactionDetailsStyles.infoCardValue,
                  transactionDetailsStyles.totalValue,
                ]}
              >
                {transaction.total}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
