import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EmojiGrid } from "../components/EmojiGrid";
import { GameButton } from "../components/GameButton";
import { BG_COLORS } from "../constants/theme";
import { useDeck } from "../context/DeckContext";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WelcomeScreen() {
  const router = useRouter();
  const { currentEdition } = useDeck();

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

  return (
    <View
      className="flex-1 items-center justify-center overflow-hidden"
      style={{ backgroundColor: BG_COLORS[4] }}
    >
      <StatusBar barStyle="light-content" />

      {/* Background Pattern */}
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
          <EmojiGrid emoji={currentEdition.emoji} />
        </AnimatedView>
      </View>

      {/* --- FOREGROUND CONTENT --- */}
      <View
        className="flex-1 items-center justify-center z-10 w-full px-6"
        style={{
          paddingTop:
            Platform.OS === "android"
              ? (StatusBar.currentHeight || 0) + 20
              : 60,
          paddingBottom: 30,
        }}
      >
        {/* Main Card */}
        <AnimatedView
          style={[
            {
              width: "100%",
              maxWidth: 420,
              aspectRatio: 2.5 / 3,
              maxHeight: "55%",
              transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }],
            },
          ]}
          className="items-center justify-center shrink shadow-xl mb-6"
        >
          <View className="flex-1 items-center justify-center w-full card-base p-6">
            {/* Edition Emoji Indicator */}
            <Text className="text-5xl mb-2">{currentEdition.emoji}</Text>

            <Text className="text-textMain font-logo text-5xl text-center tracking-tighter leading-tight">
              WALWAL{"\n"}CARDS
            </Text>

            <Text className="text-textMain font-bodyBold text-[10px] opacity-40 tracking-[3px] uppercase absolute bottom-8">
              Drink responsibly
            </Text>
          </View>
        </AnimatedView>

        {/* Edition Selector - Tappable Badge below card */}
        <TouchableOpacity
          onPress={() => animateAndNavigate("/editions" as any)}
          className="flex-row items-center bg-white/15 rounded-full px-5 py-2.5 mb-6"
          activeOpacity={0.7}
        >
          <Text className="text-white font-bold text-base mr-2">
            {currentEdition.name}
          </Text>
          <Ionicons name="chevron-down" size={18} color="white" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="w-full items-center gap-y-3 z-20 shrink-0">
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

        {/* Bottom Toolbar */}
        <View className="absolute bottom-8 right-6">
          <TouchableOpacity
            onPress={() => animateAndNavigate("/cards" as any)}
            className="w-12 h-12 bg-black/20 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="albums-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
