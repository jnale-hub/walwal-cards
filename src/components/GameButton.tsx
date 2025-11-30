import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { FONT_FAMILY } from "../constants/fonts";
import { THEME } from "../constants/theme";

interface GameButtonProps {
  onPress: () => void;
  text: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  onPress, 
  text, 
  variant = 'primary',
  style, 
  textStyle,
  accessibilityLabel
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
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || text}
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
  },
  primaryButton: {
    backgroundColor: THEME.cardBg,
    borderColor: THEME.border,
  },
  secondaryButton: {
    backgroundColor: THEME.textMain,
    borderColor: THEME.cardBg,
  },
  baseText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bodyBold,
    textAlign: "center",
  },
  primaryText: {
    color: THEME.textMain,
  },
  secondaryText: {
    color: THEME.cardBg,
  },
});
