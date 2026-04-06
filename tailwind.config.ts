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
          dark: "#020408", 
          glow: "rgba(0, 102, 255, 0.15)",
        }
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.400'),
            maxWidth: '85ch', // Optimized for human eye tracking
            lineHeight: '1.8',
            fontSize: '1.1rem',
            // --- HEADING HIERARCHY ---
            h1: { 
              color: theme('colors.white'), 
              fontWeight: '900', 
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
              marginBottom: '1.5rem'
            },
            h2: { 
              color: theme('colors.white'), 
              fontWeight: '800', 
              letterSpacing: '-0.03em', 
              marginTop: '3.5rem', // Creates the "Section" feel
              marginBottom: '1.25rem',
              borderLeft: `2px solid ${theme('colors.blue.600')}`,
              paddingLeft: '1.5rem'
            },
            h3: { 
              color: theme('colors.slate.200'), 
              fontWeight: '700', 
              marginTop: '2.5rem',
              marginBottom: '1rem' 
            },
            strong: { color: theme('colors.white'), fontWeight: '700' },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              color: theme('colors.slate.300'),
              borderLeftColor: theme('colors.blue.500'),
              backgroundColor: 'rgba(59, 130, 246, 0.03)',
              padding: '1.5rem',
              borderRadius: '0 0.75rem 0.75rem 0',
            },
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;