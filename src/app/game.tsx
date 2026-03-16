import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConfirmModal } from "../components/ConfirmModal";
import { GameButton } from "../components/GameButton";
import { GameCardStage } from "../components/game/GameCardStage";
import { GameHeader } from "../components/game/GameHeader";
import { GamePatternBackground } from "../components/game/GamePatternBackground";
import { resolveEditionDisplay } from "../constants/edition";
import { BG_COLORS } from "../constants/theme";
import { useCards } from "../lib/CardsContext";

// Generic Fisher-Yates shuffle
const shuffleArray = (array: number[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function GameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { activeDeck: DECK, loading, currentEdition, editions } = useCards();

  // --- PARAMS & SETUP ---
  const { playerList, isRandomTurn } = useLocalSearchParams();
  const randomTurnEnabled = isRandomTurn === "true";

  const players = useMemo(() => {
    if (typeof playerList === "string") {
      try {
        return JSON.parse(playerList);
      } catch {
        return [];
      }
    }
    return [];
  }, [playerList]);

  const hasPlayers = players.length > 0;

  const editionDisplay = useMemo(() => {
    return resolveEditionDisplay(currentEdition, editions);
  }, [editions, currentEdition]);

  const currentEditionLabel = editionDisplay.name;
  const currentEditionIcon = editionDisplay.icon;

  // --- GAME STATE ---
  const [deckOrder, setDeckOrder] = useState<number[]>([]);
  const [dealIndex, setDealIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Turn Management
  const [turnIndex, setTurnIndex] = useState(0);
  // "Bag" system: Keep a queue of upcoming turns to ensure fairness
  const [turnQueue, setTurnQueue] = useState<number[]>([]);

  // Background State
  const [bg, setBg] = useState(editionDisplay.bgColor);
  const activeCardIndex = deckOrder.length > 0 ? deckOrder[dealIndex] : 0;
  const currentCard = useMemo(() => {
    if (DECK && DECK.length > 0) return DECK[activeCardIndex];
    return { type: "", prompt: "", emoji: "" };
  }, [DECK, activeCardIndex]);

  const [bgEmoji, setBgEmoji] = useState(currentCard.emoji);

  // --- ANIMATION REFS ---
  const bgAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(-90)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current; // New: For background movement
  const prevBgRef = useRef(bg);

  useEffect(() => {
    // Keep the initial game background aligned with the selected edition color
    // before the random per-card colors begin.
    if (dealIndex !== 0 || isFlipped) return;

    setBg(editionDisplay.bgColor);
    prevBgRef.current = editionDisplay.bgColor;
  }, [editionDisplay.bgColor, dealIndex, isFlipped]);

  const startDriftAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(driftAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(driftAnim, {
          toValue: 0,
          duration: 8000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [driftAnim]);

  useEffect(() => {
    // 1. Shuffle Deck
    const indices = Array.from({ length: DECK.length }, (_, i) => i);
    setDeckOrder(shuffleArray(indices));

    // 2. Initialize Turn Queue if Random
    if (hasPlayers && randomTurnEnabled) {
      setTurnQueue(generateNewTurnQueue(players.length));
    }

    // 3. Entry Animation
    Animated.spring(entryAnim, {
      toValue: 0,
      tension: 20,
      useNativeDriver: true,
    }).start();

    // 4. Start Background Drift (Subtle rotation loop)
    startDriftAnimation();
  }, [
    entryAnim,
    hasPlayers,
    players.length,
    randomTurnEnabled,
    startDriftAnimation,
    DECK.length,
  ]);

  // Helper to generate a shuffled list of player indices
  const generateNewTurnQueue = (count: number) => {
    const indices = Array.from({ length: count }, (_, i) => i);
    return shuffleArray(indices);
  };

  // Update background emoji only when card is fully flipped
  useEffect(() => {
    if (isFlipped) setBgEmoji(currentCard.emoji);
  }, [isFlipped, currentCard]);

  // Smooth Background Color Transition
  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevBgRef.current, bg],
  });

  // Fade in pattern when card is flipped
  useEffect(() => {
    Animated.timing(patternAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, patternAnim]);

  // --- FLIP LOGIC ---
  const flipCard = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);
    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, flipAnim]);

  // --- NEXT CARD LOGIC ---
  const handleNext = useCallback(() => {
    // 1. Reset Card Visuals
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    // 2. Delay logic until card is closed
    setTimeout(() => {
      setIsFlipped(false);

      // Advance Deck
      const nextIdx = (dealIndex + 1) % deckOrder.length;
      setDealIndex(nextIdx);

      // Randomize Background Color
      let nextBg = bg;
      if (BG_COLORS.length > 1) {
        do {
          nextBg = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
        } while (nextBg === bg);
      }

      prevBgRef.current = bg;
      setBg(nextBg);
      bgAnim.setValue(0);
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();

      if (hasPlayers) {
        if (randomTurnEnabled) {
          let currentQueue = [...turnQueue];

          if (currentQueue.length === 0) {
            currentQueue = generateNewTurnQueue(players.length);

            if (players.length > 1 && currentQueue[0] === turnIndex) {
              const first = currentQueue.shift()!;
              currentQueue.push(first);
            }
          }

          const nextPlayer = currentQueue.shift();

          if (nextPlayer !== undefined) {
            setTurnIndex(nextPlayer);
            setTurnQueue(currentQueue);
          }
        } else {
          setTurnIndex((prev) => (prev + 1) % players.length);
        }
      }
    }, 150);
  }, [
    dealIndex,
    deckOrder,
    bg,
    hasPlayers,
    players,
    flipAnim,
    bgAnim,
    randomTurnEnabled,
    turnQueue,
    turnIndex,
  ]);

  if (loading) {
    return (
      <View
        style={{ backgroundColor: editionDisplay.bgColor }}
        className="flex-1 items-center justify-center p-6"
      >
        <Text className="text-white text-3xl font-bodyBold text-center">
          Loading cards... 🍻
        </Text>
      </View>
    );
  }

  if (!DECK || DECK.length === 0) {
    return (
      <View
        style={{ backgroundColor: editionDisplay.bgColor }}
        className="flex-1 items-center justify-center px-8"
      >
        <Text className="text-8xl mb-4 pt-2 overflow-visible">😢</Text>
        <Text className="text-white text-4xl font-bodyBold text-center mb-3">
          Walang Cards?!
        </Text>
        <Text className="text-white font-body text-base text-center mb-8 opacity-70 leading-5 text-pretty">
          We couldn&apos;t fetch the deck. Please check your connection and try
          again.
        </Text>
        <GameButton
          onPress={() => router.replace("/")}
          text="Go Back"
          className="w-full max-w-64 shadow-200"
          textClassName="font-bold text-2xl font-bodyBold"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <AnimatedView
        style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
        className="flex-1"
      >
        <GamePatternBackground patternAnim={patternAnim} emoji={bgEmoji} />

        <View className="flex-1 z-10">
          <GameHeader
            topInset={insets.top}
            onExit={() => setShowExitModal(true)}
            editionLabel={currentEditionLabel}
            editionIcon={currentEditionIcon}
          />

          <GameCardStage
            entryAnim={entryAnim}
            flipAnim={flipAnim}
            currentCard={currentCard}
            bg={bg}
            playerName={hasPlayers ? players[turnIndex] : undefined}
            isFlipped={isFlipped}
            onFlipCard={flipCard}
            onNext={handleNext}
          />
        </View>
      </AnimatedView>

      <ConfirmModal
        visible={showExitModal}
        title="End Game?"
        message="Are you sure you want to quit? Current progress will be lost."
        onCancel={() => setShowExitModal(false)}
        onConfirm={() => router.replace("/")}
      />
    </View>
  );
}
