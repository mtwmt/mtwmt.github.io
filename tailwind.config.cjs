const theme = require("./src/config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

function withOpacity(variableName) {
  console.log('variableName', variableName)
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      dosis: "Dosis",
    },
    extend: {
      textColor: {
        default: `var(--color-text)`,
        light: `var(--color-light-text)`,
        dark: `var(--color-dark-text)`,
      },
      backgroundColor: {
        default: `var(--color-background)`,
        light: `var(--color-light-background)`,
        dark: `var(--color-dark-text)`,
        border: `var(--color-border)`,
      },
      borderColor: {
        default: `var(--color-border)`,
      },
      colors: {
        primary: {
          50: `var(--color-primary-50)`,
          100: `var(--color-primary-100)`,
          200: `var(--color-primary-200)`,
          300: `var(--color-primary-300)`,
          400: `var(--color-primary-400)`,
          500: `var(--color-primary-500)`,
          600: `var(--color-primary-600)`,
          700: `var(--color-primary-700)`,
          800: `var(--color-primary-800)`,
          900: `var(--color-primary-900)`,
          A100: `var(--color-primary-A100)`,
          A200: `var(--color-primary-A200)`,
          A400: `var(--color-primary-A400)`,
          A700: `var(--color-primary-A700)`,
        },
      },
      // fontSize: {
      //   base: font_base + 'px',
      //   h1: h1 + 'rem',
      //   'h1-sm': h1 * 0.8 + 'rem',
      //   h2: h2 + 'rem',
      //   'h2-sm': h2 * 0.8 + 'rem',
      //   h3: h3 + 'rem',
      //   'h3-sm': h3 * 0.8 + 'rem',
      //   h4: h4 + 'rem',
      //   h5: h5 + 'rem',
      //   h6: h6 + 'rem',
      // },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      // strategy: "simple", // only generate global styles
      // strategy: "class", // only generate classes
    }),
  ],
};
