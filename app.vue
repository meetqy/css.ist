<template>
  <main class="font-mono wcao">
    <NuxtLoadingBar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-30 bg-base-100;
}
</style>
