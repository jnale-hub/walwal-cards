import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
} from "react-native";

// =============================================================================
// CONFIGURATION & DATA
// =============================================================================

const DECK = [
  // --- WHO'S THIS? (Ituro ang salarin) ---
  { type: "Da Who?", prompt: "Pinaka-marupok sa ex. Shot!", emoji: "🤡" },
  { type: "Da Who?", prompt: "Pinaka-conyo magsalita. Shot!", emoji: "💅" },
  { type: "Da Who?", prompt: "Pinaka-iyakin kapag lasing. Shot!", emoji: "😭" },
  {
    type: "Da Who?",
    prompt: "Laging late? Filipino time yarn? Shot!",
    emoji: "⏰",
  },
  { type: "Da Who?", prompt: "Pinaka-kuripot sa barkada. Shot!", emoji: "💸" },
  {
    type: "Da Who?",
    prompt: "Laging 'On The Way' pero naliligo pa lang. Shot!",
    emoji: "🚿",
  },
  {
    type: "Da Who?",
    prompt: "Pinaka-mabilis mag-reply sa chat (seen lord). Shot!",
    emoji: "👀",
  },
  { type: "Da Who?", prompt: "Pinaka-Tito/Tita pumorma. Shot!", emoji: "👕" },
  { type: "Da Who?", prompt: "Pinaka-maingay tumawa. Shot!", emoji: "🤣" },
  {
    type: "Da Who?",
    prompt: "Laging nawawala sa inuman (Ninja moves). Shot!",
    emoji: "🥷",
  },
  {
    type: "Da Who?",
    prompt: "Pinaka-malakas mag-aya pero unang natutulog. Shot!",
    emoji: "💤",
  },
  { type: "Da Who?", prompt: "Pinaka-strict ang parents. Shot!", emoji: "🚫" },
  { type: "Da Who?", prompt: "Pinaka-drawing sa lakad. Shot!", emoji: "🎨" },
  {
    type: "Da Who?",
    prompt: "Laging gutom kahit kakatapos lang kumain. Shot!",
    emoji: "🍗",
  },
  {
    type: "Da Who?",
    prompt: "Pinaka-maalam sa chismis. The Source. Shot!",
    emoji: "🍵",
  },
];

const BG_COLORS = [
  "#F472B6", // Pink
  "#FACC15", // Yellow
  "#22D3EE", // Cyan
  "#C084FC", // Violet
  "#FB923C", // Orange
  "#4ADE80", // Green
];

const THEME = {
  cardBg: "#FFFFFF",
  textMain: "#18181B",
  border: "#18181B",
};

const SCREEN_DIMS = Dimensions.get("window");
const LAYOUT = {
  emojiSize: 48,
  emojiMargin: 16,
  cardWidth: 320,
  cardHeight: 440,
};

// =============================================================================
// REUSABLE COMPONENTS
// =============================================================================

/**
 * Shared Button Component
 */
const GameButton = ({
  onPress,
  text,
  style,
}: {
  onPress: () => void;
  text: string;
  style?: any;
}) => (
  <TouchableOpacity
    style={[styles.gameButton, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.gameButtonText}>{text}</Text>
  </TouchableOpacity>
);

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  const [started, setStarted] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Removed parent Fade animation to allow individual screens to manage flip transitions */}
      <View style={{ flex: 1 }}>
        {!started ? <WelcomeScreen onStart={handleStart} /> : <GameScreen />}
      </View>
    </View>
  );
}

