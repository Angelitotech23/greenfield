import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f1ea",
          100: "#e8e0d0",
          800: "#1c1914",
          900: "#12100c",
          950: "#0b0a07",
        },
        seal: {
          white: "#e8e4dc",
          yellow: "#e8b84a",
          green: "#2f9e6b",
        },
        paper: "#f7f3ea",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
