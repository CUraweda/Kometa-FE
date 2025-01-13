/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        kometa: "url('./kometa-bg.png')",
      },
      colors: {
        emeraldGreen: "#0E8388",
        deepBlue: "#305986",
        darkMetal: "#EBEBEB",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
