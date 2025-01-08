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
        'custom-666': '#666666',
        "custom-id": "#484465",
        "custom-profile": "#656183",
        "custom-bg1": '#F4B7FF',
        'custom-matchingbefore-bg': '#0D0A22'
      },
      height: {
        "custom-49": "49px"
      },
      borderColor: {
        "custom-chat": "#E65AFF"
      },
    },
  },
  plugins: [],
}

