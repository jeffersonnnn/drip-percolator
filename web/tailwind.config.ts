import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#0d1117",
        "surface-2": "#131820",
        "surface-3": "#1a2030",
        border: "#1e2a3a",
        "border-2": "#2a3a4a",
        green: {
          DEFAULT: "#00ff88",
          dim: "#00cc6a",
          dark: "#003d20",
          glow: "rgba(0, 255, 136, 0.15)",
        },
        red: {
          DEFAULT: "#ff3355",
          dim: "#cc2944",
          dark: "#3d0010",
          glow: "rgba(255, 51, 85, 0.15)",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          dim: "#00a8cc",
        },
        muted: "#6b7b8d",
        "muted-2": "#4a5568",
        foreground: "#e2e8f0",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],
      },
    },
  },
  plugins: [],
};
export default config;
