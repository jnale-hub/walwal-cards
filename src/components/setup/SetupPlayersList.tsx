import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SetupPlayersListProps {
  players: string[];
  onRemovePlayer: (index: number) => void;
}

export const SetupPlayersList: React.FC<SetupPlayersListProps> = ({
  players,
  onRemovePlayer,
}) => {
  return (
    <View className="bg-white/20 rounded-[24px] p-4 border-4 border-black/10 min-h-[150px]">
      {players.length === 0 ? (
        <Text className="text-textMain text-center text-lg opacity-50 mt-10">
          No players added yet.
        </Text>
      ) : (
        <View className="flex-row flex-wrap justify-center">
          {players.map((player, index) => (
            <TouchableOpacity
              key={`${player}-${index}`}
              className="border-border bg-white py-1.5 pl-4 pr-2 rounded-full border-[3px] flex-row items-center m-1.5 shadow-sm"
              onPress={() => onRemovePlayer(index)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${player}`}
              accessibilityHint="Removes this player from the list"
            >
              <Text className="text-textMain font-bodyBold text-lg mr-2">
                {player}
              </Text>
              <View className="w-5 h-5 bg-black/5 rounded-full items-center justify-center">
                <Text className="font-body text-textMain/50 text-xs mt-[-2px]">
                  ✕
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
