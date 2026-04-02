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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // The New Elite Color Palette
        stacklab: {
          blue: "#0066FF",   // Deep Electric Blue
          cyan: "#00E5FF",   // Neon Cyan for accents
          glow: "rgba(0, 102, 255, 0.15)", // Subtle hover glows
        }
      },
    },
  },
  plugins: [],
};
export default config;