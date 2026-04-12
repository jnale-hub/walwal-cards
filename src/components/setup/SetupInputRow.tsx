import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
        className="text-neutral-950 border-neutral-950 font-bodyBold flex-1 bg-neutral-50 h-[60px] rounded-2xl px-5 text-xl border-4 mr-3"
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
      <View className="relative w-[60px] h-[60px]">
        <View
          className={`absolute top-0.5 left-0.5 right-[-2px] bottom-[-2px] bg-neutral-950 rounded-2xl ${isDisabled ? "opacity-30" : "opacity-100"}`}
        />

        <Pressable
          style={{
            opacity: isDisabled ? 0.5 : 1,
          }}
          className="w-full h-full bg-neutral-950 border-neutral-950 rounded-2xl items-center justify-center border-4 press-motion"
          onPress={onAddPlayer}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityLabel="Add player"
          accessibilityHint="Adds the typed name to the player list"
          accessibilityState={{ disabled: isDisabled }}
        >
          <Text className="font-bold color-neutral-50 text-3xl mt-[-4px]">
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
