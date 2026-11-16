/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ctu: {
          navy: '#0b192c',
          navyLight: '#1e293b',
          blue: '#1e3a8a',
          accent: '#2563eb',
          amber: '#f59e0b',
          gold: '#d97706',
          emerald: '#10b981',
          rose: '#f43f5e',
          slate: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
