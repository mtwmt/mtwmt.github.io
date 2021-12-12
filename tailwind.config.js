const { fontFamily, spacing } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      dosis: "Dosis",
      sans: [...fontFamily.sans],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      inset: {
        1: "1rem",
        2: "1.5rem",
      },
      zIndex: {
        999: 999,
      },
      spacing: {
        "2-rev": `-${spacing["2"]}`,
      },
      boxShadow: {
        common: "var(--shadow)",
        "card-side": "0px 2px 0 var(--gray-light)",
        card: "4px 4px 0 var(--gray-light)",
        btn: "2px 2px 0 #007f7f",
      },
      maxWidth: {
        32: "8rem",
      },
      minHeight: {
        128: "32rem",
      },
      maxHeight: {
        220: "55rem",
      },
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
        secondary: "var(--secondary)",
        "gray-light": "var(--gray-light)",
        "gray-medium": "var(--gray-medium)",
        "gray-dark": "var(--gray-dark)",
        text: "var(--text-color)",
        oreilly: {
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
