import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "color-scheme": "dark",
          "primary": "#0d9ffd",
          "secondary": "oklch(74.8% 0.26 342.55)",
          "accent": "oklch(74.51% 0.167 183.61)",
          "neutral": "#2a323c",
          "neutral-content": "#fefefe",
          "base-100": "#272b34",
          "base-200": "#2e333d",
          "base-content": "#fefefe",
        },
      },
      "light",
      "dark",
      "dracula",
    ],
  },
}

