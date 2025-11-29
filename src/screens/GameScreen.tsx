import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, StatusBar as RNStatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ConfirmModal } from "../components/ConfirmModal";
import { GameButton } from "../components/GameButton";
import { GameCard } from "../components/GameCard";
import { DECK } from "../constants/data";
import { BG_COLORS, LAYOUT, SCREEN_DIMS, THEME } from "../constants/theme";

const shuffleArray = (array: number[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const GameScreen = () => {
  const router = useRouter();
  const { playerList } = useLocalSearchParams();
  
  const players = useMemo(() => {
    if (typeof playerList === 'string') {
      try { return JSON.parse(playerList); } catch { return []; }
    }
    return [];
  }, [playerList]);

  const hasPlayers = players.length > 0;

  const [deckOrder, setDeckOrder] = useState<number[]>([]);
  const [dealIndex, setDealIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const indices = Array.from({ length: DECK.length }, (_, i) => i);
    setDeckOrder(shuffleArray(indices));
  }, []);

  const activeCardIndex = deckOrder.length > 0 ? deckOrder[dealIndex] : 0;

  const [bg, setBg] = useState(BG_COLORS[4]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);

  const currentCard = useMemo(() => DECK[activeCardIndex], [activeCardIndex]);
  const [bgEmoji, setBgEmoji] = useState(currentCard.emoji);

  const bgAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(-90)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;
  const prevBgRef = useRef(bg);

  useEffect(() => {
    if (isFlipped) {
      setBgEmoji(currentCard.emoji);
    }
  }, [isFlipped, currentCard]);

  useEffect(() => {
    Animated.timing(entryAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [entryAnim]);

  const entryInterpolate = entryAnim.interpolate({
    inputRange: [-90, 0],
    outputRange: ["-90deg", "0deg"],
  });

  useEffect(() => {
    bgAnim.setValue(0);
    Animated.timing(bgAnim, { toValue: 1, duration: 600, useNativeDriver: false }).start(() => {
      prevBgRef.current = bg;
    });
  }, [bg, bgAnim]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevBgRef.current, bg],
  });

  useEffect(() => {
    Animated.timing(patternAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, patternAnim]);

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ["0deg", "180deg"] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ["180deg", "360deg"] });
  const frontOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
  const backOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });

  const emojiGrid = useMemo(() => {
    const cellSize = LAYOUT.emojiSize + LAYOUT.emojiMargin * 2;
    const numRows = Math.ceil(SCREEN_DIMS.height / cellSize) + 1;
    const numCols = Math.ceil(SCREEN_DIMS.width / cellSize) + 1;
    return Array.from({ length: numRows }).map((_, row) => (
      <View key={`row-${row}`} style={{ flexDirection: "row" }}>
        {Array.from({ length: numCols }).map((_, col) => {
          const rotate = (row + col) % 2 === 0 ? "-15deg" : "15deg";
          return (
            <View key={`c-${row}-${col}`} style={{ margin: LAYOUT.emojiMargin, transform: [{ rotate }] }}>
              <Text style={{ fontSize: LAYOUT.emojiSize }}>{bgEmoji}</Text>
            </View>
          );
        })}
      </View>
    ));
  }, [bgEmoji]);

  const flipCard = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);
    Animated.spring(flipAnim, { toValue: 180, friction: 8, tension: 10, useNativeDriver: true }).start();
  }, [isFlipped, flipAnim]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    Animated.spring(flipAnim, { toValue: 0, friction: 8, tension: 10, useNativeDriver: true }).start();

    setTimeout(() => {
      let nextDealIndex = dealIndex + 1;
      if (nextDealIndex >= deckOrder.length) {
        const lastCard = deckOrder[deckOrder.length - 1];
        let newOrder = shuffleArray([...deckOrder]);
        if (newOrder[0] === lastCard) {
          const swapIdx = Math.floor(Math.random() * (newOrder.length - 1)) + 1;
          [newOrder[0], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[0]];
        }
        setDeckOrder(newOrder);
        nextDealIndex = 0;
      }
      setDealIndex(nextDealIndex);

      let nextBg = bg;
      if (BG_COLORS.length > 1) {
        do { nextBg = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]; } while (nextBg === bg);
      }
      setBg(nextBg);
      
      if (hasPlayers) {
        setTurnIndex(prev => (prev + 1) % players.length);
      }
    }, 100);
  }, [dealIndex, deckOrder, bg, flipAnim, hasPlayers, players]);

  return (
    <Animated.View style={[styles.mainContainer, { backgroundColor }]}>
      
      {/* Background Pattern - Absolute, behind everything */}
      <View style={[StyleSheet.absoluteFillObject, styles.patternContainer]}>
        <Animated.View style={{ opacity: patternAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.3] }), transform: [{ scale: 1.1 }] }}>
          {emojiGrid}
        </Animated.View>
      </View>

      <ConfirmModal
        visible={showExitModal}
        title="End Game?"
        message="Are you sure you want to quit? Current progress will be lost."
        confirmText="End Game"
        cancelText="Resume"
        onCancel={() => setShowExitModal(false)}
        onConfirm={() => {
          setShowExitModal(false);
          router.replace("/");
        }}
      />

      {/* HEADER ROW: Contains Exit Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.exitButton} 
          onPress={() => setShowExitModal(true)} 
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* GAME AREA: Centered Card */}
      <View style={styles.gameArea}>
        {!isFlipped && <TouchableOpacity style={styles.touchOverlay} onPress={flipCard} activeOpacity={1} />}

        <Animated.View style={[styles.cardContainer, { transform: [{ perspective: 1000 }, { rotateY: entryInterpolate }] }]}>
          <GameCard
            frontInterpolate={frontInterpolate}
            backInterpolate={backInterpolate}
            frontOpacity={frontOpacity}
            backOpacity={backOpacity}
            currentCard={currentCard}
            bg={bg}
            playerName={hasPlayers ? players[turnIndex] : undefined}
          />
        </Animated.View>
      </View>

      {/* FOOTER: Controls */}
      <View style={styles.footerRow}>
        {isFlipped && <GameButton onPress={handleNext} text="Next Card" />}
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 60,
    paddingBottom: 30,
  },
  patternContainer: {
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  
  // --- Header Layout ---
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    height: 50,
    zIndex: 200,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  exitButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  exitButtonText: {
    fontSize: 28,
    fontWeight: '900',
    color: THEME.textMain,
    includeFontPadding: false,
  },

  // --- Game Layout ---
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  footerRow: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },

  // --- Card Styles ---
  cardContainer: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    aspectRatio: LAYOUT.cardWidth / LAYOUT.cardHeight,
    maxWidth: '85%',
    maxHeight: '82%', 
  },
});
