/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/views/**/*.{html,html.erb,erb}",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        agencyDark: "#0B0F19",
        agencyCard: "#131B2E",
        neonCyan: "#00F0FF",
        neonPurple: "#7000FF",
        neonGreen: "#00FF66",
      },
    },
  },
  plugins: [],
}