/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBEEFF',
          100: '#E0E7FF',
          600: '#4F46E5',
          700: '#4338CA',
        },
        secondary: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          600: '#EC4899',
          700: '#DB2777',
        }
      }
    },
  },
  plugins: [],
}
