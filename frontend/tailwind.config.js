module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: "#FBE648",
        green: "#94BE31",
        purple: "#311258",
        red: "#E3147E",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
