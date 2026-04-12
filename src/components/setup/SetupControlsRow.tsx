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
          className={`border-neutral-950 w-6 h-6 border-4 rounded-md mr-2 items-center justify-center ${isRandomTurn ? "bg-neutral-950" : "bg-neutral-50"}`}
        >
          {isRandomTurn && (
            <Text className="text-neutral-50 font-bold text-xs">✓</Text>
          )}
        </View>
        <Text className="text-neutral-950 text-sm opacity-80">
          Randomize Turns
        </Text>
      </Pressable>

      <Text className="text-neutral-950 opacity-60 text-sm mr-1">
        {playerCount} / {maxPlayers} Players
      </Text>
    </View>
  );
};
