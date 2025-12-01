import * as Font from "expo-font";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { FONT_FAMILY } from "../src/constants/fonts";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function Layout() {
  const SITE_URL = "https://walwalcards.xyz";
  const THEME_COLOR = "#FB923C";

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await Font.loadAsync({
          [FONT_FAMILY.logo]: require("../assets/fonts/LilitaOne-Regular.ttf"),
          [FONT_FAMILY.body]: require("../assets/fonts/Nunito-Regular.ttf"),
          [FONT_FAMILY.bodyBold]: require("../assets/fonts/Nunito-Bold.ttf"),
        });
      } catch (err) {
        console.warn("Error loading fonts:", err);
      } finally {
        if (!mounted) return;
        setIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: THEME_COLOR }} />;
  }

  return (
    <>
      <Head>
        {/* --- Primary SEO --- */}
        <title>Walwal Cards: Inuman Na! 🍻</title>
        <meta name="description" content="Ang pambansang laro ng barkada! Truth, Dare, Laglagan at iba pa. Perfect for inuman sessions. Play it for free!" />
        <meta name="keywords" content="walwal, drinking game, pinoy, tagalog truth or dare, inuman, barkada, card game, philippines, shot, walwalan" />

        <meta name="theme-color" content={THEME_COLOR} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

        {/* --- Open Graph / Facebook / Messenger --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Walwal Cards: Inuman Na! 🍻" />
        <meta property="og:description" content="Sino ang marupok? Sino ang kuripot? Play the funniest Pinoy drinking game with your friends!" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* --- Twitter --- */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content="Walwal Cards: Inuman Na! 🍻" />
        <meta property="twitter:description" content="Ready to get wasted? Play the ultimate drinking game with your friends now." />
        <meta property="twitter:image" content={`${SITE_URL}/og-image.png`} />
      </Head>

      <StatusBar style="light" backgroundColor={THEME_COLOR} />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: THEME_COLOR },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="setup" />
      </Stack>
    </>
  );
}
