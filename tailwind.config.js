/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EA5A4',
          50: '#E6F9F9',
          100: '#CCF3F3',
          200: '#99E7E6',
          300: '#66DADA',
          400: '#33CECE',
          500: '#0EA5A4',
          600: '#0B8483',
          700: '#086362',
          800: '#054242',
          900: '#032121',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          50: '#F5F0FF',
          100: '#EBE0FF',
          200: '#D6C1FF',
          300: '#C2A3FF',
          400: '#AD84FF',
          500: '#7C3AED',
          600: '#632EBE',
          700: '#4A238E',
          800: '#31175F',
          900: '#190C2F',
        },
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

