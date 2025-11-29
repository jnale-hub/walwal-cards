import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { SHARED_STYLES } from "../constants/styles";
import { THEME } from "../constants/theme";
import { GameButton } from "./GameButton";

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
        <View style={[SHARED_STYLES.cardBase, styles.modalContainer]}>
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
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    // Overriding justifyContent from cardBase if needed, though cardBase has center which is fine.
    // cardBase has elevation 0 for android, but modal might want it.
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
