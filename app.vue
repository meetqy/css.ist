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
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </main>
</template>

<script setup>
onMounted(() => {
  const wel = document.querySelectorAll(".wcao");
  if (wel[1]) {
    wel[1].remove();
  }
});
</script>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-30 bg-base-100;
}

.material-symbols-rouned {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
