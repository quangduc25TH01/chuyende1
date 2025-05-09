import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        main: "#3165ff",
        white: "#FFFFFF",
        black: {
          default: "#000000",
          1: "#383838",
          2: "#282828",
        },

        blue: {
          1: "#276788",
          2: "#0264af",
          3: "#276788",
          4: "#14323d",
          5: "#03592e",
          6: "#1b6275",
          7: "#002BC5",
          8: "#3165FF",
        },
        green: {
          1: "#b7d847",
          2: "#7a9c59",
          3: "#93c63e",
          4: "#00a859",
          5: "#009911",
          6: "#65b741",
        },
        gray: {
          default: "#808080",
          1: "#e8e8ea",
          2: "#333333",
          3: "#f1f1f1",
          4: "#ececec",
          5: "#DDDDDD",
        },
        red: {
          1: "#ed1c24",
          2: "#B20000",
          3: "#E04C78",
          4: "#cb1118cc",
        },
      },
      boxShadow: {
        navbar: "0px 10px 13px #0000000d",
        "product-item": "0px 0px 10px #3333",
        input: "inset 0 1px 2px rgba(0,0,0,.1)",
      },
      fontSize: {
        "15/16": "0.9375rem",
      },
      borderRadius: {
        button: "50px",
      },
      width: {
        "product-item": "calc(100% / 3 - 10px);",
      },
      translate: {},
    },
  },
  plugins: [],
} satisfies Config;

export default config;
