import React from "react";
import { Text, View } from "react-native";

export const LibraryEmptyState: React.FC = () => {
  return (
    <View className="bg-white/20 rounded-[24px] border-[4px] border-black/20 p-6 items-center">
      <Text className="font-logo text-2xl text-black uppercase tracking-tight mb-2">
        No Editions Found
      </Text>
      <Text className="font-body text-black/80 text-center">
        Add rows to `walwal_editions` in Supabase to show your decks here.
      </Text>
    </View>
  );
};
