/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bun: {
          light: '#fde68a', // warm dough
          DEFAULT: '#fbbf24', // golden crust
          dark: '#d97706', // toasted
        }
      }
    },
  },
  plugins: [],
}