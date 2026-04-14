/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-pink': '#ff2a6d',
        'cyber-blue': '#05d9e8',
        'cyber-purple': '#d300c5',
        'cyber-green': '#01ffc3',
        'cyber-black': '#121212',
        'cyber-gray': '#1e1e1e',
      },
      fontFamily: {
        'cyber': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(5, 217, 232, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(5, 217, 232, 0.8), 0 0 30px rgba(255, 42, 109, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}