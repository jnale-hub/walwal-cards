import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SetupInputRowProps {
  name: string;
  maxNameLength: number;
  onChangeName: (value: string) => void;
  onAddPlayer: () => void;
}

export const SetupInputRow: React.FC<SetupInputRowProps> = ({
  name,
  maxNameLength,
  onChangeName,
  onAddPlayer,
}) => {
  const isDisabled = name.trim().length === 0;

  return (
    <View className="flex-row mb-4">
      <TextInput
        className="text-textMain border-border font-bodyBold flex-1 bg-white h-[60px] rounded-2xl px-5 text-xl border-4 mr-3"
        placeholder="Enter Name"
        placeholderTextColor="rgba(24, 24, 27, 0.4)"
        value={name}
        onChangeText={onChangeName}
        onSubmitEditing={onAddPlayer}
        returnKeyType="done"
        maxLength={maxNameLength}
        autoCorrect={false}
        accessibilityLabel="Player name"
        accessibilityHint="Type a player name, then use Add Player"
      />
      <TouchableOpacity
        style={{
          opacity: isDisabled ? 0.5 : 1,
        }}
        className="bg-textMain border-border w-[60px] h-[60px] rounded-2xl items-center justify-center border-4"
        onPress={onAddPlayer}
        activeOpacity={0.8}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel="Add player"
        accessibilityHint="Adds the typed name to the player list"
        accessibilityState={{ disabled: isDisabled }}
      >
        <Text className="font-bold color-white text-3xl mt-[-4px]">+</Text>
      </TouchableOpacity>
    </View>
  );
};
