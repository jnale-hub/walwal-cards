import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { appStorage } from "./storage";
import { supabase } from "./supabase";

export interface Card {
  id: number;
  type: string;
  prompt: string;
  emoji: string;
  edition_id: string;
}

export interface Edition {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}

interface CardsContextType {
  activeDeck: Card[];
  allCards: Card[];
  editions: Edition[];
  loading: boolean;
  currentEdition: string;
  setEdition: (editionId: string) => Promise<void>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

const CARDS_CACHE_KEY = "walwal_cards_cache";
const EDITIONS_CACHE_KEY = "walwal_editions_cache";
const EDITION_CACHE_KEY = "walwal_edition_cache";

const parseCachedArray = <T,>(rawValue: string | null): T[] => {
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

const formatEditionName = (editionId: string): string => {
  return editionId
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const deriveEditionsFromCards = (cards: Card[]): Edition[] => {
  const uniqueEditionIds = Array.from(
    new Set(cards.map((card) => card.edition_id).filter(Boolean)),
  );

  return uniqueEditionIds.map((id) => ({
    id,
    name: formatEditionName(id),
  }));
};

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEdition, setCurrentEdition] = useState<string>("classic");

  useEffect(() => {
    const loadEdition = async () => {
      const cachedEdition = await appStorage.getItem(EDITION_CACHE_KEY);
      if (cachedEdition) setCurrentEdition(cachedEdition);
    };

    loadEdition();
  }, []);

  const setEdition = async (editionId: string) => {
    setCurrentEdition(editionId);
    await appStorage.setItem(EDITION_CACHE_KEY, editionId);
  };

  useEffect(() => {
    const fetchData = async () => {
      let cachedCards: Card[] = [];
      let cachedEditions: Edition[] = [];
      let hasCachedCards = false;
      let hasCachedEditions = false;

      try {
        const [cachedCardsRaw, cachedEditionsRaw] = await Promise.all([
          appStorage.getItem(CARDS_CACHE_KEY),
          appStorage.getItem(EDITIONS_CACHE_KEY),
        ]);

        cachedCards = parseCachedArray<Card>(cachedCardsRaw);
        cachedEditions = parseCachedArray<Edition>(cachedEditionsRaw);

        if (cachedCards.length > 0) {
          setAllCards(cachedCards);
          hasCachedCards = true;
        }

        if (cachedEditions.length > 0) {
          setEditions(cachedEditions);
          hasCachedEditions = true;
        }

        if (hasCachedCards || hasCachedEditions) {
          setLoading(false);
        }

        const [{ data: cardsData, error: cardsError }, editionsResult] =
          await Promise.all([
            supabase.from("walwal_cards").select("*"),
            supabase.from("walwal_editions").select("*"),
          ]);

        if (cardsError) throw cardsError;

        const nextCards = (cardsData ?? []) as Card[];

        if (nextCards.length > 0) {
          setAllCards(nextCards);
          await appStorage.setItem(CARDS_CACHE_KEY, JSON.stringify(nextCards));
        } else if (!hasCachedCards) {
          setAllCards([]);
        }

        let nextEditions: Edition[] = [];

        if (editionsResult.error) {
          const sourceCards = nextCards.length > 0 ? nextCards : cachedCards;
          nextEditions = deriveEditionsFromCards(sourceCards);
        } else {
          const rows = (editionsResult.data ?? []) as Record<string, unknown>[];
          const mappedEditions: Edition[] = [];

          for (const row of rows) {
            const id = typeof row.id === "string" ? row.id : "";
            if (!id) continue;

            const name =
              typeof row.name === "string" && row.name.trim().length > 0
                ? row.name
                : formatEditionName(id);

            mappedEditions.push({
              id,
              name,
              description:
                typeof row.description === "string" ? row.description : null,
              color: typeof row.color === "string" ? row.color : null,
              icon: typeof row.icon === "string" ? row.icon : null,
            });
          }

          nextEditions = mappedEditions;

          if (nextEditions.length === 0) {
            const sourceCards = nextCards.length > 0 ? nextCards : cachedCards;
            nextEditions = deriveEditionsFromCards(sourceCards);
          }
        }

        if (nextEditions.length > 0) {
          setEditions(nextEditions);
          await appStorage.setItem(
            EDITIONS_CACHE_KEY,
            JSON.stringify(nextEditions),
          );
        } else if (!hasCachedEditions) {
          setEditions([]);
        }
      } catch (err) {
        console.error("Error fetching cards and editions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editions.length === 0) return;
    if (editions.some((edition) => edition.id === currentEdition)) return;

    const fallbackEditionId = editions[0].id;
    setCurrentEdition(fallbackEditionId);
    void appStorage.setItem(EDITION_CACHE_KEY, fallbackEditionId);
  }, [editions, currentEdition]);

  const activeDeck = useMemo(() => {
    return allCards.filter((card) => card.edition_id === currentEdition);
  }, [allCards, currentEdition]);

  return (
    <CardsContext.Provider
      value={{
        activeDeck,
        allCards,
        editions,
        loading,
        currentEdition,
        setEdition,
      }}
    >
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
