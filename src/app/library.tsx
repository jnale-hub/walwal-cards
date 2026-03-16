import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  resolveEditionDisplay,
  sortEditionsByCardCount,
} from "../constants/edition";
import { BG_COLORS } from "../constants/theme";
import { useCards } from "../lib/CardsContext";

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { allCards, editions, currentEdition, setEdition } = useCards();

  const navigateBackToHome = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  const cardCountByEdition = useMemo(() => {
    return allCards.reduce<Record<string, number>>((accumulator, card) => {
      if (!card.edition_id) return accumulator;

      accumulator[card.edition_id] = (accumulator[card.edition_id] ?? 0) + 1;

      return accumulator;
    }, {});
  }, [allCards]);

  const sortedEditions = useMemo(() => {
    return sortEditionsByCardCount(editions, cardCountByEdition);
  }, [editions, cardCountByEdition]);

  const handleSelectEdition = async (editionId: string) => {
    await setEdition(editionId);
    navigateBackToHome();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{
        backgroundColor: BG_COLORS[3] || "#A855F7",
        paddingTop: Math.max(insets.top, 20),
      }}
    >
      {/* --- HEADER BAR --- */}
      <View className="flex-row items-center justify-between px-6 mb-4 h-[50px] w-full max-w-[600px] self-center">
        <TouchableOpacity
          className="w-11 h-11 justify-center items-start"
          onPress={navigateBackToHome}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text className="text-textMain font-logo text-[36px] leading-[40px]">
            ←
          </Text>
        </TouchableOpacity>

        <Text className="text-textMain font-logo text-3xl text-center flex-1">
          CARD LIBRARY
        </Text>

        <View className="w-11" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 40,
          width: "100%",
          maxWidth: 600,
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Text className="text-textMain font-body text-lg text-center opacity-80 mb-6">
          Choose a deck to play with today.
        </Text>

        {editions.length === 0 ? (
          <View className="bg-white/20 rounded-[24px] border-[4px] border-black/20 p-6 items-center">
            <Text className="font-logo text-2xl text-black uppercase tracking-tight mb-2">
              No Editions Found
            </Text>
            <Text className="font-body text-black/80 text-center">
              Add rows to `walwal_editions` in Supabase to show your decks here.
            </Text>
          </View>
        ) : (
          <View className="gap-y-6">
            {sortedEditions.map((edition) => {
              const editionDisplay = resolveEditionDisplay(
                edition.id,
                editions,
              );
              const isSelected = currentEdition === edition.id;
              const cardCount = cardCountByEdition[edition.id] ?? 0;
              const cardColor = editionDisplay.color;
              const cardIcon = editionDisplay.icon;
              const cardName = editionDisplay.name;
              const cardDescription =
                edition.description ??
                "A custom deck from your Supabase edition library.";

              return (
                <View
                  key={edition.id}
                  className="w-full relative justify-center"
                >
                  {/* Button Shadow Base */}
                  <View
                    className="absolute left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]"
                    style={{ top: 6 }}
                  />

                  <TouchableOpacity
                    onPress={() => handleSelectEdition(edition.id)}
                    activeOpacity={0.8}
                    className="w-full rounded-[24px] border-[4px] border-black p-5 flex-col z-10"
                    style={{
                      backgroundColor: cardColor,
                    }}
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-5xl">{cardIcon}</Text>

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
                      {cardName}
                    </Text>

                    <Text className="font-body text-black text-base opacity-90 mt-2">
                      {cardDescription}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
