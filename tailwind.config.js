/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    screens: {
      "max-sm": { max: "888px" },
      "min-sm": { min: "888px" },
      "min-md": { min: "1240px" },
      "max-md": { max: "1240px" },
    },
  },
};
export const plugins = [];
