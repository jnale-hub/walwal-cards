/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        textMain: "#18181B",
        cardBg: "#FFFFFF",
        border: "#18181B",
      },
      fontFamily: {
        logo: ["LilitaOne"],
        body: ["Nunito-Regular"],
        bodyBold: ["Nunito-Bold"],
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
      },
    },
  },
  plugins: [],
}
