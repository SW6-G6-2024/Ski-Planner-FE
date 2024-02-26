/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'legendbg': '#535C91',
        'legendinteract': '#3A3F5E',
      }
    },
  },
  plugins: [],
};

