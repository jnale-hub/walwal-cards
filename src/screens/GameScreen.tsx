import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GameButton } from "../components/GameButton";
import { DECK } from "../constants/data";
import { BG_COLORS, THEME, LAYOUT, SCREEN_DIMS } from "../constants/theme";

export const GameScreen = () => {
  const { playerList } = useLocalSearchParams();
  
  // Parse players if they exist
  const players = useMemo(() => {
    if (typeof playerList === 'string') {
      try {
        return JSON.parse(playerList);
      } catch (e) {
        return [];
      }
    }
    return [];
  }, [playerList]);

  const hasPlayers = players.length > 0;
  
  const [index, setIndex] = useState(0);
  const [bg, setBg] = useState(BG_COLORS[4]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);

  // Current Card Emoji
  const currentEmoji = useMemo(() => DECK[index].emoji, [index]);
  const [bgEmoji, setBgEmoji] = useState(currentEmoji);

  // Animations & Refs
  const bgAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(-90)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;
  const prevBgRef = useRef(bg);

  // This ensures the old emoji persists during the fade-out animation
  useEffect(() => {
    if (isFlipped) {
      setBgEmoji(currentEmoji);
    }
  }, [isFlipped, currentEmoji]);

  // Entry Animation
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

  // Handle Background Transition
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

  // Handle Pattern Opacity
  useEffect(() => {
    Animated.timing(patternAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, patternAnim]);

  // Flip Animations
  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ["0deg", "180deg"] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ["180deg", "360deg"] });
  const frontOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
  const backOpacity = flipAnim.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });

  // Optimized Grid Generation - Uses bgEmoji instead of currentEmoji
  const emojiGrid = useMemo(() => {
    const cellSize = LAYOUT.emojiSize + LAYOUT.emojiMargin * 2;
    const numRows = Math.ceil(SCREEN_DIMS.height / cellSize) + 1;
    const numCols = Math.ceil(SCREEN_DIMS.width / cellSize) + 1;

    return Array.from({ length: numRows }).map((_, row) => (
      <View key={`row-${row}`} style={{ flexDirection: "row" }}>
        {Array.from({ length: numCols }).map((_, col) => {
          const rotate = (row + col) % 2 === 0 ? "-15deg" : "15deg";
          return (
            <View
              key={`c-${row}-${col}`}
              style={{ margin: LAYOUT.emojiMargin, transform: [{ rotate }] }}
            >
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
    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, flipAnim]);

  const handleNext = useCallback(() => {
    // 1. Flip back
    setIsFlipped(false);
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    // 2. Change content after flip starts (invisible state)
    setTimeout(() => {
      let nextIndex = index;
      if (DECK.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * DECK.length);
        } while (nextIndex === index);
      }
      let nextBg = bg;
      if (BG_COLORS.length > 1) {
        do {
          nextBg = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
        } while (nextBg === bg);
      }
      setIndex(nextIndex);
      setBg(nextBg);
      
      if (hasPlayers) {
        setTurnIndex(prev => (prev + 1) % players.length);
      }
    }, 100);
  }, [index, bg, flipAnim, hasPlayers, players]);

  return (
    <Animated.View style={[styles.centerContainer, { backgroundColor }]}>
      {/* Background Pattern */}
      <View style={[StyleSheet.absoluteFillObject, styles.patternContainer]}>
        <Animated.View
          style={{
            opacity: patternAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
            transform: [{ scale: 1.1 }],
          }}
        >
          {emojiGrid}
        </Animated.View>
      </View>

      {/* Tap Overlay */}
      {!isFlipped && (
        <TouchableOpacity
          style={styles.touchOverlay}
          onPress={flipCard}
          activeOpacity={1}
        />
      )}

      {/* Card Wrapper with Entry Animation */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [
              { perspective: 1000 },
              { rotateY: entryInterpolate }, // Animate from -90 to 0 on mount
            ],
          },
        ]}
      >
        {/* Front Face */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.cardFace,
            { transform: [{ rotateY: frontInterpolate }], opacity: frontOpacity },
          ]}
        >
          {/* Player Name Minimal - Front */}
          {hasPlayers && (
            <Text style={styles.cardPlayerName}>{players[turnIndex]}</Text>
          )}
          
          <Text style={styles.cardEmoji}>{currentEmoji}</Text>
          <Text style={styles.tapToReveal}>Tap to reveal</Text>
        </Animated.View>

        {/* Back Face */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.cardFace,
            { transform: [{ rotateY: backInterpolate }], opacity: backOpacity },
          ]}
        >
          {/* Player Name Minimal - Back */}
          {hasPlayers && (
            <Text style={styles.cardPlayerName}>{players[turnIndex]}</Text>
          )}

          <Text style={styles.cardEmojiSmall}>{currentEmoji}</Text>
          <View style={[styles.typeBadge, { backgroundColor: bg }]}>
            <Text style={styles.typeText}>{DECK[index].type}</Text>
          </View>
          <Text style={styles.cardPrompt}>{DECK[index].prompt}</Text>
        </Animated.View>
      </Animated.View>

      {/* Controls */}
      <View style={styles.buttonContainer}>
        {isFlipped && <GameButton onPress={handleNext} text="Next Card" />}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  patternContainer: {
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  buttonContainer: {
    height: 80,
    marginTop: 40,
    justifyContent: "center",
    zIndex: 20,
  },
  cardContainer: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    zIndex: 10,
  },
  cardBase: {
    backgroundColor: THEME.cardBg,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: THEME.border,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardFace: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
  },
  cardPrompt: {
    color: THEME.textMain,
    fontSize: 24,
    textAlign: "center",
    lineHeight: 34,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  tapToReveal: {
    color: THEME.textMain,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
  },
  typeText: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: THEME.textMain,
  },
  cardEmoji: {
    fontSize: 100,
    marginBottom: 16,
  },
  cardEmojiSmall: {
    fontSize: 40,
    marginBottom: 16,
  },
  cardPlayerName: {
    position: 'absolute',
    top: 32,
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.textMain,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
