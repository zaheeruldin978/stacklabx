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
        stacklab: {
          blue: "#0066FF",
          cyan: "#00E5FF",
          dark: "#020408", // Custom Deep Space Black
          glow: "rgba(0, 102, 255, 0.15)",
        }
      },
      // This is the mathematical "Apple" easing
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'grid': "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;