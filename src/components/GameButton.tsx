import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface GameButtonProps extends Omit<
  TouchableOpacityProps,
  "style" | "onPress"
> {
  onPress: NonNullable<TouchableOpacityProps["onPress"]>;
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
  ...touchableProps
}) => {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      {...touchableProps}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityState={{ disabled: !!disabled }}
      className={joinClasses(
        "py-2 px-8 rounded-full border-[6px] items-center justify-center",
        isSecondary ? "bg-[#18181b] border-white" : "bg-white border-[#18181b]",
        disabled ? "opacity-50" : "opacity-100",
        className,
      )}
      style={style}
    >
      <Text
        className={joinClasses(
          "uppercase",
          isSecondary ? "text-white" : "text-[#18181b]",
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
