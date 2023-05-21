/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        }
      },
      animation: {
        fade: 'fadeIn 0.3s ease-in linear'
      }
    },
  },
  plugins: [],
}

