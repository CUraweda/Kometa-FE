/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emeraldGreen: "#0E8388",
        deepBlue: "#305986",
        darkMetal: "#EBEBEB",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0E8388",
        },
      },
    ],
  },

};
