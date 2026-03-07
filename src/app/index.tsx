import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmojiGrid } from "../components/EmojiGrid";
import { BG_COLORS } from "../constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
          <EmojiGrid emoji="🥴" />
        </AnimatedView>
      </View>

      {/* --- FOREGROUND CONTENT --- */}
      <View
        className="flex-1 items-center justify-center z-10 w-full px-6"
        style={{
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
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
          className="items-center justify-center shrink mb-8 relative"
        >
          {/* Neo-brutalist Solid Shadow View */}
          <View className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-black rounded-[32px]" />

          {/* Card Surface */}
          <View className="bg-white border-[5px] border-black rounded-[32px] pt-10 xs:pt-16 pb-8 px-6 items-center w-full aspect-[3/4] justify-between relative overflow-visible flex content-center">
            {/* Title Container */}
            <View
              className="items-center w-full"
              accessible
              accessibilityRole="header"
              accessibilityLabel="Walwal Cards"
            >
              {/* WALWAL */}
              <Text className="text-black font-logo font-extrabold text-[5.3rem] text-center tracking-[-5px] uppercase leading-[80px]">
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
            <View className="flex-row items-center justify-center -m-6 w-full">
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

        {/* Buttons Row */}
        <View className="flex-row w-full max-w-[400px] justify-between gap-x-4 z-20 shrink-0 mt-8">
          {/* Quick Play Button */}
          <View className="flex-1 relative aspect-square">
            {/* Button Shadow */}
            <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => animateAndNavigate("/game")}
              accessibilityRole="button"
              accessibilityLabel="Quick Play"
              accessibilityHint="Start a game immediately"
              className="flex-1 bg-[#FDE047] border-[4px] border-black rounded-[24px] items-center justify-center p-2"
            >
              <FontAwesome5 name="play" size={40} color="black" />
              <Text className="font-logo text-4xl text-black text-center mt-2 uppercase leading-8 tracking-tighter">
                Quick{"\n"}Play
              </Text>
            </TouchableOpacity>
          </View>

          {/* Add Players Button */}
          <View className="flex-1 relative aspect-square">
            {/* Button Shadow */}
            <View className="absolute top-1.5 left-1.5 right-[-6px] bottom-[-6px] bg-black rounded-[24px]" />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => animateAndNavigate("/setup")}
              accessibilityRole="button"
              accessibilityLabel="Add Players"
              accessibilityHint="Open player setup before starting the game"
              className="flex-1 bg-[#F97316] border-[4px] border-black rounded-[24px] items-center justify-center p-2"
            >
              <FontAwesome5 name="plus" size={40} color="black" />
              <Text className="font-logo text-4xl text-black text-center mt-2 leading-8 tracking-tighter uppercase">
                Add{"\n"}Players
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
