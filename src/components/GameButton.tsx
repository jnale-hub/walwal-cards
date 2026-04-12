import React from "react";
import {
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface GameButtonProps {
  onPress: () => void;
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const joinClasses = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

const GameButtonBase: React.FC<GameButtonProps> = ({
  onPress,
  text,
  variant = "primary",
  className = "",
  textClassName = "",
  style,
  textStyle,
  disabled,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      className={joinClasses(
        "py-2 px-8 rounded-full border-[4px] items-center justify-center",
        isSecondary ? "bg-textMain border-white" : "bg-white border-textMain",
        disabled ? "opacity-50" : "opacity-100",
        className,
      )}
      style={style}
    >
      <Text
        className={joinClasses(
          "uppercase",
          isSecondary ? "text-white" : "text-textMain",
          textClassName,
        )}
        style={textStyle}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const GameButton = React.memo(GameButtonBase);
GameButton.displayName = "GameButton";
