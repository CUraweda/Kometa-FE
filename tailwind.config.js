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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0E8388",
          "primary-content": "#ffffff",
          secondary: "#0E8388",
          accent: "#E7EFEB",
          neutral: "#0E8388",
          "base-100": "#ffffff",
          info: "#06b6d4",
          success: "#04805A",
          warning: "#D6A31F",
          error: "#BC2020",
          ".btn-outline": {
            "border-color": "#0E8388",
            "color": "#0E8388"
          },
          ".btn-outline:hover": {
            "background-color": "transparent",
            "border-color": "#0E8388",
            "color": "#0E8388"
          },
        },
      },
      "light",
    ],
  },
};
