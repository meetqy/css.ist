/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
