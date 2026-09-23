/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        welcome: ["'Varela Round'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
