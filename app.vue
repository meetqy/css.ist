<template>
  <!-- material icons 只能放在body中，head中无效 -->
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    rel="stylesheet"
  />

  <div class="font-mono">
    <NuxtPage></NuxtPage>
  </div>
</template>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-30 bg-base-100;
}
</style>
