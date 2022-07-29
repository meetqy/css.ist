import { defineNuxtConfig } from "nuxt";
import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  content: {
    documentDriven: true,
    sources: [
      {
        name: "template-introduce",
        prefix: "/introduce", // All contents inside this source will be prefixed with `/fa`
        driver: "fs",
        base: resolve(__dirname, "introduce"), // Path for source directory
      },
    ],
  },

  typescript: {
    shim: false,
    strict: true,
  },
});
