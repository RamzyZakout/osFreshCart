/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '500px',
        'md': '600px',
        'lg': '900px',
      },
      padding: {
        'sm': '.5rem',
        'md': '0px'
      }
    },
    screens: {
      'sm': '500px',
      'md': '680px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    extend: {
      colors: { 'primary': '#0aad0a', 'ourGray': 'rgb(203 203 203)', 'lightGray': '#eee' },
      fontFamily: {
        cairo: "Cairo",
      },
    },
  },
  plugins: [],
}

