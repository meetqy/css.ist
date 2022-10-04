<template>
  <div>
    <main class="bg-base-100 font-mono">
      <NuxtLoadingBar ref="loadingRef" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<script setup>
const router = useRouter();

const loadingRef = ref(null);

router.beforeEach((_to, _from, next) => {
  loadingRef.value.start();
  next();
});
</script>

<style lang="postcss">
img[lazy="loaded"] {
  animation: imgLoaded 1s;
}

@keyframes imgLoaded {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

.drawer-mobile > .drawer-toggle ~ .drawer-side,
.drawer-toggle ~ .drawer-content {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
