import { defineNuxtPlugin } from "#app";
import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const getGDPR = localStorage.getItem("GDPR:accepted");
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-ZW1HWRQZQ8",
    },
    appName: "css.ist",
    enabled: getGDPR === "true",
    pageTrackerScreenviewEnabled: true,
  });
});
