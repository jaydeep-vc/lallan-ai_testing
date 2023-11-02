/** @type {import('tailwindcss').Config} */

function colorTranparent(color, rate) {
  const RATE = {
    900: "E6",
    800: "CC",
    700: "B3",
    600: "99",
    500: "80",
    400: "66",
    300: "4D",
    200: "33",
    100: "1A",
  };

  return `${color}${RATE[rate]}`;
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: colorTranparent("#6728F5", 100),
          200: colorTranparent("#6728F5", 200),
          300: colorTranparent("#6728F5", 300),
          400: colorTranparent("#6728F5", 400),
          DEFAULT: "#6728F5",
          500: colorTranparent("#6728F5", 500),
          600: colorTranparent("#6728F5", 600),
          700: colorTranparent("#6728F5", 700),
          800: colorTranparent("#6728F5", 800),
          900: colorTranparent("#6728F5", 900),
        },
        black: "#000000",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
