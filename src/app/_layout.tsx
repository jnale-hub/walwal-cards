import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { PRIMARY_THEME_HEX } from "../constants/theme";
import "../global.css";
import { AuthProvider } from "../lib/AuthContext";
import { CardsProvider } from "../lib/CardsContext";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function Layout() {
  const [fontsLoaded] = Font.useFonts({
    RobotoCondensed_900Black: require("../../assets/fonts/Roboto_Condensed-Black.ttf"),
    RobotoCondensed_700Bold: require("../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && Platform.OS !== "web") {
    return <View className="flex-1 bg-orange-400" />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={PRIMARY_THEME_HEX} />

      <AuthProvider>
        <CardsProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="index" options={{ animation: "fade" }} />
            <Stack.Screen
              name="library"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen name="game" options={{ animation: "fade" }} />
            <Stack.Screen
              name="setup"
              options={{ animation: "slide_from_right" }}
            />
          </Stack>
        </CardsProvider>
      </AuthProvider>
    </>
  );
}
