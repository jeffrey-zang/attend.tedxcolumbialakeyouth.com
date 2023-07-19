/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "300ms"
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        red: "#FF0A34",
        darkred: "#3F0D21",
        black: "#111827",
        white: "#d1d3d9",
        gradienttransition: "#451128",
        dimmed: "#999"
      },
    },
  },
  plugins: [],
}
