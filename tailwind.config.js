module.exports = {
  purge: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    boxShadow: {
      sm: '0 5px 5px -1px rgba(0, 0, 0, 0.2), 0 4px 10px -3px rgba(0, 0, 0, 0.1)',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
