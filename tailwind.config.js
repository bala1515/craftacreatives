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
        lightCanvas: "#F5F5F7",
        lightSurface: "#FFFFFF",
        lightCard: "rgba(255, 255, 255, 0.82)",
        lightText: "#1D1D1F",
        lightMuted: "#6E6E73",
        lightBorder: "rgba(0, 0, 0, 0.08)",
        cobalt: "#2457ff",
        lime: "#c8ff3d",
        coral: "#FF4D36",
        appleBlue: "#2457ff",
        studioAmber: "#c8ff3d",
        studioIndigo: "#2457ff",
      },
    },
  },
  plugins: [],
}