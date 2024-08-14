/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
       '4/5': '4 / 5',
      },
      colors: {
        primaryLight: {
          1: '#def9c4',
          2: '#9cdba6',
          3: '#50b498',
          4: '#468585',
        },
        primaryDark: {
          1: '#003c43',
          2: '#135d66',
          3: '#77b0aa',
          4: '#e3fef7',
        },
      }
    },
  },
  plugins: [
    
  ],
}

