module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        "1/3": "33.333333%",
      },
      colors: {
        mainBlue: "#6ec5d7",
        mainRed: "#ff6262",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
