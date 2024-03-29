/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  "theme": {
    "extend": {
      "colors": {
        "blue": {
          "50": "#E6E8FC",
          "200": "#B3BAF6",
          "400": "#7993FA",
          "500": "#0032FF",
          "600": "#0032FF",
          "700": "#1d4ed8",
          "900": "#001A73"
        },
        "yellow": {
          "50": "#E0F97B",
          "100": "#DCFB62",
          "200": "#CDFF00",
          "500": "#e0f97b",
          "600": "#DCFB62",
          "700": "#CDFF00"
        },
        "gray": {
          "100": "#EFEFF0",
          "200": "#D4D4D4",
          "300": "#D1D5DB",
          "500": "#6B7280",
          "900": "#4B5563"
        },
        "green": {
          "500": "#5DC001",
          "700": "#0D8938"
        },
        "red": {
          "200": "#FECACA",
          "500": "#FE005B"
        },
        "amber": {
          "400": "#FFC801",
          "500": "#FF7101"
        },
        "neutral": {
          "200": "#E5E5E5",
          "300": "#D4D4D4",
          "400": "#A1A1AA"
        },
        "white": {
          "DEFAULT": "#FFFFFF"
        },
        "black": {
          "DEFAULT": "#000000"
        },
        "transparent": "transparent",
        "current": "currentColor",
        "inherit": "inherit"
      }
    },
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
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
