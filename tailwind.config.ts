import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // dourado principal
          600: "#d97706", // dourado escuro
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        neutral: {
          900: "#0a0a0a",
          800: "#1f1f1f",
          700: "#404040",
          100: "#f5f5f5",
        },
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
