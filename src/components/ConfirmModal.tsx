import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { GameButton } from "./GameButton";
import { THEME } from "../constants/theme";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes, Exit",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <GameButton 
                onPress={onCancel} 
                text={cancelText} 
                variant="primary"
                style={styles.cancelButton}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <GameButton 
                onPress={onConfirm} 
                text={confirmText} 
                variant="secondary"
                style={styles.confirmButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: THEME.cardBg,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: THEME.border,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: THEME.textMain,
    textAlign: "center",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  message: {
    fontSize: 18,
    color: THEME.textMain,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 26,
    fontWeight: "500",
    opacity: 0.8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  cancelButton: {
    paddingHorizontal: 8,
    backgroundColor: 'transparent', 
  },
  confirmButton: {
    paddingHorizontal: 8,
    borderColor: THEME.border,
  }
});
