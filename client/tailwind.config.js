/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      fontSize : {
        xxs: '0.65rem',
      },
      colors: {
        "beard-dark": '#603321',
        "beard-grey": '#545449',
        'beard-cream': '#c2a891',
        'beard-green': '#344747',
        'beard-brown': '#271a13',
        'beard-orange': '#b76743',
        'beard-light-orange': '#b56742',
        'beard-deep-brown': '#67412e',
        'beard-darkest': '#371b10',
      },
    },
  },
  plugins: [],
}

