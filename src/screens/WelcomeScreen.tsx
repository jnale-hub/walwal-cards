import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { EmojiGrid } from "../components/EmojiGrid";
import { GameButton } from "../components/GameButton";
import { FONT_FAMILY } from "../constants/fonts";
import { SHARED_STYLES } from "../constants/styles";
import { BG_COLORS, THEME } from "../constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

// Background emoji grid now handled by `EmojiGrid` component.

export const WelcomeScreen = () => {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Animation Refs
  const flipOutAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(0)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;

  // Reset page transition animations
  useFocusEffect(
    useCallback(() => {
      flipOutAnim.setValue(0);
      Animated.timing(entryAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
      // Fade in background pattern
      patternAnim.setValue(0);
      Animated.timing(patternAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [flipOutAnim, entryAnim, patternAnim]),
  );

  const animateAndNavigate = (path: Parameters<typeof router.push>[0]) => {
    Animated.parallel([
      Animated.timing(flipOutAnim, {
        toValue: 90,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(entryAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => router.push(path));
  };

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  // The background is now a simple emoji grid rendered via `EmojiGrid`.

  return (
    <View
      className="flex-1 items-center justify-center overflow-hidden"
      style={{ backgroundColor: BG_COLORS[4] }}
    >
      <StatusBar barStyle="light-content" />

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
          }}
        >
          <EmojiGrid emoji="🥴" />
        </AnimatedView>
      </View>

      {/* --- FOREGROUND CONTENT --- */}
      <View
        className="flex-1 items-center justify-center z-10 w-full px-6"
        style={{
          paddingTop:
            Platform.OS === "android"
              ? (StatusBar.currentHeight || 0) + 10
              : 20,
          paddingBottom: 20,
        }}
      >
        <AnimatedView
          style={[
            SHARED_STYLES.cardBase,
            {
              width: "100%",
              maxWidth: 420,
              aspectRatio: 2.5 / 3,
              maxHeight: "65%",
              transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }],
            },
          ]}
          className="items-center justify-center p-6 shrink shadow-xl mb-8"
        >
          <View className="flex-1 items-center justify-center w-full ">
            <Text
              style={{ fontFamily: FONT_FAMILY.logo, color: THEME.textMain }}
              className="text-6xl text-center tracking-tighter leading-tight"
            >
              WALWAL{"\n"}CARDS
            </Text>

            <Text
              style={{
                fontFamily: FONT_FAMILY.bodyBold,
                color: THEME.textMain,
              }}
              className="text-[10px] opacity-40 tracking-[3px] uppercase absolute bottom-0"
            >
              Drink responsibly
            </Text>
          </View>
        </AnimatedView>

        <View className="w-full items-center gap-y-3 z-20 shrink-0 mt-6">
          <GameButton
            onPress={() => animateAndNavigate("/game")}
            text="Quick Play"
            variant="primary"
            className="w-full max-w-[280px] shadow-200"
          />
          <GameButton
            onPress={() => animateAndNavigate("/setup")}
            text="Add Players"
            variant="secondary"
            className="w-full max-w-[280px] bg-orange-400 border-white shadow-200 shadow-white"
            textStyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
  );
};
