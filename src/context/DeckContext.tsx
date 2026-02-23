import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DECK as DEFAULT_DECK } from "../constants/data";

export interface Card {
  id: string;
  type: string;
  prompt: string;
  emoji: string;
}

interface DeckContextType {
  deck: Card[];
  addCard: (card: Omit<Card, "id">) => void;
  updateCard: (id: string, card: Omit<Card, "id">) => void;
  deleteCard: (id: string) => void;
  resetDeck: () => void;
  isLoading: boolean;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

const STORAGE_KEY = "@walwalcards_deck";

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDeck();
  }, []);

  const loadDeck = async () => {
    try {
      const storedDeck = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedDeck) {
        setDeck(JSON.parse(storedDeck));
      } else {
        // Initialize with default deck, adding IDs
        const initialDeck = DEFAULT_DECK.map((card, index) => ({
          ...card,
          id: `default-${index}`,
        }));
        setDeck(initialDeck);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialDeck));
      }
    } catch (error) {
      console.error("Failed to load deck", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDeck = async (newDeck: Card[]) => {
    try {
      setDeck(newDeck);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDeck));
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
    const initialDeck = DEFAULT_DECK.map((card, index) => ({
      ...card,
      id: `default-${index}`,
    }));
    await saveDeck(initialDeck);
  };

  return (
    <DeckContext.Provider
      value={{ deck, addCard, updateCard, deleteCard, resetDeck, isLoading }}
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
