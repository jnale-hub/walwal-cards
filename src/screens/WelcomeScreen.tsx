import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { GameButton } from "../components/GameButton";
import { THEME, BG_COLORS, LAYOUT } from "../constants/theme";

export const WelcomeScreen = () => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const flipOutAnim = useRef(new Animated.Value(0)).current; 
  const circleAnim = useRef(new Animated.Value(1)).current; 

  useFocusEffect(
    useCallback(() => {
      flipOutAnim.setValue(0);
      circleAnim.setValue(1);
    }, [flipOutAnim, circleAnim])
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [scaleAnim]);

  // Helper to trigger exit animation then navigate
  const animateAndNavigate = (path: string) => {
    Animated.parallel([
      Animated.timing(flipOutAnim, { toValue: 90, duration: 300, useNativeDriver: true }),
      Animated.timing(circleAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      // @ts-ignore - expo router typing quirk
      router.push(path);
    });
  };

  const handleQuickPlay = () => animateAndNavigate("/game");
  const handleSetup = () => animateAndNavigate("/setup");

  const flipInterpolate = flipOutAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  const circleScale = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 1],
  });

  return (
    <View style={styles.centerContainer}>
      {/* Decor */}
      <Animated.View style={[styles.decorativeCircle1, { opacity: circleAnim, transform: [{ scale: circleScale }] }]} />
      <Animated.View style={[styles.decorativeCircle2, { opacity: circleAnim, transform: [{ scale: circleScale }] }]} />

      <View style={styles.contentContainer}>
        {/* Welcome Card */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.welcomeCard,
            { transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }] },
          ]}
        >
          <Text style={styles.titleText}>Walwal Cards</Text>
          <View style={styles.heroEmojiContainer}>
            <Animated.Text style={[styles.emojiHero, { transform: [{ scale: scaleAnim }] }]}>🥴</Animated.Text>
            <Animated.Text style={[styles.emojiHero, { transform: [{ scale: scaleAnim }], marginLeft: -24 }]}>🍻</Animated.Text>
          </View>
          <View>
            <Text style={[styles.subtitleText, { fontSize: 22, fontWeight: "bold", marginBottom: 8 }]}>Warning!</Text>
            <Text style={styles.subtitleText}>
              Ang larong ito ay nagdudulot ng <Text style={{ letterSpacing: 1 }}>tawa, hiya</Text> at <Text style={{ letterSpacing: 1, textDecorationLine: "underline" }}>hangover</Text>!
            </Text>
          </View>
          <Text style={styles.disclaimerText}>Drink responsibly.</Text>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <GameButton 
            onPress={handleQuickPlay} 
            text="Quick Play" 
            variant="primary"
            style={styles.menuButton} 
          />
          <GameButton 
            onPress={handleSetup} 
            text="Add Players" 
            variant="secondary"
            // Using StyleSheet.flatten to satisfy strict type checking
            style={StyleSheet.flatten([
              styles.menuButton, 
              { 
                marginBottom: 0, 
                backgroundColor: 'transparent', 
                borderColor: 'white' 
              }
            ])} 
            textStyle={{ color: 'white' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: BG_COLORS[4],
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 24,
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
  welcomeCard: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    marginBottom: 0,
  },
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
  buttonContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    width: '100%',
  },
  // Unified style for both buttons
  menuButton: {
    width: 260, // Fixed width ensures they are identical size
    marginBottom: 16,
  },
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
});
