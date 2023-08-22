const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        laptop: "1536px",
        "monitor-2k": "1920px",
        "monitor-4k": "2560px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
