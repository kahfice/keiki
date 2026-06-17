/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EEDC9A',
          dark: '#D4C27E',
        },
        secondary: '#F7F2E3',
        accent: {
          DEFAULT: '#C58B45',
          dark: '#A6703A',
        },
        text: {
          DEFAULT: '#3D2B1F',
          light: '#6B5B4F',
        },
        background: {
          DEFAULT: '#FFFDF8',
          alt: '#FFF9ED',
        },
        border: {
          DEFAULT: '#E8DCC8',
          light: '#F0E8D8',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        pending: '#FFC107',
        process: '#2196F3',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
