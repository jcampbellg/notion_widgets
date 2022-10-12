/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#FFF',
      dark: '#37352F',
      default: {
        dark: '#37352F',
        DEFAULT: '#FFFFFF'
      },
      gray: {
        dark: '#9B9A97',
        DEFAULT: '#EBECED'
      },
      brown: {
        dark: '#64473A',
        DEFAULT: '#E9E5E3'
      },
      orange: {
        dark: '#D9730D',
        DEFAULT: '#FAEBDD'
      },
      yellow: {
        dark: '#DFAB01',
        DEFAULT: '#FBF3DB'
      },
      green: {
        dark: '#0F7B6C',
        DEFAULT: '#DDEDEA'
      },
      blue: {
        dark: '#0B6E99',
        DEFAULT: '#DDEBF1'
      },
      purple: {
        dark: '#6940A5',
        DEFAULT: '#EAE4F2'
      },
      pink: {
        dark: '#AD1A72',
        DEFAULT: '#F4DFEB'
      },
      red: {
        dark: '#E03E3E',
        DEFAULT: '#FBE4E4'
      }
    },
    extend: {},
  },
  plugins: [],
}
