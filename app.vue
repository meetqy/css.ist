<template>
  <div>
    <main class="bg-base-100 font-mono text-base">
      <NuxtLoadingBar ref="loadingRef" />
      <NuxtLayout>
        <Head>
          <!-- Google tag (gtag.js) -->
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-ZW1HWRQZQ8"
          ></Script>
          <Style chi></Style>
          <Script
            children="window.dataLayer = window.dataLayer || []; function
            gtag(){dataLayer.push(arguments);} gtag('js', new Date());
            gtag('config', 'G-ZW1HWRQZQ8');"
          />
        </Head>
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

.drawer-mobile > .drawer-toggle ~ .drawer-content {
  height: 100vh;
}

.drawer-content {
  @apply pt-16;
}
</style>
