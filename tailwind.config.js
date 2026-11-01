/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: '#FAF9F5',      // Warm luxury pearl ivory
          surface: '#FFFFFF', // Pure white cards
          border: '#E8E4DC',  // Delicate warm stone border
          text: '#1C1917',    // Deep charcoal
          muted: '#78716C',   // Muted stone
          terracotta: '#8B4F3E', // Warm romantic floral accent
          champagne: '#C4AA82',  // Luxury gold accent
          forest: '#1A3B2B',     // Deep botanical forest (WhatsApp CTA)
          forestHover: '#132E21',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
