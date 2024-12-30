/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#E65AFF',
        "custom-id": "#484465",
        "custom-profile": "#656183"
      },
    },
  },
  plugins: [],
}

