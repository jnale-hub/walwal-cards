import React from "react";
import { Modal, Text, View } from "react-native";
import { GameButton } from "./GameButton";

export const ConfirmModal: React.FC<any> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Exit",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 bg-neutral-950/70 justify-center items-center px-4"
        accessibilityViewIsModal
        importantForAccessibility="yes"
      >
        <View className="card-base w-full max-w-lg items-center shadow-200">
          <Text
            accessibilityRole="header"
            className="text-neutral-950 font-logo text-3xl text-center mb-2 uppercase tracking-tighter"
          >
            {title}
          </Text>

          <Text className="text-neutral-950 font-body text-base text-center mb-8 opacity-70 leading-5 text-pretty">
            {message}
          </Text>

          <View className="flex-row w-full gap-x-3">
            <GameButton
              onPress={onCancel}
              text={cancelText}
              className="flex-1 border-transparent px-2"
              textClassName="font-bodyBold text-md sm:text-lg"
              accessibilityLabel={cancelText}
              accessibilityHint="Closes this dialog without applying changes"
            />
            <GameButton
              onPress={onConfirm}
              text={confirmText}
              variant="secondary"
              className="flex-1 px-2"
              textClassName="font-bodyBold text-md sm:text-lg"
              accessibilityLabel={confirmText}
              accessibilityHint="Confirms this action"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
