module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      dosis: "Dosis",
    },
    extend: {
      colors: {
        primary: {
          50: "#e0f5f5",
          100: "#b3e6e6",
          200: "#80d5d5",
          300: "#4dc4c4",
          400: "#26b7b7",
          500: "#00aaaa",
          600: "#00a3a3",
          700: "#009999",
          800: "#009090",
          900: "#007f7f",
          A100: "#adffff",
          A200: "#7affff",
          A400: "#47ffff",
          A700: "#2dffff",
        },
      },
    },
  },
  plugins: [],
};
