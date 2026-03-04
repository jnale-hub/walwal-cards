import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface GameButtonProps {
  onPress: () => void;
  text: string;
  variant?: "primary" | "secondary";
  className?: string; // Support for parent NativeWind classes
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({
  onPress,
  text,
  variant = "primary",
  className = "",
  style,
  textStyle,
  disabled,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      className={`
        py-4 px-10 rounded-full border-[6px] items-center justify-center
        ${isSecondary ? "bg-[#18181b] border-white" : "bg-white border-[#18181b]"}
        ${disabled ? "opacity-50" : "opacity-100"}
        ${className}
      `}
      style={style}
    >
      <Text
        className={`font-bodyBold text-md sm:text-lg uppercase ${isSecondary ? "text-white" : "text-[#18181b]"}`}
        style={textStyle}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
