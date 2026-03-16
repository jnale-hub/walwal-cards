import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { GameButton } from "../GameButton";
import { GameCard } from "../GameCard";

interface GameCardStageProps {
  entryAnim: Animated.Value;
  flipAnim: Animated.Value;
  currentCard: {
    type: string;
    prompt: string;
    emoji: string;
  };
  bg: string;
  playerName?: string;
  isFlipped: boolean;
  onFlipCard: () => void;
  onNext: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const GameCardStage: React.FC<GameCardStageProps> = ({
  entryAnim,
  flipAnim,
  currentCard,
  bg,
  playerName,
  isFlipped,
  onFlipCard,
  onNext,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6 w-full max-w-md self-center">
      <AnimatedView
        style={{
          width: "100%",
          maxWidth: 480,
          aspectRatio: 2.5 / 3.5,
          maxHeight: "70%",
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
          playerName={playerName}
          isFlipped={isFlipped}
        />

        {!isFlipped && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onFlipCard}
            accessibilityRole="button"
            accessibilityLabel="Reveal card"
            accessibilityHint="Flips the current card to show the challenge"
            style={StyleSheet.absoluteFill}
            className="z-[100]"
          />
        )}
      </AnimatedView>

      <View className="w-full items-center justify-end py-6 min-h-[80px]">
        {isFlipped && (
          <GameButton
            onPress={onNext}
            text="Next Card"
            className="w-full max-w-64 shadow-200"
            textClassName="font-bold text-2xl font-bodyBold"
          />
        )}
      </View>
    </View>
  );
};
