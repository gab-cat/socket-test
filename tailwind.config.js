/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}", "./public/*.{html,js}", "./src/components/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins",'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      }
    },
  },
  plugins: [],
}

