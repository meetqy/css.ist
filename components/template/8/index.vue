<template>
  <div id="screen" class="h-screen overflow-y-scroll">
    <div class="h-[200vh] w-full">
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
            <h1
              class="md:text-7xl text-4xl text-neutral-content/70 font-serif"
              v-html="page.a"
            ></h1>
          </div>
          <div class="mt-8 flex justify-center items-center flex-col">
            <div
              class="text-neutral-content/70 relative uppercase md:text-xl font-serif tracking-widest"
            >
              {{ page.b }}
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
          class="home-header_introducing-glaredb-component z-50"
          style="will-change: opacity"
          :style="{
            opacity:
              scrollTop > temp ? (scrollTop - temp) / (clientHeight - temp) : 0,
          }"
        >
          <div class="introducing-glaredb_component">
            <div class="relative z-50">
              <div
                class="text-center underline uppercase text-neutral-content md:text-base text-sm"
              >
                {{ page.c }}
              </div>
            </div>
            <div>
              <div
                class="md:text-[12rem] text-6xl my-8 text-neutral-content font-serif tracking-wider"
              >
                wcao.cc
              </div>
              <div class="max-w-xl mx-auto">
                <p class="text-neutral-content/50 md:text-xl text-sm">
                  {{ baseInfo[lang].subtitle }}
                </p>
              </div>
            </div>
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
const clientHeight = ref(0);
const scrollTop = ref(0);
const temp = ref(0);

const lang = ref("en");
const route = useRoute();
lang.value = route.query.lang || "en";

const page = ref({});

const init = () => {
  page.value = {
    en: {
      a: "wcao, it's <br/>praise, surprise",
      b: "SCROLL TO CONTINUE",
      c: "introduce",
    },
    zh: {
      a: "卧槽，一种赞美、惊讶！",
      b: "滚动继续",
      c: "介绍",
    },
  }[lang.value];
};

watch(route, (v) => {
  lang.value = v.query.lang || "en";
  init();
});

onMounted(() => {
  init();
  const el = document.getElementById("screen");
  clientHeight.value = el.clientHeight;
  temp.value = clientHeight.value / 2.5;
  el.addEventListener("scroll", () => {
    scrollTop.value = el.scrollTop;
  });
});
</script>

<style scoped>
.home-header-sticky-container {
  @apply sticky top-0 overflow-hidden h-screen;
  backface-visibility: hidden;
}

.home-header_introducing-glaredb-component {
  @apply absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 text-center bg-gradient-to-b from-accent-content  via-neutral-focus to-accent;
}
.home-header-desktop_sky-gradient {
  @apply absolute inset-0 z-[1] block overflow-hidden bg-gradient-to-b from-neutral-focus via-accent-focus to-warning/40;
}

.home-header-desktop_close-planets {
  @apply absolute inset-0 block overflow-hidden z-[10];
  background-image: url("./1.png");
}

.home-header-desktop_sun-glow {
  @apply absolute inset-0 z-[3] bg-cover bg-no-repeat bg-scroll opacity-100;
  background-image: url("./6.svg");
  background-position: 50% 100%;
}

.home-header-desktop_sun-glow.absolute-center {
  @apply z-[5] overflow-hidden max-w-[112.5rem] mx-auto;
  background-image: url("./2.svg");
}

.home-header-desktop_server-buildings {
  @apply absolute inset-0 z-[9] overflow-hidden block bg-cover bg-no-repeat;
  background-image: url("./3.svg");
  background-position: 50% 100%;
}
.home-header-desktop_close-buildings {
  @apply absolute inset-0 z-[7] overflow-hidden bg-cover bg-no-repeat;
  background-image: url("./4.png");
  background-position: 50% 100%;
}
.home-header-desktop_far-buildings {
  @apply absolute inset-0 z-[6] overflow-hidden bg-cover bg-no-repeat;
  background-image: url("./5.png");
  background-position: 50% 100%;
}

.home-header-desktop_stars {
  @apply absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-fixed opacity-50 z-[7];
  background-image: url("./7.png");
  background-position: 50% 0;
}
.home-header-desktop_far-planets {
  @apply absolute inset-0 overflow-hidden z-[3] bg-cover bg-no-repeat bg-fixed;
  background-image: url("./8.png");
  background-position: 50% 0;
}
.home-header_text-wrapper {
  @apply absolute inset-0 bottom-auto z-[100] flex h-[40vh] flex-col justify-center items-center text-center;
}
</style>
