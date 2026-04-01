/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharmacy: {
          primary: '#14A396', // Exact vibrant teal from the user's uploaded line-art background
          secondary: '#E6F6F5',
          dark: '#1E293B',
          gray: '#F7FAFC',
          accent: '#FF7B54',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
