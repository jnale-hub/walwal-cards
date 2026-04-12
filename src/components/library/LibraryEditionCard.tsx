import React from "react";
import { Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface LibraryEditionCardProps {
  icon: string;
  name: string;
  description: string;
  bgClass: string;
  cardCount: number;
  isSelected: boolean;
  isLocked?: boolean;
  onPress: () => void;
}

export const LibraryEditionCard: React.FC<LibraryEditionCardProps> = ({
  icon,
  name,
  description,
  bgClass,
  cardCount,
  isSelected,
  isLocked = false,
  onPress,
}) => {
  return (
    <View className="relative flex w-full xs:w-1/2 p-2 sm:p-3 h-auto">
      <View className="relative flex-1">
        <Pressable
          onPress={onPress}
          className={`w-full h-full rounded-2xl border-[4px] border-neutral-950 p-4 xs:p-3 sm:p-4 flex-col gap-2 z-10 press-motion bg-neutral-50`}
          accessibilityRole="button"
          accessibilityLabel={`${name} edition`}
          accessibilityHint={
            isLocked ? "Login required to unlock this deck" : "Select this deck"
          }
          accessibilityState={{ selected: isSelected }}
        >
          <View className="flex-row justify-between items-start">
            <Text className="sm:text-[4rem] text-5xl leading-normal overflow-visible">{icon}</Text>

            {isLocked ? (
              <View className="bg-neutral-950 px-2 py-1 rounded-md items-center justify-center">
                <Text className="text-neutral-50 font-logo text-xs leading-4 uppercase tracking-wider">
                  Unlock
                </Text>
              </View>
            ) : (
              <View
                className={`w-8 h-8 rounded-full border-[3px] border-neutral-950 items-center justify-center ${
                  isSelected ? "bg-neutral-950" : "bg-neutral-50/50"
                }`}
              >
                {isSelected && (
                  <Text className="text-neutral-50 font-bodyBold text-base">
                    <FontAwesome5 name="check" size={16} color="white" />
                  </Text>
                )}
              </View>
            )}
          </View>

          <View className="gap-y-1 py-2">
            <View className="flex-wrap">
              <View
                className={`${bgClass} px-2 py-1 border-2 border-neutral-950 shadow-card-sm mb-2`}
              >
                <Text className="font-logo text-xl sm:text-2xl text-neutral-950 uppercase tracking-normal leading-tight text-wrap">
                  {name}
                </Text>
              </View>
            </View>
            <Text className="font-body text-neutral-950 opacity-90 leading-snug mb-auto line-clamp-5 sm:text-lg">
              {description}
            </Text>
          </View>
          <View className="bg-neutral-950/10 px-2 py-1 rounded-md self-start mt-auto">
            <Text className="text-neutral-950 font-logo text-xs leading-4 uppercase">
              {cardCount} Cards
            </Text>
          </View>
        </Pressable>
        <View className="absolute top-1 left-1 right-[-2px] bottom-[-2px] bg-neutral-950 rounded-2xl" />
      </View>
    </View>
  );
};
