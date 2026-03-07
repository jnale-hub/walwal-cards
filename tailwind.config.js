/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      colors: {
        textMain: "#18181B",
        cardBg: "#FFFFFF",
        border: "#18181B",
      },
      fontFamily: {
        logo: ["RobotoCondensed_900Black", ...defaultTheme.fontFamily.sans],
        body: defaultTheme.fontFamily.sans,
        bodyBold: ["RobotoCondensed_700Bold", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'card': '32px',
      },
      borderWidth: {
        '6': '6px',
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
        card: "8px 8px 0px 0px #18181B",
        "card-sm": "4px 4px 0px 0px #18181B"
      },
    },
  },
  plugins: [],
}
