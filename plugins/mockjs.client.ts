import { mock } from "mockjs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mock,
    },
  };
});
