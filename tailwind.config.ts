import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0a0a0c",
          2: "#111116",
          3: "#18181f",
          4: "#22222c",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.06)",
          2: "rgba(255,255,255,0.10)",
          3: "rgba(255,255,255,0.16)",
        },
        accent: {
          DEFAULT: "#7c6af7",
          2: "#5b52d4",
          glow: "rgba(124,106,247,0.25)",
        },
        gold: {
          DEFAULT: "#e8c87a",
          2: "#c9a655",
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%,100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease forwards",
        pulse: "pulse 1.2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
