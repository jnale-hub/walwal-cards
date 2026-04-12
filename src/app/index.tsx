import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { Animated, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeActionButtons } from "../components/home/HomeActionButtons";
import { HomeMainCard } from "../components/home/HomeMainCard";
import { HomePatternBackground } from "../components/home/HomePatternBackground";
import { resolveEditionDisplay } from "../constants/edition";
import { useCards } from "../lib/CardsContext";

const AnimatedView = Animated.createAnimatedComponent(View);
const DEFAULT_PATTERN_EMOJI = "🍺";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentEdition, editions, loading } = useCards();

  const editionDetails = useMemo(() => {
    return resolveEditionDisplay(currentEdition, editions);
  }, [editions, currentEdition]);

  // Animation Refs
  const flipOutAnim = useRef(new Animated.Value(0)).current;
  const entryAnim = useRef(new Animated.Value(0)).current;
  const patternAnim = useRef(new Animated.Value(0)).current;

  // Reset page transition animations
  useFocusEffect(
    useCallback(() => {
      // Instantly pop elements into visible state
      flipOutAnim.setValue(0);
      patternAnim.setValue(1);

      // Quick slide up for the main content
      Animated.timing(entryAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [flipOutAnim, entryAnim, patternAnim]),
  );

  const animateAndNavigateToGame = () => {
    Animated.parallel([
      Animated.timing(flipOutAnim, {
        toValue: 90,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(entryAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(patternAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => router.push("/game"));
  };

  const fadePatternAndNavigate = (path: Parameters<typeof router.push>[0]) => {
    Animated.timing(patternAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => router.push(path));
  };

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  const backgroundClass = loading ? "bg-orange-400" : editionDetails.bgClass;
  const patternEmoji = loading
    ? DEFAULT_PATTERN_EMOJI
    : editionDetails.gridEmoji;

  return (
    <View
      className={`flex-1 items-center justify-center overflow-hidden transition-colors duration-300 ${backgroundClass}`}
    >
      <StatusBar barStyle="light-content" />

      <HomePatternBackground patternAnim={patternAnim} emoji={patternEmoji} />

      {/* --- FOREGROUND CONTENT --- */}
      <AnimatedView
        className="flex-1 items-center justify-center z-10 w-full px-6"
        style={{
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
          opacity: entryAnim,
          transform: [
            {
              translateY: entryAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <HomeMainCard
          flipInterpolate={flipInterpolate}
          editionDetails={editionDetails}
          onPressEdition={() => fadePatternAndNavigate("/library")}
        />

        <HomeActionButtons
          onQuickPlay={animateAndNavigateToGame}
          onOpenLibrary={() => fadePatternAndNavigate("/library")}
          onOpenSetup={() => fadePatternAndNavigate("/setup")}
        />
      </AnimatedView>
    </View>
  );
}
