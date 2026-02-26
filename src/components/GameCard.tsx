import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
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
          StyleSheet.absoluteFillObject,
          {
            transform: [{ rotateY: frontInterpolate }],
            opacity: frontOpacity,
            zIndex: frontOpacity === 0 ? 0 : 1,
          },
        ]}
        className={`${faceClasses}`}
      >
        <View className="card-base w-full h-full">
          {playerName && (
            <Text className="text-textMain font-bodyBold absolute top-8 text-sm opacity-80 uppercase tracking-[4px]">
              {playerName}
            </Text>
          )}
          <Text className="text-8xl mb-4 leading-[120px] pt-2 overflow-visible">
            {currentCard.emoji}
          </Text>
          <Text className="text-textMain font-bodyBold text-xs opacity-50 uppercase tracking-[1px] mt-2">
            Tap to reveal
          </Text>
        </View>
      </AnimatedView>

      {/* BACK FACE */}
      <AnimatedView
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ rotateY: backInterpolate }],
            opacity: backOpacity,
            zIndex: backOpacity === 0 ? 0 : 1,
          },
        ]}
        className={`${faceClasses}`}
      >
        <View className="card-base w-full h-full">
          <Text className="text-5xl sm:text-6xl mb-4 leading-[80px] pt-2 overflow-visible">
            {currentCard.emoji}
          </Text>

          <View
            style={{ backgroundColor: bg }}
            className="px-4 py-1.5 rounded-full mb-6 border-2 border-black/5"
          >
            <Text className="text-textMain font-bodyBold text-lg sm:text-xl uppercase tracking-widest">
              {currentCard.type}
            </Text>
          </View>

          <Text
            className="text-textMain font-bodyBold text-2xl sm:text-3xl text-center leading-8 sm:leading-10 px-2"
            numberOfLines={6}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            {currentCard.prompt}
          </Text>
        </View>
      </AnimatedView>
    </View>
  );
};
