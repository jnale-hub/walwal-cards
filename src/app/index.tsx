import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmojiGrid } from "../components/EmojiGrid";
import { resolveEditionDisplay } from "../constants/edition";
import { useCards } from "../lib/CardsContext";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentEdition, editions } = useCards();

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

  const animateAndNavigate = (path: Parameters<typeof router.push>[0]) => {
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
    ]).start(() => router.push(path));
  };

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View
      className="flex-1 items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: editionDetails.bgColor }}
    >
      <StatusBar barStyle="light-content" />

      {/* Background Emoji Grid */}
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
          <EmojiGrid emoji={editionDetails.gridEmoji} />
        </AnimatedView>
      </View>

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
        {/* Main Card */}
        <AnimatedView
          style={[
            {
              width: "100%",
              maxWidth: 400,
              transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }],
            },
          ]}
          className="items-center justify-center shrink mb-4  aspect-[3/4]"
        >
          {/* Card Surface */}
          <View className="card-base bg-white border-[5px] border-black rounded-[32px] pt-[16%] pb-8 px-6 items-center w-full justify-between relative overflow-visible flex content-center">
            {/* Edition indicator badge */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => animateAndNavigate("/library")}
              className="absolute -top-4 right-4 flex-row items-center border-[3px] border-black rounded-full px-3 py-1.5 z-50"
              style={{ backgroundColor: editionDetails.color }}
            >
              <Text className="font-logo text-lg text-black uppercase tracking-tighter mt-1">
                {editionDetails.name}
              </Text>
              <Text className="text-xl ml-1">{editionDetails.icon}</Text>
            </TouchableOpacity>
            {/* Title Container */}
            <View
              className="items-center w-full"
              accessible
              accessibilityRole="header"
              accessibilityLabel="Walwal Cards"
            >
              {/* WALWAL */}
              <Text className="text-black font-logo text-[5.3rem] text-center tracking-[-5px] uppercase leading-[80px]">
                WALWAL
              </Text>

              {/* CARDS */}
              <Text
                accessible={true}
                accessibilityLabel="CARDS"
                className="text-black font-logo tracking-[-5px] uppercase -mt-2 text-center leading-[96px] items-start flex flex-row"
              >
                <Text className="text-[7rem] -mr-0.5">C</Text>
                <Text className="text-8xl -mr-0.5">ARD</Text>
                <Text className="text-[7rem]">S</Text>
              </Text>
            </View>

            {/* Central Images */}
            <View className="flex-row items-center justify-center -mt-6 w-full shrink">
              <Image
                source={require("../../assets/images/beer.png")}
                className="-mr-12"
                resizeMode="contain"
                accessible={false}
                style={{
                  width: 160,
                  height: 160,
                }}
              />
              <Image
                source={require("../../assets/images/laughing-face.png")}
                className="z-10"
                resizeMode="contain"
                accessible={false}
                style={{
                  width: 160,
                  height: 160,
                }}
              />
            </View>

            {/* Footer Text */}
            <Text className="text-black text-xs tracking-[4px] uppercase mt-auto text-center">
              Drink responsibly
            </Text>
          </View>
        </AnimatedView>

        {/* Action Buttons Column */}
        <View className="w-full max-w-[400px] z-20 shrink-0 mt-6 gap-y-4">
          {/* Quick Play Button */}
          <View className="w-full relative h-[72px]">
            {/* Button Shadow */}
            <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => animateAndNavigate("/game")}
              accessibilityRole="button"
              accessibilityLabel="Quick Play"
              accessibilityHint="Start a game immediately"
              className="flex-1 flex-row bg-[#FDE047] border-[4px] border-black rounded-[24px] items-center justify-center pt-2"
            >
              <FontAwesome5
                name="play"
                size={24}
                color="black"
                style={{ marginBottom: 4 }}
              />
              <Text className="font-logo text-4xl text-black uppercase tracking-tighter ml-3">
                QUICK PLAY
              </Text>
            </TouchableOpacity>
          </View>

          {/* Secondary Buttons Row */}
          <View className="flex-row w-full justify-between gap-x-4">
            {/* Library Button */}
            <View className="flex-1 relative h-[64px]">
              {/* Button Shadow */}
              <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => animateAndNavigate("/library")}
                accessibilityRole="button"
                accessibilityLabel="Library"
                accessibilityHint="Choose a card edition"
                className="flex-1 flex-row bg-[#A855F7] border-[4px] border-black rounded-[24px] items-center justify-center pt-1"
              >
                <FontAwesome5
                  name="layer-group"
                  size={20}
                  color="black"
                  style={{ marginBottom: 2 }}
                />
                <Text className="font-logo text-[28px] text-black tracking-tighter uppercase ml-2">
                  LIBRARY
                </Text>
              </TouchableOpacity>
            </View>

            {/* Add Players Button */}
            <View className="flex-1 relative h-[64px]">
              {/* Button Shadow */}
              <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => animateAndNavigate("/setup")}
                accessibilityRole="button"
                accessibilityLabel="Add Players"
                accessibilityHint="Open player setup before starting the game"
                className="flex-1 flex-row bg-[#F97316] border-[4px] border-black rounded-[24px] items-center justify-center pt-1"
              >
                <FontAwesome5
                  name="users"
                  size={20}
                  color="black"
                  style={{ marginBottom: 2 }}
                />
                <Text className="font-logo text-[28px] text-black tracking-tighter uppercase ml-2">
                  PLAYERS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AnimatedView>
    </View>
  );
}
