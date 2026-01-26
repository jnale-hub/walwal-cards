import React from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { FONT_FAMILY } from "../constants/fonts";
import { SHARED_STYLES } from "../constants/styles";
import { THEME } from "../constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

export const GameCard: React.FC<any> = ({
  frontInterpolate,
  backInterpolate,
  frontOpacity,
  backOpacity,
  currentCard,
  bg,
  playerName,
}) => {
  const faceClasses = "items-center justify-center backface-hidden";

  return (
    <View className="w-full h-full relative">
      {/* FRONT FACE */}
      <AnimatedView
        style={[
          SHARED_STYLES.cardBase,
          StyleSheet.absoluteFillObject,
          {
            transform: [{ rotateY: frontInterpolate }],
            opacity: frontOpacity,
            zIndex: frontOpacity === 0 ? 0 : 1,
          },
        ]}
        className={faceClasses}
      >
        {playerName && (
          <Text
            style={{ fontFamily: FONT_FAMILY.bodyBold, color: THEME.textMain }}
            className="absolute top-8 text-sm opacity-80 uppercase tracking-[4px]"
          >
            {playerName}
          </Text>
        )}
        <Text className="text-8xl mb-4">{currentCard.emoji}</Text>
        <Text
          style={{ fontFamily: FONT_FAMILY.bodyBold, color: THEME.textMain }}
          className="text-xs opacity-50 uppercase tracking-[1px] mt-2"
        >
          Tap to reveal
        </Text>
      </AnimatedView>

      {/* BACK FACE */}
      <AnimatedView
        style={[
          SHARED_STYLES.cardBase,
          StyleSheet.absoluteFillObject,
          {
            transform: [{ rotateY: backInterpolate }],
            opacity: backOpacity,
            zIndex: backOpacity === 0 ? 0 : 1,
          },
        ]}
        className={faceClasses}
      >
        <Text className="text-5xl sm:text-6xl mb-4">{currentCard.emoji}</Text>

        <View
          style={{ backgroundColor: bg }}
          className="px-4 py-1.5 rounded-full mb-6 border-2 border-black/5"
        >
          <Text
            style={{ fontFamily: FONT_FAMILY.bodyBold, color: THEME.textMain }}
            className="text-lg sm:text-xl uppercase tracking-widest"
          >
            {currentCard.type}
          </Text>
        </View>

        <Text
          style={{ fontFamily: FONT_FAMILY.bodyBold, color: THEME.textMain }}
          className="text-2xl text-center leading-7"
          numberOfLines={6}
          adjustsFontSizeToFit
        >
          {currentCard.prompt}
        </Text>
      </AnimatedView>
    </View>
  );
};
