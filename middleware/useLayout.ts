export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name?.toString().includes("template-path")) {
    const { full } = to.query;
    to.meta.layout = full ? "full" : "template";
  }
});