// =============================================================================
// SCREENS
// =============================================================================

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const flipOutAnim = useRef(new Animated.Value(0)).current; // 0 -> 90deg
  const circleAnim = useRef(new Animated.Value(1)).current; // 1 -> 0 (Scale/Opacity)

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  const handlePressStart = () => {
    // Animate everything out in parallel
    Animated.parallel([
      // 1. Flip card to edge
      Animated.timing(flipOutAnim, {
        toValue: 90,
        duration: 300,
        useNativeDriver: true,
      }),
      // 2. Expand and fade decorative circles
      Animated.timing(circleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onStart();
    });
  };

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  // Inverse interpolation: As circleAnim goes 1 -> 0, Scale goes 1 -> 12
  const circleScale = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 1],
  });

  return (
    <View style={styles.centerContainer}>
      {/* Decor - Now Animated to Expand */}
      <Animated.View
        style={[
          styles.decorativeCircle1,
          {
            opacity: circleAnim,
            transform: [{ scale: circleScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle2,
          {
            opacity: circleAnim,
            transform: [{ scale: circleScale }],
          },
        ]}
      />

      <View style={styles.contentContainer}>
        {/* Welcome Card with Flip Animation */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.welcomeCard,
            {
              transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }],
            },
          ]}
        >
          <Text style={styles.titleText}>Walwal Cards</Text>

          <View style={styles.heroEmojiContainer}>
            <Animated.Text
              style={[styles.emojiHero, { transform: [{ scale: scaleAnim }] }]}
            >
              🥴
            </Animated.Text>
            <Animated.Text
              style={[
                styles.emojiHero,
                { transform: [{ scale: scaleAnim }], marginLeft: -24 },
              ]}
            >
              🍻
            </Animated.Text>
          </View>

          <View>
            <Text
              style={[
                styles.subtitleText,
                { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
              ]}
            >
              Warning!
            </Text>

            <Text style={styles.subtitleText}>
              Ang larong ito ay nagdudulot ng{" "}
              <Text style={{ letterSpacing: 1}}>
                tawa, hiya
              </Text>{" "}
              at{" "}
              <Text
                style={{
                  letterSpacing: 1,
                  textDecorationLine: "underline",
                }}
              >
                hangover
              </Text>
              !
            </Text>
          </View>

          <Text style={styles.disclaimerText}>Drink responsibly.</Text>
        </Animated.View>

        {/* Action */}
        <View style={styles.buttonContainer}>
          <GameButton onPress={handlePressStart} text="Quick Start!" />
        </View>
      </View>
    </View>
  );
}

