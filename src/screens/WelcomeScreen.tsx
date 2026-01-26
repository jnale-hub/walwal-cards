import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Platform, StatusBar, Text, View, useWindowDimensions } from "react-native";
import { GameButton } from "../components/GameButton";
import { FONT_FAMILY } from "../constants/fonts";
import { SHARED_STYLES } from "../constants/styles";
import { BG_COLORS, THEME } from "../constants/theme";

const AnimatedView = Animated.createAnimatedComponent(View);

// Duration of the loop (slower is usually better for background)
const DURATION = 80000; 

const InfiniteColumn = ({ 
  animValue, 
  direction = 'up', 
  columnIndex,
  chunkHeight
}: { 
  animValue: Animated.Value, 
  direction: 'up' | 'down', 
  columnIndex: number,
  chunkHeight: number
}) => {
  
  const emojiContent = useMemo(() => {
    const emojis = ["🍺", "🥴", "🍻"];
    const shuffled = [...emojis].sort(() => 0.5 - Math.random());
    const items = Array.from({ length: 12 }).map((_, i) => shuffled[i % emojis.length]);

    return (
      <View style={{ height: chunkHeight }} className="justify-around items-center">
        {items.map((emoji, i) => (
          <View key={i} className="p-2">
            <Text 
              style={{ 
                transform: [{ rotate: `${(i * 15 + columnIndex * 10) % 360}deg` }] 
              }}
              className="text-5xl opacity-50"
            >
              {emoji}
            </Text>
          </View>
        ))}
      </View>
    );
  }, [columnIndex, chunkHeight]);

  // Interpolation Logic
  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: direction === 'down' 
      ? [-chunkHeight, 0] 
      : [0, -chunkHeight]
  });

  return (
    <View className="flex-1 overflow-hidden relative min-w-[60px]">
      <AnimatedView style={{ transform: [{ translateY }] }}>
        {emojiContent}
        {emojiContent}
      </AnimatedView>
    </View>
  );
};

export const WelcomeScreen = () => {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Dynamic Layout Calculations
  const chunkHeight = SCREEN_HEIGHT * 1.5;
  // Calculate how many columns we need to cover the width. 
  // We assume roughly 70px per column + 2 extra for buffer/tilt coverage.
  const numColumns = Math.ceil(SCREEN_WIDTH / 70) + 2;
  
  // Animation Refs
  const flipOutAnim = useRef(new Animated.Value(0)).current; 
  const entryAnim = useRef(new Animated.Value(0)).current; 
  const scrollAnim = useRef(new Animated.Value(0)).current;

  // Infinite Scroll Loop
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: 1,
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [scrollAnim]);

  // Reset page transition animations
  useFocusEffect(
    useCallback(() => {
      flipOutAnim.setValue(0);
      Animated.timing(entryAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [flipOutAnim, entryAnim])
  );

  const animateAndNavigate = (path: Parameters<typeof router.push>[0]) => {
    Animated.parallel([
      Animated.timing(flipOutAnim, { toValue: 90, duration: 300, useNativeDriver: true }),
      Animated.timing(entryAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => router.push(path));
  };

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  // Memoize the grid so it doesn't re-render heavily on small updates
  const backgroundColumns = useMemo(() => {
    return Array.from({ length: numColumns }).map((_, i) => (
      <InfiniteColumn 
        key={i} 
        columnIndex={i}
        animValue={scrollAnim} 
        chunkHeight={chunkHeight}
        direction={i % 2 === 0 ? 'down' : 'up'}
      />
    ));
  }, [numColumns, chunkHeight, scrollAnim]);

  return (
    <View 
      className="flex-1 items-center justify-center overflow-hidden"
      style={{ backgroundColor: BG_COLORS[4] }}
    >
      <StatusBar barStyle="light-content" />

      {/* --- BACKGROUND LAYER --- */}
      <View 
        pointerEvents="none"
        className="absolute inset-0 z-0 flex-row justify-center opacity-80"
        style={{ 
          // Ensure container is larger than screen to hide edges when tilted
          width: SCREEN_WIDTH * 1.2, 
          height: SCREEN_HEIGHT * 1.2, 
          // Center the larger container
          left: -SCREEN_WIDTH * 0.1,
          top: -SCREEN_HEIGHT * 0.1,
          transform: [{ rotate: '-10deg' }] 
        }}
      >
         {backgroundColumns}
      </View>

      {/* --- FOREGROUND CONTENT --- */}
      <View 
        className="flex-1 items-center justify-center z-10 w-full px-6"
        style={{ 
          paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 20,
          paddingBottom: 20 
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
              transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }] 
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
              style={{ fontFamily: FONT_FAMILY.bodyBold, color: THEME.textMain }}
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
            textStyle={{ color: 'white' }}
          />
        </View>
      </View>
    </View>
  );
};
