/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        softPink: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F472B6',
          700: '#BE185D',
          800: '#9D174D',
        },
        softBlue: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#38BDF8',
          700: '#0369A1',
          800: '#075985',
        },
        softYellow: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FACC15',
          700: '#A16207',
          800: '#854D0E',
        },
        softGreen: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#4ADE80',
          700: '#15803D',
          800: '#14532D',
        },
        botanical: {
          50: '#F4F8F4',   // Very light mint/sage toolbar
          100: '#EBF4EB',  // Soft sage mint chips & badges
          200: '#CCE2CC',  // Mint hairline borders
          300: '#A3D0A3',  // Light herbal green
          400: '#72B588',  // Vibrant leaf accent
          500: '#4A9B67',  // Fresh botanical green
          600: '#327D50',  // Mid-tone evergreen
          700: '#24613E',  // Deep herbal green
          800: '#183324',  // Primary Deep Botanical Forest (CTA & Hero)
          900: '#142A1D',  // Container Forest Pine (How To Order)
          950: '#0E1E15',  // Darkest Forest Atelier (Footer & Top Bar)
        },
        atelier: {
          bg: '#FAF9F5',      // Warm luxury pearl ivory
          surface: '#FFFFFF', // Pure white cards
          border: '#E8E4DC',  // Warm stone border
          text: '#1C1917',    // Deep charcoal
          champagne: '#C4AA82', // Gold/champagne accent
          pearl: '#F8F9FA',   // Luminous pearl accent
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

