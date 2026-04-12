import React from "react";
import { Text, View } from "react-native";

export const LibraryEmptyState: React.FC = () => {
  return (
    <View className="bg-neutral-50/20 rounded-[24px] border-[4px] border-neutral-950/20 p-6 items-center">
      <Text className="font-logo text-2xl text-neutral-950 uppercase tracking-tight mb-2">
        No Editions Found
      </Text>
      <Text className="font-body text-neutral-950/80 text-center">
        Add rows to `walwal_editions` in Supabase to show your decks here.
      </Text>
    </View>
  );
};
