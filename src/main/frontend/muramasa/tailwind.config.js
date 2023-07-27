/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wallpaper': "linear-gradient(180deg, rgba(9,9,121,0.2) 10%, #0B1622), url('/template.png')"
      },
      keyframes: () =>  ({
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        }
      }),
      animation: {
        fade: 'fadeIn 0.3s ease-in linear'
      },
      colors: {
        'midnight': '#0B1622',
        'darkocean': '#152232'
      },
      screens: {
        '2xl': '1536px'
      }
    }
  },
  plugins: [],
}

