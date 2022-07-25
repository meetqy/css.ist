import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  css: ["~/assets/css/material-icons.css"],

  typescript: {
    shim: false,
  },
});
