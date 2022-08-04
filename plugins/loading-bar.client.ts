export default defineNuxtPlugin(() => {
  const app = useNuxtApp();

  app.hook("page:start", () => {
    // console.log("Page start...");
  });
  app.hook("page:finish", () => {
    // console.log("Page finished!");
  });
});
