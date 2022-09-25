<template>
  <div>
    <main
      class="font-mono wcao bg-base-100"
      :style="{
        opacity: !openAnimation ? 1 : calcOpacity(scrollTop, temp),
      }"
    >
      <NuxtLoadingBar ref="loadingRef" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <CoreNextImg />
    </main>

    <div
      v-if="openAnimation"
      class="h-[200vh] w-full fixed top-0 left-0"
      :style="{ zIndex: !show ? 999 : -999 }"
    >
      <div class="home-header-sticky-container">
        <div
          class="home-header_text-wrapper"
          style="will-change: opacity"
          :style="{
            opacity:
              scrollTop >= 0 && scrollTop < temp
                ? Math.abs((scrollTop - temp) / temp)
                : 0,
          }"
        >
          <div class="pt-40">
            <h1 class="md:text-7xl text-4xl text-neutral-content/70 font-serif">
              css.ist, on <br />
              tailwindcss daisyui.
            </h1>
          </div>
          <div class="mt-8 flex justify-center items-center flex-col">
            <div
              class="text-neutral-content/70 relative uppercase md:text-xl font-serif tracking-widest"
            >
              SCROLL TO CONTINUE
              <div
                class="bg-error md:h-4 h-2 w-full absolute md:top-4 top-3 -z-10"
              ></div>
            </div>
            <div class="md:mt-12 mt-6">
              <span
                class="material-symbols-outlined animate-bounce text-neutral-content/70"
              >
                south
              </span>
            </div>
          </div>
        </div>

        <div
          class="home-header_introducing-glaredb-component"
          style="will-change: opacity"
          :style="{
            opacity:
              scrollTop > temp ? (scrollTop - temp) / (clientHeight - temp) : 0,
          }"
        >
          <div
            class="text-center underline uppercase text-neutral-content md:text-base text-sm cursor-pointer"
            @click="show = true"
          >
            🚀 ready go.
          </div>
          <div
            class="md:text-[12rem] text-6xl my-8 text-neutral-content font-serif tracking-wider"
          >
            css.ist
          </div>
          <div class="max-w-xl mx-auto">
            <p class="text-neutral-content/50 md:text-xl text-sm">
              {{ getWebConfig().subtitle }}
            </p>
          </div>
        </div>

        <div
          class="home-header-desktop_sky-gradient"
          style="
            will-change: transform;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
        ></div>

        <div
          class="home-header-desktop_stars"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              -temp + scrollTop / 1.5
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          data-w-id="ca18017e-7248-3e65-80e6-bb4d94d80f40"
          class="home-header-desktop_far-planets"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              scrollTop / 3
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_close-planets"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              scrollTop / 3
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_sun-glow absolute-center"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${scrollTop / 8}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_far-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${scrollTop / 15}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_close-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, -${scrollTop / 10}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_server-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, -${scrollTop / 5.5}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const show = ref(false);
const clientHeight = ref(0);

// 不需要开屏动画的route
const openAnimation = !["slug"].includes(useRoute().name);

const scrollTop = ref(0);
const temp = ref(0);

const calcOpacity = (scrollTop, temp) => {
  return (
    scrollTop >= 0 &&
    1 - (scrollTop < temp ? Math.abs((scrollTop - temp) / temp) : 0)
  );
};

onMounted(() => {
  const el = document.documentElement;
  clientHeight.value = el.clientHeight;
  temp.value = clientHeight.value / 2.5;
  document.body.style = "overflow:hidden";
  setTimeout(() => {
    const T = setInterval(() => {
      scrollTop.value += 3;
      if (scrollTop.value >= clientHeight.value) {
        window.addEventListener("scroll", () => {
          scrollTop.value = document.documentElement.scrollTop;
        });
        clearInterval(T);
      }
    }, 10);
  }, 500);
});

const loadingRef = ref(null);

router.beforeEach((_to, _from, next) => {
  loadingRef.value.start();
  setTimeout(next, 500);
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
</style>
