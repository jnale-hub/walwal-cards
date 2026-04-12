import React from "react";
import { Pressable, Text, View } from "react-native";

interface SetupPlayersListProps {
  players: string[];
  onRemovePlayer: (index: number) => void;
}

export const SetupPlayersList: React.FC<SetupPlayersListProps> = ({
  players,
  onRemovePlayer,
}) => {
  return (
    <View className="bg-neutral-50/20 rounded-[24px] p-4 border-4 border-neutral-950/10 min-h-[150px]">
      {players.length === 0 ? (
        <Text className="text-neutral-950 text-center text-lg opacity-50 mt-10">
          No players added yet.
        </Text>
      ) : (
        <View className="flex-row flex-wrap justify-center">
          {players.map((player, index) => (
            <View key={`${player}-${index}`} className="relative m-1.5">
              <View className="absolute top-0.5 left-0.5 right-[-2px] bottom-[-2px] bg-neutral-950 rounded-full" />
              <Pressable
                className="border-neutral-950 bg-neutral-50 py-1.5 pl-4 pr-2 rounded-full border-[3px] flex-row items-center press-motion"
                onPress={() => onRemovePlayer(index)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${player}`}
                accessibilityHint="Removes this player from the list"
              >
                <Text className="text-neutral-950 font-bodyBold text-lg mr-2">
                  {player}
                </Text>
                <View className="w-5 h-5 bg-neutral-950/5 rounded-full items-center justify-center">
                  <Text className="font-body text-neutral-950/50 text-xs mt-[-2px]">
                    ✕
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
