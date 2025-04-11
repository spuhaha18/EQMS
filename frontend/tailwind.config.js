/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c8ff",
          300: "#66adff",
          400: "#3392ff",
          500: "#0077ff",
          600: "#005fcc",
          700: "#004799",
          800: "#002f66",
          900: "#001833",
        },
      },
    },
  },
  plugins: [],
};
