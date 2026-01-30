/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: {
        'pubg-dark': '#0d0d0f',
        'pubg-darker': '#161619',
        'pubg-card': '#1c1c1f',
        'pubg-card-hover': '#232326',
        'pubg-border': '#2d2d32',
        'pubg-muted': '#6e6e73',
        'pubg-accent': '#e8a855',
        'pubg-accent-hover': '#f0b96a',
        'pubg-accent-muted': 'rgba(232, 168, 85, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pubg': '12px',
        'pubg-sm': '8px',
      },
      boxShadow: {
        'pubg': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
