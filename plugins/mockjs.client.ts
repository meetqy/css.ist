import Mock from "mockjs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Mock,
    },
  };
});
