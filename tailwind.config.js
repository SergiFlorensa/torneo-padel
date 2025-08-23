/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        oscuro: '#121212',
        primario: '#e50914',
        secundario: '#1e1e1e',
        texto: '#ffffff',
      }
    },
  },
  plugins: [],
}
