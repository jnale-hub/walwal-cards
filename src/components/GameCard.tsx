import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { FONT_FAMILY } from "../constants/fonts";
import { SHARED_STYLES } from "../constants/styles";
import { THEME } from "../constants/theme";
import { isSmallDevice } from "../constants/util";

interface GameCardProps {
  frontInterpolate: Animated.AnimatedInterpolation<string | number>;
  backInterpolate: Animated.AnimatedInterpolation<string | number>;
  frontOpacity: Animated.AnimatedInterpolation<string | number>;
  backOpacity: Animated.AnimatedInterpolation<string | number>;
  currentCard: { emoji: string; type: string; prompt: string };
  bg: string;
  playerName?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  frontInterpolate,
  backInterpolate,
  frontOpacity,
  backOpacity,
  currentCard,
  bg,
  playerName,
}) => {
  return (
    <>
      {/* FRONT */}
      <Animated.View
        style={[
          SHARED_STYLES.cardBase,
          styles.cardFace,
          { transform: [{ rotateY: frontInterpolate }], opacity: frontOpacity },
        ]}
      >
        {playerName && <Text style={styles.cardPlayerName}>{playerName}</Text>}
        <Text style={styles.cardEmoji}>{currentCard.emoji}</Text>
        <Text style={styles.tapToReveal}>Tap to reveal</Text>
      </Animated.View>

      {/* BACK */}
      <Animated.View
        style={[
          SHARED_STYLES.cardBase,
          styles.cardFace,
          { transform: [{ rotateY: backInterpolate }], opacity: backOpacity },
        ]}
      >
        {playerName && <Text style={styles.cardPlayerName}>{playerName}</Text>}
        <Text style={styles.cardEmojiSmall}>{currentCard.emoji}</Text>
        <View style={[styles.typeBadge, { backgroundColor: bg }]}>
          <Text style={styles.typeText}>{currentCard.type}</Text>
        </View>
        <Text style={styles.cardPrompt}>{currentCard.prompt}</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: isSmallDevice ? 22 : 24,
    textAlign: "center",
    lineHeight: isSmallDevice ? 28 : 34,
    fontFamily: FONT_FAMILY.bodyBold,
  },
  tapToReveal: {
    color: THEME.textMain,
    fontSize: 18,
    fontFamily: FONT_FAMILY.bodyBold,
    letterSpacing: 1,
  },
  typeText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bodyBold,
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
    position: "absolute",
    top: 32,
    fontSize: 16,
    fontFamily: FONT_FAMILY.bodyBold,
    color: THEME.textMain,
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
