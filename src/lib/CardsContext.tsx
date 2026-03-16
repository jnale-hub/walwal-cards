import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

export interface Card {
  id: string;
  type: string;
  prompt: string;
  emoji: string;
}

interface CardsContextType {
  deck: Card[];
  loading: boolean;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

const CACHE_KEY = "walwal_cards_cache";

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // 1. Instantly load from local storage (Offline support & instant load)
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          if (parsedCache.length > 0) {
            setDeck(parsedCache);
            setLoading(false); // Stop loading immediately since we have data
          }
        }

        // 2. Fetch fresh data from Supabase silently in the background
        const { data, error } = await supabase.from("walwal_cards").select("*");
        if (error) throw error;

        // 3. Update the state with fresh data and cache it for the next launch
        if (data && data.length > 0) {
          setDeck(data);
          // Only update loading state if it hasn't been stopped by the cache loader
          if (!cached || JSON.parse(cached).length === 0) {
            setLoading(false);
          }
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        // Fallback to stop loading spinner just in case
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <CardsContext.Provider value={{ deck, loading }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
