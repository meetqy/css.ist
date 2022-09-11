<template>
  <div class="bg-base-100 w-full h-screen overflow-y-scroll">
    <div class="mx-auto my-12 container px-4">
      <h1
        class="text-center text-3xl lg:text-5xl tracking-wider text-base-content text-opacity-90 underline"
      >
        {{ baseInfo[lang].title }}
      </h1>
      <p class="text-base-content/70 mt-4 text-lg max-w-md m-auto text-center">
        {{ baseInfo[lang].subtitle }}
      </p>
      <div v-if="data" class="mt-12 lg:mt-20">
        <div
          v-for="(v, i) in data"
          :key="i"
          class="grid pb-12 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 overflow-hidden"
        >
          <div
            class="shadow rounded-box"
            :class="n == 1 ? 'order-1' : 'order-2'"
          >
            <img v-lazy="vLazy(v[0].image)" class="w-full rounded-t-box" />
            <div class="py-4 px-8 w-full flex justify-between bg-primary">
              <p
                class="text-sm text-primary-content font-semibold tracking-wide"
              >
                {{ v[0].author }}
              </p>
              <p
                class="text-sm text-primary-content font-semibold tracking-wide"
              >
                {{ v[0].date }}
              </p>
            </div>
            <div class="bg-base-100 lg:px-10 px-4 lg:py-6 py-4 rounded-b-box">
              <h1
                class="lg:text-4xl text-base-content text-opacity-90 font-semibold tracking-wider"
              >
                {{ v[0].title }}
              </h1>
              <p
                class="text-base-content text-opacity-70 text-base lg:text-lg lg:leading-8 tracking-wide mt-6 lg:line-clamp-6 line-clamp-3"
              >
                {{ v[0].content }}
              </p>
              <div class="w-full flex justify-end">
                <button
                  class="btn capitalize btn-primary btn-sm btn-link mt-10"
                >
                  <span class="text-base tracking-wide font-light mr-2">
                    {{ templatePage[lang].read }}
                  </span>
                  <span class="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div
            :class="n == 1 ? 'order-2' : 'order-1'"
            class="grid md:grid-cols-2 grid-rows-2 gap-8 grid-cols-1"
          >
            <div
              v-for="(item, n) in v.slice(1, 5)"
              :key="n * i"
              class="rounded-box overflow-hidden bg-base-100 shadow"
            >
              <img
                v-lazy="vLazy(item.image)"
                class="w-full max-h-52"
                src="https://picsum.photos/500/400"
              />
              <div class="py-2 px-4 w-full flex justify-between bg-primary">
                <p
                  class="text-sm text-primary-content font-semibold tracking-wide"
                >
                  {{ item.author }}
                </p>
                <p
                  class="text-sm text-primary-content font-semibold tracking-wide"
                >
                  {{ item.date }}
                </p>
              </div>
              <div class="bg-base-100 px-3 lg:px-6 py-4">
                <div>
                  <h1
                    class="text-lg text-base-content text-opacity-90 font-semibold tracking-wider"
                  >
                    {{ item.title }}
                  </h1>
                  <p
                    class="text-base-content line-clamp-4 text-opacity-70 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2"
                  >
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $MockList } = useNuxtApp();

const lang = ref("en");
const route = useRoute();
lang.value = route.query.lang || "en";

watch(route, (v) => {
  lang.value = v.query.lang || "en";
  init();
});

const data = ref(null);

const init = () => {
  data.value = [
    $MockList(5, "/500/400")[lang.value],
    $MockList(5, "/500/400")[lang.value],
  ];
};

onMounted(() => {
  init();
});
</script>
