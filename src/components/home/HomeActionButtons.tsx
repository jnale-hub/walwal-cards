import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface HomeActionButtonsProps {
  onQuickPlay: () => void;
  onOpenLibrary: () => void;
  onOpenSetup: () => void;
}

export const HomeActionButtons: React.FC<HomeActionButtonsProps> = ({
  onQuickPlay,
  onOpenLibrary,
  onOpenSetup,
}) => {
  const shadowClassName =
    "absolute top-0.5 left-0.5 right-[-2px] bottom-[-2px] bg-black rounded-[24px]";

  return (
    <View className="w-full max-w-[400px] z-20 shrink-0 mt-6 gap-y-4">
      <View className="w-full relative h-[72px]">
        <View className={shadowClassName} />
        <Pressable
          onPress={onQuickPlay}
          accessibilityRole="button"
          accessibilityLabel="Quick Play"
          accessibilityHint="Start a game immediately"
          className="h-full flex-row bg-[#FDE047] border-[4px] border-black rounded-[24px] items-center justify-center pt-2 press-motion"
        >
          <FontAwesome5
            name="play"
            size={24}
            color="black"
            style={{ marginBottom: 4 }}
          />
          <Text className="font-logo text-4xl text-black uppercase tracking-tighter ml-3">
            QUICK PLAY
          </Text>
        </Pressable>
      </View>

      <View className="flex-row w-full justify-between gap-x-4">
        <View className="flex-1 relative h-[64px]">
          <View className={shadowClassName} />
          <Pressable
            onPress={onOpenLibrary}
            accessibilityRole="button"
            accessibilityLabel="Library"
            accessibilityHint="Choose a card edition"
            className="h-full flex-row bg-[#A855F7] border-[4px] border-black rounded-[24px] items-center justify-center pt-1 press-motion"
          >
            <FontAwesome5
              name="layer-group"
              size={20}
              color="black"
              style={{ marginBottom: 2 }}
            />
            <Text className="font-logo text-[28px] text-black tracking-tighter uppercase ml-2">
              LIBRARY
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 relative h-[64px]">
          <View className={shadowClassName} />
          <Pressable
            onPress={onOpenSetup}
            accessibilityRole="button"
            accessibilityLabel="Add Players"
            accessibilityHint="Open player setup before starting the game"
            className="h-full flex-row bg-[#F97316] border-[4px] border-black rounded-[24px] items-center justify-center pt-1 press-motion"
          >
            <FontAwesome5
              name="users"
              size={20}
              color="black"
              style={{ marginBottom: 2 }}
            />
            <Text className="font-logo text-[28px] text-black tracking-tighter uppercase ml-2">
              PLAYERS
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
