import React from "react";
import { Pressable, Text, View } from "react-native";

interface LibraryEditionCardProps {
  icon: string;
  name: string;
  description: string;
  color: string;
  cardCount: number;
  isSelected: boolean;
  onPress: () => void;
}

export const LibraryEditionCard: React.FC<LibraryEditionCardProps> = ({
  icon,
  name,
  description,
  color,
  cardCount,
  isSelected,
  onPress,
}) => {
  return (
    <View className="w-full relative justify-center">
      <View className="absolute top-0.5 left-0.5 right-[-2px] bottom-[-2px] bg-black rounded-[24px]" />

      <Pressable
        onPress={onPress}
        className="w-full rounded-[24px] border-[4px] border-black p-5 flex-col z-10 press-motion"
        style={{
          backgroundColor: color,
        }}
      >
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-5xl">{icon}</Text>

          {/* Selection Indicator */}
          <View className="flex-row gap-x-2 items-center">
            <View className="bg-black/20 px-3 py-1 rounded-full items-center justify-center border-0 border-white/20">
              <Text className="text-black font-logo text-sm leading-5 uppercase">
                {cardCount} Cards
              </Text>
            </View>
            <View
              className={`w-9 h-9 rounded-full border-4 border-black items-center justify-center ${
                isSelected ? "bg-black" : "bg-white/50"
              }`}
            >
              {isSelected && (
                <Text className="text-white font-bodyBold text-lg mt-[-2px]">
                  ✓
                </Text>
              )}
            </View>
          </View>
        </View>

        <Text className="font-logo text-3xl text-black uppercase tracking-tighter mt-1">
          {name}
        </Text>

        <Text className="font-body text-black text-base opacity-90 mt-2">
          {description}
        </Text>
      </Pressable>
    </View>
  );
};
