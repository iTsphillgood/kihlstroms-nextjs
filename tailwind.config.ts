import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f7f9",
          100: "#e6ecf0",
          200: "#c8d5dd",
          300: "#9db2c0",
          400: "#6c8a9e",
          500: "#4a6b81",
          600: "#365468",
          700: "#284254",
          800: "#1a2f3d",
          900: "#10222d",
          950: "#0a1820"
        },
        brand: {
          blue: "#1B5FAA",
          blueDark: "#13477F",
          red: "#C8102E",
          teal: "#0E7490"
        }
      },
      fontFamily: {
        sans: [
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,34,45,.06), 0 8px 24px -12px rgba(16,34,45,.18)",
        lifted: "0 2px 4px rgba(16,34,45,.08), 0 20px 44px -16px rgba(16,34,45,.28)"
      },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in": { from: { opacity: "0", transform: "translateX(24px)" }, to: { opacity: "1", transform: "translateX(0)" } }
      },
      animation: {
        "fade-in": "fade-in .5s ease both",
        "slide-in": "slide-in .45s ease both"
      }
    }
  },
  plugins: []
};
export default config;
