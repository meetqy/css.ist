import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      // 当前调试的模板路径 /introduce/:number
      dev_template_path: process.env.DEV_TEMPLATE_PATH,
    },
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  components: {
    dirs: ["~/components", "~/templates"],
  },

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

  css: [
    "~/assets/css/page.css",
    "~/assets/css/material.css",
    "~/assets/css/normal.css",
  ],

  typescript: {
    shim: false,
    strict: true,
  },

  app: {
    head: {
      title: "css.ist",
      meta: [
        {
          name: "keywords",
          content:
            "web,tailwindcss,daisyui,template,blog,responsive sites,responsive web design",
        },
        {
          name: "description",
          content:
            "css.ist - share responsive web design and many themes templates/components/web pages. based on tailwindcss, daisyui.",
        },
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
        },
      ],
    },
  },

  vite: {
    plugins: [eslintPlugin()],
  },
});
