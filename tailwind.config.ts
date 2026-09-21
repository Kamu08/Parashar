import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          canvas: "#FAF9F5",      // Main luxury canvas background
          stone: "#F0EEE6",       // Card, dropdown, modal backgrounds
          stoneHover: "#E6E3D8",  // Subtle hover state
          border: "#E2DFD7",      // Soft luxury borders
          borderDark: "#D2CDBF",  // Slightly darker border
          charcoal: "#1A1A18",    // Primary typography
          charcoalMuted: "#4A4944", // Secondary body text
          muted: "#73716B",       // Captions & specs text
          brass: "#C5A059",       // Primary brass accent
          brassHover: "#B38F48",  // Hover brass accent
          brassLight: "#F7F3EA",  // Light brass tint tag
          accentDark: "#111110",  // Dark hero & footer CTA background
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        widestLuxury: "0.25em",
        mega: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
