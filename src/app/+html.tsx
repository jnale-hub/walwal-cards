import { ScrollViewStyleReset } from "expo-router/html";
import { PropsWithChildren } from "react";

const SITE_URL = "https://walwalcards.xyz";
const TITLE = "Walwal Cards: Inuman Na! 🍻";

export default function Html({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />

        <title>{TITLE}</title>
        <meta
          name="description"
          content="Ang pambansang laro ng barkada! Truth, Dare, Laglagan at iba pa. Perfect for inuman sessions. Play it for free!"
        />
        <meta
          name="keywords"
          content="walwal, drinking game, pinoy, tagalog truth or dare, inuman, barkada, card game, philippines, shot, walwalan"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />

        <meta name="theme-color" content="#fb923c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_PH" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta
          property="og:description"
          content="Sino ang marupok? Sino ang kuripot? Play the funniest Pinoy drinking game with your friends!"
        />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" href={SITE_URL} hrefLang="en" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}#website`,
                  url: SITE_URL,
                  name: "Walwal Cards",
                  description:
                    "Ang pambansang laro ng barkada! Truth, Dare, Laglagan at iba pa. Perfect for inuman sessions.",
                },
                {
                  "@type": "WebApplication",
                  "@id": `${SITE_URL}#webapp`,
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

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
