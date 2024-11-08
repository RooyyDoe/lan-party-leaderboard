/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        ivory: {
          100: "#f9ecd6",
          200: "#f3d9a6",
          300: "#eec476",
          400: "#e7b446",
          500: "#F7E6CC", // base color
          600: "#d59e4c",
          700: "#b57a2d",
          800: "#8f5720",
          900: "#6a3a14",
        },
        charcoal: "#333333",
      },
    },
  },
  varients: {
    extend: {},
  },
  plugins: [],
};
