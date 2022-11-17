/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-5": "#11001C",
        "purple-4": "#190028",
        "purple-3": "#220135",
        "purple-2": "#32004F",
        "purple-1": "#3A015C",
        "test": "#f0f"
      },
    },
  },
  plugins: [],
}
