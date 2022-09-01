<template>
  <div
    class="font-sans antialiased text-base-content leading-normal tracking-wider bg-cover"
    :style="`background-image: url('${useUnsplash('/1L71sPT5XKc', '')}')`"
  >
    <div class="max-w-4xl flex items-center h-screen flex-wrap mx-auto">
      <!--Main Col-->
      <div
        id="profile"
        class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-base-100 opacity-75 mx-6 lg:mx-0"
      >
        <div class="p-4 md:p-12 text-center lg:text-left">
          <!-- Image for mobile view-->
          <div
            class="block lg:hidden rounded-full shadow-xl mx-auto -mt-20 md:-mt-32 md:h-48 md:w-48 w-36 h-36 bg-cover bg-center"
            :style="`
              background-image: url(${useUnsplash(
                '/user/mahdi_chf/',
                '300x300'
              )});
            `"
          ></div>

          <h1 class="md:text-3xl font-bold pt-8 lg:pt-0">
            {{ baseInfo[lang].title }}
          </h1>
          <div
            class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-base-200/50"
          ></div>
          <p
            class="pt-4 md:text-base font-bold flex items-center justify-center lg:justify-start"
          >
            <span class="material-symbols-outlined mr-4"> work_history </span>
            {{ $MockJob()[lang] }}
          </p>
          <p
            class="pt-2 text-base-content/60 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
          >
            <span class="material-symbols-outlined mr-4"> pin_drop </span>
            {{ page.b }}
          </p>
          <p class="pt-8 text-sm">
            {{ baseInfo[lang].subtitle }}
          </p>

          <div class="md:pt-12 md:pb-8 py-6">
            <button class="btn rounded-full btn-sm md:btn-md">
              {{ page.a }}
            </button>
          </div>

          <div
            class="mt-6 mb-6 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between"
          >
            <a
              v-for="(v, k) in templateContacts"
              :key="k"
              class="link"
              href="#"
              v-html="v"
            >
            </a>
          </div>
        </div>
      </div>

      <!--Img Col-->
      <div class="w-full lg:w-2/5 h-[540px] hidden lg:block">
        <img
          v-lazy="vLazy(useUnsplash('/user/mahdi_chf/', '500x0'))"
          class="rounded-none lg:rounded-lg shadow-2xl h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const lang = ref("en");
const { $Mock, $MockJob } = useNuxtApp();
const route = useRoute();
lang.value = route.query.lang || "en";
const page = ref({});

onMounted(() => {
  init();
});

watch(route, (v) => {
  lang.value = v.query.lang || "en";
  init();
});

const init = () => {
  page.value = {
    en: {
      a: "Get In Touch",
      b: "Your Location - 25.0000° N, 71.0000° W",
    },
    zh: {
      b: `${$Mock.mock("@county(true)")}`,
      a: "联系我",
    },
  }[lang.value];
};
</script>
