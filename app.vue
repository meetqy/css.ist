<template>
  <main class="font-mono wcao">
    <NuxtLoadingBar ref="loadingRef" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup>
const router = useRouter();

const loadingRef = ref(null);

router.beforeEach((_to, _from, next) => {
  // console.log();
  loadingRef.value.start();
  setTimeout(next, 500);
});
</script>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-50;
}
</style>
