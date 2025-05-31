/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ffab74', // Soft teal accent
        bg: '#1c1b1b',     // Almost-black background
        fg: '#F4F4F5',     // Off-white for text
        muted: '#A1A1AA',  // Muted gray for secondary text
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}