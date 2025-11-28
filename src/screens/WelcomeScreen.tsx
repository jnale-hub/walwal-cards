import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, Animated, StyleSheet, Platform, StatusBar as RNStatusBar, Dimensions } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { GameButton } from "../components/GameButton";
import { THEME, BG_COLORS, LAYOUT } from "../constants/theme";

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

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
        <Animated.View
          style={[
            styles.cardBase,
            styles.welcomeCard,
            { transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }] },
          ]}
        >
          <Text 
            style={styles.titleText} 
            adjustsFontSizeToFit 
            minimumFontScale={0.5}
          >
            Walwal Cards
          </Text>

          <View style={styles.heroEmojiContainer}>
            <Animated.Text style={[styles.emojiHero, { transform: [{ scale: scaleAnim }] }]}>🥴</Animated.Text>
            <Animated.Text style={[styles.emojiHero, { transform: [{ scale: scaleAnim }], marginLeft: -24 }]}>🍻</Animated.Text>
          </View>
          
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text 
              style={[styles.subtitleText, { fontSize: 22, fontWeight: "bold", marginBottom: 4 }]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              Warning!
            </Text>
            <Text 
              style={styles.subtitleText}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              Ang larong ito ay nagdudulot ng <Text style={{ letterSpacing: 1 }}>tawa, hiya</Text> at <Text style={{ letterSpacing: 1, textDecorationLine: "underline" }}>hangover</Text>!
            </Text>
          </View>
          
          <Text style={styles.disclaimerText}>Drink responsibly.</Text>
        </Animated.View>

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
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1, 
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
    aspectRatio: LAYOUT.cardWidth / LAYOUT.cardHeight, 
    maxWidth: '90%', 
    maxHeight: '55%',
    marginBottom: 20, 
  },
  titleText: {
    fontSize: isSmallDevice ? 36 : 40,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: -1,
  },
  subtitleText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: THEME.textMain,
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.8,
  },
  disclaimerText: {
    fontSize: 12,
    color: THEME.textMain,
    opacity: 0.5,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  menuButton: {
    width: 260,
    maxWidth: '100%',
    marginBottom: 12,
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
    fontSize: isSmallDevice ? 60 : 72,
    marginBottom: 16,
    textAlign: "center",
  },
});
