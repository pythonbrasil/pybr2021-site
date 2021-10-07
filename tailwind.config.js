module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        azulEscuro: "#476088",
        azul: "#61a8e8",
        amarelo: "#ffc562",
        rosa: "#ff6d74",
        verde: "#4fddc3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
