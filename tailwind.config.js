/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "rgba(49, 52, 54,1)",
        "bg-grey": "rgba(35, 37, 38, 1)",
        "btn-primary-bg": "#3D6F92",
        "btn-primary-text": "rgba(32, 157, 245, 1)",
      },
    },
  },
  plugins: [],
};
