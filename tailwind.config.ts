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
        cover: {
          DEFAULT: "#0a0a0a",
          deep: "#050505",
          rose: "#d4af37",
        },
        foil: {
          DEFAULT: "#d4af37",
          bright: "#f3e0a3",
          dim: "#a8935e",
        },
        ink: {
          50: "#f2f0eb",
          100: "#e8e4dc",
          600: "#8a8580",
          800: "#cfc9c0",
          900: "#f2f0eb",
          950: "#ffffff",
        },
        seal: {
          void: "#6b6660",
          amber: "#d4af37",
          green: "#3dcf8e",
        },
        paper: {
          DEFAULT: "#0a0a0a",
          raised: "#141414",
          rule: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        folio: "0 30px 80px -40px rgba(212, 175, 55, 0.25)",
        stamp: "none",
      },
    },
  },
  plugins: [],
};

export default config;
