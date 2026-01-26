import React from "react";
import { Modal, Text, View } from "react-native";
import { FONT_FAMILY } from "../constants/fonts";
import { SHARED_STYLES } from "../constants/styles";
import { THEME } from "../constants/theme";
import { GameButton } from "./GameButton";

export const ConfirmModal: React.FC<any> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes, Exit",
  cancelText = "Cancel",
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/70 justify-center items-center px-4">
        <View 
          style={SHARED_STYLES.cardBase} 
          className="w-full max-w-lg items-center shadow-200"
        >
          <Text 
            style={{ fontFamily: FONT_FAMILY.logo, color: THEME.textMain }}
            className="text-3xl text-center mb-2 uppercase tracking-tighter"
          >
            {title}
          </Text>
          
          <Text 
            style={{ fontFamily: FONT_FAMILY.body, color: THEME.textMain }}
            className="text-base text-center mb-8 opacity-70 leading-5 text-pretty"
          >
            {message}
          </Text>
          
          <View className="flex-row w-full gap-x-3">
            <GameButton 
              onPress={onCancel} 
              text={cancelText} 
              className="flex-1 border-transparent px-2"
            />
            <GameButton 
              onPress={onConfirm} 
              text={confirmText} 
              variant="secondary"
              className="flex-1 px-2"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
