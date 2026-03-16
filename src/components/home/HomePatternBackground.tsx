import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { EmojiGrid } from "../EmojiGrid";

const AnimatedView = Animated.createAnimatedComponent(View);

interface HomePatternBackgroundProps {
  patternAnim: Animated.Value;
  emoji: string;
}

export const HomePatternBackground: React.FC<HomePatternBackgroundProps> = ({
  patternAnim,
  emoji,
}) => {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="absolute inset-0 items-center justify-center overflow-hidden z-0"
    >
      <AnimatedView
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: patternAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.0, 0.45],
          }),
        }}
      >
        <EmojiGrid emoji={emoji} />
      </AnimatedView>
    </View>
  );
};
