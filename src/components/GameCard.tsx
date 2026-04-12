import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { getResponsiveLineHeight } from "../constants/util";
const AnimatedView = Animated.createAnimatedComponent(View);

export const GameCard: React.FC<any> = ({
  frontInterpolate,
  backInterpolate,
  frontOpacity,
  backOpacity,
  currentCard,
  bgClass,
  playerName,
  isFlipped,
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
        accessibilityElementsHidden={isFlipped}
        importantForAccessibility={isFlipped ? "no-hide-descendants" : "yes"}
        className={`${faceClasses}`}
      >
        <View className="card-base w-full h-full">
          {playerName && (
            <Text className="text-textMain font-bodyBold absolute top-8 text-sm opacity-80 uppercase tracking-[4px]">
              {playerName}
            </Text>
          )}
          <Text
            className="text-[9rem] mb-4 pt-2 overflow-visible"
            style={{
              lineHeight: getResponsiveLineHeight(144), // ~9rem based on standard 16px root
            }}
          >
            {currentCard.emoji}
          </Text>
          <Text className="text-textMain font-body text-xs opacity-50 uppercase tracking-[1px] mt-2">
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
        accessibilityElementsHidden={!isFlipped}
        importantForAccessibility={isFlipped ? "yes" : "no-hide-descendants"}
        className={`${faceClasses}`}
      >
        <View className="card-base w-full h-full">
          <Text
            className="text-8xl mb-4 pt-2 overflow-visible"
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.4}
            style={{
              includeFontPadding: false,
              lineHeight: getResponsiveLineHeight(96),
            }}
          >
            {currentCard.emoji}
          </Text>

          <View
            className={`${bgClass} px-4 py-1.5 mb-6 border-[3px] border-black shadow-card-sm`}
          >
            <Text className="text-textMain text-xl sm:text-2xl uppercase font-bold">
              {currentCard.type}
            </Text>
          </View>

          <Text
            className="text-textMain font-semibold text-2xl sm:text-3xl text-center leading-8 sm:leading-10 text-pretty pb-12"
            adjustsFontSizeToFit
            numberOfLines={6}
            minimumFontScale={0.5}
            style={{
              lineHeight: getResponsiveLineHeight(36),
            }}
          >
            {currentCard.prompt}
          </Text>
        </View>
      </AnimatedView>
    </View>
  );
};
