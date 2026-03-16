import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  return (
    <View className="w-full max-w-[400px] z-20 shrink-0 mt-6 gap-y-4">
      <View className="w-full relative h-[72px]">
        <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onQuickPlay}
          accessibilityRole="button"
          accessibilityLabel="Quick Play"
          accessibilityHint="Start a game immediately"
          className="flex-1 flex-row bg-[#FDE047] border-[4px] border-black rounded-[24px] items-center justify-center pt-2"
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
        </TouchableOpacity>
      </View>

      <View className="flex-row w-full justify-between gap-x-4">
        <View className="flex-1 relative h-[64px]">
          <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenLibrary}
            accessibilityRole="button"
            accessibilityLabel="Library"
            accessibilityHint="Choose a card edition"
            className="flex-1 flex-row bg-[#A855F7] border-[4px] border-black rounded-[24px] items-center justify-center pt-1"
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
          </TouchableOpacity>
        </View>

        <View className="flex-1 relative h-[64px]">
          <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenSetup}
            accessibilityRole="button"
            accessibilityLabel="Add Players"
            accessibilityHint="Open player setup before starting the game"
            className="flex-1 flex-row bg-[#F97316] border-[4px] border-black rounded-[24px] items-center justify-center pt-1"
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
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
