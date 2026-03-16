import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreenHeader } from "../components/AppScreenHeader";
import { LibraryEditionCard } from "../components/library/LibraryEditionCard";
import { LibraryEmptyState } from "../components/library/LibraryEmptyState";
import {
  resolveEditionDisplay,
  sortEditionsByCardCount,
} from "../constants/edition";
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
      className="flex-1 bg-indigo-300"
      style={{
        paddingTop: Math.max(insets.top, 20),
      }}
    >
      <AppScreenHeader title="CARD LIBRARY" onBack={navigateBackToHome} />

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
          <LibraryEmptyState />
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
                <LibraryEditionCard
                  key={edition.id}
                  icon={cardIcon}
                  name={cardName}
                  description={cardDescription}
                  color={cardColor}
                  cardCount={cardCount}
                  isSelected={isSelected}
                  onPress={() => handleSelectEdition(edition.id)}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
