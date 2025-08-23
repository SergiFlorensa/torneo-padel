/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oscuro: "#0d0d0d",
        rojoAPE: "#e50914",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
