/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alfarabi: {
          dark: '#080a14',
          midnight: '#0c1024',
          card: 'rgba(15, 23, 42, 0.75)',
          purple: '#371861',
          lime: '#86efac',
          limeAccent: '#a3e635',
          cyan: '#38bdf8',
          blue: '#2563eb',
        }
      },
      fontFamily: {
        arabic: ['"Cairo"', '"Tajawal"', 'sans-serif'],
        sans: ['"Cairo"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Tajawal"', '"Cairo"', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: 0.4, filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.3))' },
          '100%': { opacity: 0.9, filter: 'drop-shadow(0 0 35px rgba(56,189,248,0.7))' },
        }
      }
    },
  },
  plugins: [],
}
