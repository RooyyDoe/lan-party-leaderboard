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
          100: "#fbf8f4",
          200: "#f7f1e8",
          300: "#f3e9dc",
          400: "#efe2d0",
          500: "#eee5da", // base color
          600: "#d6cbc0",
          700: "#b6aba1",
          800: "#968b81",
          900: "#766c63",
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
