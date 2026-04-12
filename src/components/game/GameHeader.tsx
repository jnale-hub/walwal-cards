import React from "react";
import { Pressable, Text, View } from "react-native";

interface GameHeaderProps {
  topInset: number;
  onExit: () => void;
  onOpenLibrary: () => void;
  editionLabel: string;
  editionIcon: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  topInset,
  onExit,
  onOpenLibrary,
  editionLabel,
  editionIcon,
}) => {
  return (
    <View
      style={{
        paddingTop: Math.max(topInset, 20),
      }}
      className="w-full px-6 flex-row justify-between items-center z-50 pb-2"
    >
      <Pressable
        className="w-10 h-10 items-center justify-center bg-neutral-950/20 rounded-full"
        onPress={onExit}
        accessibilityRole="button"
        accessibilityLabel="Exit game"
        accessibilityHint="Opens a confirmation dialog to end this game"
        hitSlop={20}
      >
        <Text className="text-neutral-50 text-sm font-bold">✕</Text>
      </Pressable>

      <Pressable
        className="bg-neutral-950/20 px-3 py-1 rounded-full items-center justify-center border-0 border-neutral-50/20"
        onPress={onOpenLibrary}
        accessibilityRole="button"
        accessibilityLabel="Open card library"
        accessibilityHint="Navigates to the card library"
        hitSlop={12}
      >
        <Text className="text-neutral-50 font-logo text-sm tracking-widest uppercase">
          {`${editionIcon} ${editionLabel} ${editionIcon}`}
        </Text>
      </Pressable>

      <View className="w-10 h-10" />
    </View>
  );
};
