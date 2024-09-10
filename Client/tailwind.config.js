/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vollkorn: ['Vollkorn', 'serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        openSans:['PT Sans', 'sans-serif']
      },
          colors: {
            customBlue1: 'rgba(1,186,223,1)',
            customBlue2: 'rgba(1,158,235,1)',
            customBlue3: 'rgba(1,128,250,1)',
            customGray: 'rgba(221,231,255,255)'
          },
        
    },
  },
  plugins: [],
}