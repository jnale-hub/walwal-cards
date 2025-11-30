import { Stack } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <Head>
        <title>Walwal Cards - The Ultimate Drinking Game</title>
        <meta name="description" content="Play Walwal Cards online! The best Pinoy drinking game with Truth or Shot, Da Who, and more. No download required." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://walwal.expo.app/" />
        <meta property="og:title" content="Walwal Cards 🍻" />
        <meta property="og:description" content="Ready to get wasted? Play the ultimate drinking game with your friends now." />
        <meta property="og:image" content="https://walwal.expo.app//og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://walwal.expo.app/" />
        <meta property="twitter:title" content="Walwal Cards 🍻" />
        <meta property="twitter:description" content="Ready to get wasted? Play the ultimate drinking game with your friends now." />
        <meta property="twitter:image" content="https://walwal.expo.app/og-image.png" />
      </Head>
      
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="setup" />
      </Stack>
    </>
  );
}
