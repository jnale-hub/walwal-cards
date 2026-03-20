import React from "react";
import { Insets, Pressable, Text, View } from "react-native";

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
    <View className="flex-row items-center px-6 h-[50px] w-full max-w-[600px] self-center">
      <View className="flex-1 items-start">
        <Pressable
          className="w-11 h-11 justify-center items-start press-motion"
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={backLabel}
          accessibilityHint={backHint}
          hitSlop={backHitSlop}
        >
          <Text className="text-textMain font-logo text-[36px] leading-[40px]">
            ←
          </Text>
        </Pressable>
      </View>

      <Text className="text-textMain font-logo text-3xl text-center absolute left-20 right-20">
        {title}
      </Text>

      <View className="flex-1 items-end">
        {rightSlot ?? <View className="w-11 h-11" />}
      </View>
    </View>
  );
};
