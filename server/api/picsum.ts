export default defineEventHandler(async (event) => {
  const img = await $fetch("https://picsum.photos/200/300");

  return img;
});
