/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001B2F',
        accent: '#35D0C6',
        background: '#F8F4F3',
        accentLight: '#7FE8E0',
        accentLighter: '#B8F2ED',
        accentDark: '#28A69D',
        primaryLight: '#003A5F',
      },
    },
  },
  plugins: [],
}
