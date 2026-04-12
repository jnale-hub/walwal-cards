/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      colors: {
        cardBg: "#FFFFFF",
      },
      fontFamily: {
        logo: ["RobotoCondensed_900Black"],
        body: ["sans-serif"],
        bodyBold: ["RobotoCondensed_700Bold"],
      },
      boxShadow: {
        200: "2px 2px 0px 0px #0a0a0a",
        "card-sm": "2px 2px 0px 0px #0a0a0a"
      },
    },
  },
  plugins: [],
}
