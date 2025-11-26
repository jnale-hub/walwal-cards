import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { THEME } from "../constants/theme";

interface GameButtonProps {
  onPress: () => void;
  text: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  onPress, 
  text, 
  variant = 'primary',
  style, 
  textStyle 
}) => {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.baseButton, 
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text 
        style={[
          styles.baseText, 
          isSecondary ? styles.secondaryText : styles.primaryText,
          textStyle
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 999,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: THEME.cardBg, // White
    borderColor: THEME.border,     // Black
  },
  secondaryButton: {
    backgroundColor: THEME.textMain, // Black
    borderColor: THEME.cardBg,       // White (to pop against background)
  },
  baseText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  primaryText: {
    color: THEME.textMain,
  },
  secondaryText: {
    color: THEME.cardBg,
  },
});
