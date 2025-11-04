/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1A1A1A', light: '#2D2D2D' },
        accent: { DEFAULT: '#FF6B35', light: '#FF8A5B', dark: '#E5501F' },
      },
    },
  },
  plugins: [],
}
