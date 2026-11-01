/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0F0D0C',
        'charcoal-deep': '#0A0807',
        'charcoal-panel': '#17110E',
        ember: '#D9622B',
        'ember-dark': '#A8481A',
        'ember-soft': '#E87B4A',
        gold: '#C9A66B',
        'gold-dark': '#9C7B44',
        'gold-soft': '#E3C88F',
        cream: '#F5EFE6',
        'cream-muted': '#CFC4B2',
        'cream-faint': '#A79B89',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 48px -12px rgba(217, 98, 43, 0.55)',
        'glow-lg': '0 10px 60px -12px rgba(217, 98, 43, 0.6)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 46s linear infinite',
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
