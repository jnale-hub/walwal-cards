import React from "react";
import { Pressable, Text, View } from "react-native";

interface SetupControlsRowProps {
  isRandomTurn: boolean;
  playerCount: number;
  maxPlayers: number;
  onToggleRandomTurn: () => void;
}

export const SetupControlsRow: React.FC<SetupControlsRowProps> = ({
  isRandomTurn,
  playerCount,
  maxPlayers,
  onToggleRandomTurn,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-4 pl-1">
      <Pressable
        className="flex-row items-center press-motion"
        onPress={onToggleRandomTurn}
        accessibilityRole="switch"
        accessibilityLabel="Randomize turns"
        accessibilityHint="When enabled, player turns are shuffled fairly"
        accessibilityState={{ checked: isRandomTurn }}
      >
        <View
          className={`border-border w-6 h-6 border-4 rounded-md mr-2 items-center justify-center ${isRandomTurn ? "bg-textMain" : "bg-white"}`}
        >
          {isRandomTurn && (
            <Text className="text-white font-bold text-xs">✓</Text>
          )}
        </View>
        <Text className="text-textMain text-sm opacity-80">
          Randomize Turns
        </Text>
      </Pressable>

      <Text className="text-textMain opacity-60 text-sm mr-1">
        {playerCount} / {maxPlayers} Players
      </Text>
    </View>
  );
};
