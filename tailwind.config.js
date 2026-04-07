/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Replace entire color palette with Catppuccin Mocha
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      bg: '#080810',
      surface: '#0f0f1a',
      border: {
        DEFAULT: '#1e1e2e',
        active: '#2e2e4e',
      },
      text: '#cdd6f4',
      muted: '#585b70',
      green: '#a6e3a1',
      cyan: '#89dceb',
      yellow: '#f9e2af',
      red: '#f38ba8',
      mauve: '#cba6f7',
      overlay: '#1e1e2e',
    },
    fontFamily: {
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      display: ['"Syne"', 'sans-serif'],
      serif: ['"Literata"', 'Georgia', 'serif'],
      sans: ['"DM Sans"', 'sans-serif'],
    },
    extend: {
      animation: {
        'blink': 'blink 1.1s step-end infinite',
        'scanline': 'scanline 0.22s linear forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { top: '0', opacity: '0.9' },
          '100%': { top: '100%', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  safelist: ['text-mauve', 'text-cyan', 'text-yellow', 'text-green', 'text-red'],
  plugins: [],
}
