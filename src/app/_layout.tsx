import * as Font from "expo-font";
import { Stack } from "expo-router";
import Head from "expo-router/head";
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
  const SITE_URL = "https://walwalcards.xyz";

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

        <meta name="theme-color" content={PRIMARY_THEME_HEX} />
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
