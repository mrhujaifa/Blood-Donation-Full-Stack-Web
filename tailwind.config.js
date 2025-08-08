import daisyui from "daisyui";

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          "primary": "#4CAF50",
          "secondary": "#FF9800",
          "accent": "#E91E63",
          "neutral": "#333333",
          "base-100": "#FFFFFF",
          "info": "#2196F3",
          "success": "#4CAF50",
          "warning": "#FB8C00",
          "error": "#F44336",
        },
      },
      "light",
      // "dark",
    ],
  },
};

export default config;
