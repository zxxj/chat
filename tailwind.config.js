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
        "custom-49": "49px",
        'custom-70': '70px'
      },
      borderColor: {
        "custom-chat": "#E65AFF"
      },
      keyframes: {
        'message-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'message-in': 'message-in 0.3s ease-out forwards'
      },
      backgroundColor: {
        'custom-friendlist-bg': '#0D0A22',
        'custom-friendlist-active-bg': '#16132D'
      },
      borderRadius: {
        'custom-14': '14px'
      }
    },
  },
  plugins: [],
}

