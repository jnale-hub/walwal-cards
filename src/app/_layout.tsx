import * as Font from "expo-font";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DeckProvider } from "../context/DeckContext";
import "../global.css";

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
          LilitaOne: require("../../assets/fonts/LilitaOne-Regular.ttf"),
          "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
          "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
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
        <meta
          name="description"
          content="Ang pambansang laro ng barkada! Truth, Dare, Laglagan at iba pa. Perfect for inuman sessions. Play it for free!"
        />
        <meta
          name="keywords"
          content="walwal, drinking game, pinoy, tagalog truth or dare, inuman, barkada, card game, philippines, shot, walwalan"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Language" content="en" />
        <link rel="canonical" href={SITE_URL} />

        <meta name="theme-color" content={THEME_COLOR} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />

        {/* --- Open Graph / Facebook / Messenger --- */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_PH" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Walwal Cards: Inuman Na! 🍻" />
        <meta
          property="og:description"
          content="Sino ang marupok? Sino ang kuripot? Play the funniest Pinoy drinking game with your friends!"
        />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* --- Favicons --- */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" href={SITE_URL} hrefLang="en" />

        {/* --- Structured data (JSON-LD) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": SITE_URL + "#website",
                  url: SITE_URL,
                  name: "Walwal Cards",
                  description:
                    "Ang pambansang laro ng barkada! Truth, Dare, Laglagan at iba pa. Perfect for inuman sessions.",
                },
                {
                  "@type": "WebApplication",
                  "@id": SITE_URL + "#webapp",
                  name: "Walwal Cards",
                  url: SITE_URL,
                  applicationCategory: "Game",
                  operatingSystem: "Web",
                  description:
                    "Play the ultimate Pinoy drinking game with your friends.",
                },
              ],
            }),
          }}
        />

        {/* --- Google Analytics --- */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z3WC7M0E5Z"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-Z3WC7M0E5Z');
            `,
          }}
        />
      </Head>

      <StatusBar style="light" backgroundColor={THEME_COLOR} />

      <DeckProvider>
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
          <Stack.Screen name="cards" />
          <Stack.Screen name="editions" />
        </Stack>
      </DeckProvider>
    </>
  );
}
