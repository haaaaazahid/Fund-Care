import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B2545', 2: '#12345E', dark: '#0F2245' },
        gold: { DEFAULT: '#C9A227', dark: '#8C6E1A', pale: '#F3E9C7', light: '#D8B646' },
        ivory: '#FAF6EC',
        ink: '#1C2230',
        muted: '#656C7A',
        line: '#E7E0CC',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '.55' },
          '90%': { opacity: '.35' },
          '100%': { transform: 'translateY(-420px) translateX(var(--drift,20px))', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(.6)', opacity: '.9' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        marquee: 'marquee 26s linear infinite',
        pulseRing: 'pulseRing 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
