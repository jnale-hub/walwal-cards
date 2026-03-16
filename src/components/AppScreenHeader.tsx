import React from "react";
import { Insets, Text, TouchableOpacity, View } from "react-native";

interface AppScreenHeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  backHint?: string;
  backHitSlop?: Insets;
  rightSlot?: React.ReactNode;
}

export const AppScreenHeader: React.FC<AppScreenHeaderProps> = ({
  title,
  onBack,
  backLabel = "Go back",
  backHint,
  backHitSlop,
  rightSlot,
}) => {
  return (
    <View className="flex-row items-center justify-between px-6 mb-4 h-[50px] w-full max-w-[600px] self-center">
      <TouchableOpacity
        className="w-11 h-11 justify-center items-start"
        onPress={onBack}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel={backLabel}
        accessibilityHint={backHint}
        hitSlop={backHitSlop}
      >
        <Text className="text-textMain font-logo text-[36px] leading-[40px]">
          ←
        </Text>
      </TouchableOpacity>

      <Text className="text-textMain font-logo text-3xl text-center flex-1">
        {title}
      </Text>

      {rightSlot ?? <View className="w-11" />}
    </View>
  );
};