function GameScreen() {
  const [index, setIndex] = useState(0);
  const [bg, setBg] = useState(BG_COLORS[4]);
  const [isFlipped, setIsFlipped] = useState(false);

  // Animations & Refs
  const bgAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current; // For card interaction
  const entryAnim = useRef(new Animated.Value(-90)).current; // For entry flip (-90 -> 0)
  const patternAnim = useRef(new Animated.Value(0)).current; // For pattern opacity
  const prevBgRef = useRef(bg);

  // Derived Data
  const emoji = useMemo(() => DECK[index].emoji, [index]);

  // Entry Animation (Complete the flip started in WelcomeScreen)
  useEffect(() => {
    Animated.timing(entryAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [entryAnim]);

  const entryInterpolate = entryAnim.interpolate({
    inputRange: [-90, 0],
    outputRange: ["-90deg", "0deg"],
  });

  // Handle Background Transition
  useEffect(() => {
    bgAnim.setValue(0);
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false, // Color interpolation isn't supported by native driver
    }).start(() => {
      prevBgRef.current = bg;
    });
  }, [bg, bgAnim]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevBgRef.current, bg],
  });

  // Handle Pattern Opacity Transition
  useEffect(() => {
    Animated.timing(patternAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, patternAnim]);

  // Flip Animations
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  // Optimized Grid Generation
  const emojiGrid = useMemo(() => {
    const cellSize = LAYOUT.emojiSize + LAYOUT.emojiMargin * 2;
    const numRows = Math.ceil(SCREEN_DIMS.height / cellSize) + 1;
    const numCols = Math.ceil(SCREEN_DIMS.width / cellSize) + 1;

    return Array.from({ length: numRows }).map((_, row) => (
      <View key={`row-${row}`} style={{ flexDirection: "row" }}>
        {Array.from({ length: numCols }).map((_, col) => {
          const rotate = (row + col) % 2 === 0 ? "-15deg" : "15deg";
          return (
            <View
              key={`c-${row}-${col}`}
              style={{ margin: LAYOUT.emojiMargin, transform: [{ rotate }] }}
            >
              <Text style={{ fontSize: LAYOUT.emojiSize }}>{emoji}</Text>
            </View>
          );
        })}
      </View>
    ));
  }, [emoji]);

  const flipCard = useCallback(() => {
    if (isFlipped) return;
    setIsFlipped(true);
    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, flipAnim]);

  const handleNext = useCallback(() => {
    // 1. Flip back
    setIsFlipped(false);
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    // 2. Change content after flip starts (invisible state)
    setTimeout(() => {
      let nextIndex = index;
      if (DECK.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * DECK.length);
        } while (nextIndex === index);
      }
      let nextBg = bg;
      if (BG_COLORS.length > 1) {
        do {
          nextBg = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
        } while (nextBg === bg);
      }
      setIndex(nextIndex);
      setBg(nextBg);
    }, 100);
  }, [index, bg, flipAnim]);

  return (
    <Animated.View style={[styles.centerContainer, { backgroundColor }]}>
      {/* Background Pattern */}
      <View style={[StyleSheet.absoluteFillObject, styles.patternContainer]}>
        <Animated.View
          style={{
            opacity: patternAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
            transform: [{ scale: 1.1 }],
          }}
        >
          {emojiGrid}
        </Animated.View>
      </View>

      {/* Tap Overlay (Visible on Front Face) */}
      {!isFlipped && (
        <TouchableOpacity
          style={styles.touchOverlay}
          onPress={flipCard}
          activeOpacity={1}
        />
      )}

      {/* Card Wrapper with Entry Animation */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [
              { perspective: 1000 },
              { rotateY: entryInterpolate }, // Animate from -90 to 0 on mount
            ],
          },
        ]}
      >
        {/* Front Face */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.cardFace,
            {
              transform: [{ rotateY: frontInterpolate }],
              opacity: frontOpacity,
            },
          ]}
        >
          <Text style={styles.cardEmoji}>{emoji}</Text>
          <Text style={styles.tapToReveal}>Tap to reveal</Text>
        </Animated.View>

        {/* Back Face */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.cardFace,
            { transform: [{ rotateY: backInterpolate }], opacity: backOpacity },
          ]}
        >
          <Text style={styles.cardEmojiSmall}>{emoji}</Text>
          <View style={[styles.typeBadge, { backgroundColor: bg }]}>
            <Text style={styles.typeText}>{DECK[index].type}</Text>
          </View>
          <Text style={styles.cardPrompt}>{DECK[index].prompt}</Text>
        </Animated.View>
      </Animated.View>

      {/* Controls */}
      <View style={styles.buttonContainer}>
        {isFlipped && <GameButton onPress={handleNext} text="Next Card" />}
      </View>
    </Animated.View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  // --- Layout Containers ---
  container: {
    flex: 1,
    backgroundColor: BG_COLORS[4],
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 24,
  },
  patternContainer: {
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  buttonContainer: {
    height: 80,
    marginTop: 40,
    justifyContent: "center",
    zIndex: 20,
  },

  // --- Components: Card ---
  cardContainer: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    zIndex: 10,
  },
  cardBase: {
    backgroundColor: THEME.cardBg,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: THEME.border,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardFace: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  welcomeCard: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    marginBottom: 0,
    // Note: backfaceVisibility logic isn't needed here as it's not flipping to reveal a back side locally
  },

  // --- Components: Button ---
  gameButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 999,
    borderWidth: 6,
    borderColor: THEME.border,
    backgroundColor: THEME.cardBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  gameButtonText: {
    color: THEME.textMain,
    fontSize: 18,
    fontWeight: "bold",
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
  },

  // --- Typography ---
  titleText: {
    fontSize: 42,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: -1,
  },
  subtitleText: {
    fontSize: 18,
    color: THEME.textMain,
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.8,
  },
  disclaimerText: {
    fontSize: 14,
    color: THEME.textMain,
    opacity: 0.5,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 16,
  },
  cardPrompt: {
    color: THEME.textMain,
    fontSize: 24,
    textAlign: "center",
    lineHeight: 34,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  tapToReveal: {
    color: THEME.textMain,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
  },
  typeText: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: THEME.textMain,
  },

  // --- Decorative ---
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  heroEmojiContainer: {
    flexDirection: "row",
    overflow: "visible",
  },
  emojiHero: {
    fontSize: 90,
    marginBottom: 32,
    textAlign: "center",
  },
  cardEmoji: {
    fontSize: 100,
    marginBottom: 16,
  },
  cardEmojiSmall: {
    fontSize: 40,
    marginBottom: 16,
  },
});
