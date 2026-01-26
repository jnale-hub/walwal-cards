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
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ConfirmModal } from "../components/ConfirmModal";
import { GameButton } from "../components/GameButton";
import { GameCard } from "../components/GameCard";
import { DECK } from "../constants/data";
import { BG_COLORS, SCREEN_DIMS } from "../constants/theme";

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

export const GameScreen = () => {
  const router = useRouter();
  
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
  const [bg, setBg] = useState(BG_COLORS[4]);
  const activeCardIndex = deckOrder.length > 0 ? deckOrder[dealIndex] : 0;
  const currentCard = useMemo(() => DECK[activeCardIndex], [activeCardIndex]);
  const [bgEmoji, setBgEmoji] = useState(currentCard.emoji);

  // --- ANIMATION REFS ---
  const bgAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(-90)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current; // New: For background movement
  const prevBgRef = useRef(bg);

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
      ])
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
  }, [entryAnim, hasPlayers, players.length, randomTurnEnabled, startDriftAnimation]);

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
  useEffect(() => {
    bgAnim.setValue(0);
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start(() => {
      prevBgRef.current = bg;
    });
  }, [bg, bgAnim]);

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
      setBg(nextBg);

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
  }, [dealIndex, deckOrder, bg, hasPlayers, players, flipAnim, randomTurnEnabled, turnQueue, turnIndex]);


  const emojiGrid = useMemo(() => {
    const cellSize = 100;
    const numRows = Math.ceil(SCREEN_DIMS.height / cellSize) + 4;
    const numCols = Math.ceil(SCREEN_DIMS.width / cellSize) + 4;
    
    return Array.from({ length: numRows }).map((_, row) => (
      <View key={`r-${row}`} className="flex-row">
        {Array.from({ length: numCols }).map((_, col) => (
          <View
            key={`c-${row}-${col}`}
            className="m-5"
            style={{
              transform: [
                { rotate: (row + col) % 2 === 0 ? "-15deg" : "15deg" },
              ],
            }}
          >
            <Text className="text-5xl opacity-90">{bgEmoji}</Text>
          </View>
        ))}
      </View>
    ));
  }, [bgEmoji]);

  const driftRotate = driftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '2deg']
  });
  const driftScale = driftAnim.interpolate({
    inputRange: [0, .2],
    outputRange: [1, 1]
  });

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
        <View
          pointerEvents="none"
          className="absolute inset-0 items-center justify-center overflow-hidden z-0"
        >
          <AnimatedView
            style={{
              opacity: patternAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.0, 0.45],
              }),
              transform: [
                { scale: driftScale }, 
                { rotate: driftRotate }
              ],
            }}
          >
            {emojiGrid}
          </AnimatedView>
        </View>

        <View className="flex-1 z-10">
          {/* Header */}
          <View
            style={{
              paddingTop:
                Platform.OS === "android"
                  ? (StatusBar.currentHeight || 0) + 10
                  : 60,
            }}
            className="w-full px-6 flex-row justify-between items-center z-50 pb-2"
          >
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center bg-black/20 rounded-full"
              onPress={() => setShowExitModal(true)}
              hitSlop={20}
            >
              <Text className="text-white text-sm font-bold">✕</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 items-center justify-center px-6 w-full max-w-md self-center">
            <AnimatedView
              style={{
                width: "100%",
                maxWidth: 480,
                aspectRatio: 2.5 / 3,
                maxHeight: "65%",
                transform: [
                  { perspective: 1200 },
                  {
                    rotateY: entryAnim.interpolate({
                      inputRange: [-90, 0],
                      outputRange: ["-90deg", "0deg"],
                    }),
                  },
                ],
              }}
              className="z-10 shrink"
            >
              <GameCard
                frontInterpolate={flipAnim.interpolate({
                  inputRange: [0, 180],
                  outputRange: ["0deg", "180deg"],
                })}
                backInterpolate={flipAnim.interpolate({
                  inputRange: [0, 180],
                  outputRange: ["180deg", "360deg"],
                })}
                frontOpacity={flipAnim.interpolate({
                  inputRange: [89, 90],
                  outputRange: [1, 0],
                })}
                backOpacity={flipAnim.interpolate({
                  inputRange: [89, 90],
                  outputRange: [0, 1],
                })}
                currentCard={currentCard}
                bg={bg}
                playerName={hasPlayers ? players[turnIndex] : undefined}
                isFlipped={isFlipped}
              />

              {!isFlipped && (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={flipCard}
                  style={StyleSheet.absoluteFill}
                  className="z-[100]"
                />
              )}
            </AnimatedView>

            <View className="w-full items-center justify-end py-6 min-h-[80px]">
              {isFlipped && (
                <GameButton
                  onPress={handleNext}
                  text="Next Card"
                  className="w-full max-w-64 shadow-200"
                />
              )}
            </View>
          </View>
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
};
