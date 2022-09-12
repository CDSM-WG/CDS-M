/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  "theme": {
    "extend": [],
    "fontFamily": {
      "sans": [
        "\"Rajdhani\"",
        "Helvetica Neue",
        "Arial",
        "ui-sans-serif",
        "system-ui"
      ],
      "serif": [
        "Helvetica Neue",
        "Arial",
        "ui-sans-serif",
        "system-ui"
      ]
    },
    "fontSize": {
      "xs": [
        "12px",
        "16px"
      ],
      "sm": [
        "14px",
        "20px"
      ],
      "base": [
        "16px",
        "24px"
      ],
      "lg": [
        "18px",
        "24px"
      ],
      "xl": [
        "20px",
        "24px"
      ],
      "2xl": [
        "24px",
        "32px"
      ],
      "3xl": [
        "32px",
        "40px"
      ],
      "4xl": [
        "40px",
        "48px"
      ],
      "5xl": [
        "56px",
        "64px"
      ],
      "6xl": [
        "72px",
        "80px"
      ]
    },
    "colors": {
      "blue": {
        "200": "#B3BAF6",
        "400": "#3159FD",
        "500": "#0032FF",
        "900": "#001A73"
      },
      "yellow": {
        "50": "#E0F97B",
        "100": "#DCFB62",
        "200": "#CDFF00"
      },
      "gray": {
        "200": "#D4D4D4",
        "300": "#A3A3A3",
        "500": "#0032FF",
        "600": "#737373",
        "900": "#4B5563"
      },
      "neutral": {
        "200": "#E5E5E5"
      },
      "white": {
        "DEFAULT": "#FFFFFF"
      },
      "black": {
        "DEFAULT": "#000000"
      }
    }
  },
  plugins: [],
}
