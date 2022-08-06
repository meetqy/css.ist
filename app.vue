<template>
  <!-- material icons 只能放在body中，head中无效 -->
  <Body>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />

    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
  </Body>

  <main class="font-mono wcao">
    <NuxtLoadingBar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup>
// onMounted(() => {
//   const wel = document.querySelectorAll(".wcao");
//   if (wel[1]) {
//     wel[1].remove();
//   }
// });
</script>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-30 bg-base-100;
}
</style>
