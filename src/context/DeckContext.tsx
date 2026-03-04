import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ALL_EDITIONS,
  CLASSIC_EDITION,
  Edition,
  getEditionById,
} from "../constants/editions";

export interface Card {
  id: string;
  type: string;
  prompt: string;
  emoji: string;
}

interface DeckContextType {
  deck: Card[];
  editions: Edition[];
  currentEdition: Edition;
  setEdition: (editionId: string) => void;
  addCard: (card: Omit<Card, "id">) => void;
  updateCard: (id: string, card: Omit<Card, "id">) => void;
  deleteCard: (id: string) => void;
  resetDeck: () => void;
  isLoading: boolean;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

const STORAGE_KEY = "@walwalcards_deck";
const EDITION_KEY = "@walwalcards_edition";

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentEdition, setCurrentEdition] =
    useState<Edition>(CLASSIC_EDITION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load saved edition
      const savedEditionId = await AsyncStorage.getItem(EDITION_KEY);
      const edition = savedEditionId
        ? getEditionById(savedEditionId) || CLASSIC_EDITION
        : CLASSIC_EDITION;
      setCurrentEdition(edition);

      // Load custom deck for this edition
      const storedDeck = await AsyncStorage.getItem(
        `${STORAGE_KEY}_${edition.id}`,
      );
      if (storedDeck) {
        setDeck(JSON.parse(storedDeck));
      } else {
        // Initialize with edition's default cards
        const initialDeck = edition.cards.map((card, index) => ({
          ...card,
          id: `${edition.id}-${index}`,
        }));
        setDeck(initialDeck);
        await AsyncStorage.setItem(
          `${STORAGE_KEY}_${edition.id}`,
          JSON.stringify(initialDeck),
        );
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setEdition = async (editionId: string) => {
    const edition = getEditionById(editionId);
    if (!edition) return;

    setIsLoading(true);
    try {
      // Save selected edition
      await AsyncStorage.setItem(EDITION_KEY, editionId);
      setCurrentEdition(edition);

      // Load or initialize deck for this edition
      const storedDeck = await AsyncStorage.getItem(
        `${STORAGE_KEY}_${editionId}`,
      );
      if (storedDeck) {
        setDeck(JSON.parse(storedDeck));
      } else {
        const initialDeck = edition.cards.map((card, index) => ({
          ...card,
          id: `${edition.id}-${index}`,
        }));
        setDeck(initialDeck);
        await AsyncStorage.setItem(
          `${STORAGE_KEY}_${editionId}`,
          JSON.stringify(initialDeck),
        );
      }
    } catch (error) {
      console.error("Failed to switch edition", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDeck = async (newDeck: Card[]) => {
    try {
      setDeck(newDeck);
      await AsyncStorage.setItem(
        `${STORAGE_KEY}_${currentEdition.id}`,
        JSON.stringify(newDeck),
      );
    } catch (error) {
      console.error("Failed to save deck", error);
    }
  };

  const addCard = (card: Omit<Card, "id">) => {
    const newCard = { ...card, id: Date.now().toString() };
    saveDeck([newCard, ...deck]);
  };

  const updateCard = (id: string, updatedCard: Omit<Card, "id">) => {
    const newDeck = deck.map((card) =>
      card.id === id ? { ...card, ...updatedCard } : card,
    );
    saveDeck(newDeck);
  };

  const deleteCard = (id: string) => {
    const newDeck = deck.filter((card) => card.id !== id);
    saveDeck(newDeck);
  };

  const resetDeck = async () => {
    const initialDeck = currentEdition.cards.map((card, index) => ({
      ...card,
      id: `${currentEdition.id}-${index}`,
    }));
    await saveDeck(initialDeck);
  };

  return (
    <DeckContext.Provider
      value={{
        deck,
        editions: ALL_EDITIONS,
        currentEdition,
        setEdition,
        addCard,
        updateCard,
        deleteCard,
        resetDeck,
        isLoading,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
