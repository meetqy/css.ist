<template>
  <div class="w-screen h-screen bg-base-300 flex items-center justify-center">
    <div
      class="w-full md:max-w-screen-sm font-sans flex items-center flex-col md:flex-row mx-4 md:mx-0 shadow md:shadow-none"
    >
      <div class="w-40 hidden md:flex">
        <img
          v-lazy="vLazy(usePicsum('/200/600'))"
          alt="Double room"
          class="rounded-l"
        />
      </div>

      <div
        class="h-56 w-full overflow-hidden border-b-4 border-primary rounded-t md:hidden"
      >
        <img
          v-lazy="vLazy(usePicsum('/400/300'))"
          alt="Double room"
          class="w-full rounded-l shadow"
        />
      </div>

      <!-- info -->
      <div
        class="flex-1 bg-base-100 md:p-10 p-4 font-mono rounded-b md:rounded w-full"
      >
        <div class="flex items-center justify-between">
          <div class="w-4/5">
            <h1 class="font-bold text-2xl">{{ baseInfo[lang].title }}</h1>
            <p class="text-base-content/40">
              {{ baseInfo[lang].subtitle }}
            </p>
          </div>

          <span class="material-symbols-outlined text-info">
            picture_as_pdf
          </span>
        </div>

        <ul class="w-full mt-8">
          <li
            v-for="(item, index) in $MockList(3)[lang]"
            :key="index"
            class="flex justify-between h-8 items-center"
          >
            <span
              class="line-clamp-1 w-5/3 text-base-content/40 capitalize text-sm"
            >
              {{ item.title.split(" ")[0] }}
            </span>
            <span class="text-end">{{
              index === 2 ? item.date : item.author
            }}</span>
          </li>
        </ul>

        <div class="divider"></div>

        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-base-content/40 text-sm">{{ page.a }}</span>
            <span>{{ page.c }}</span>
          </div>
          <div class="text-base-content/50">>>></div>
          <div class="flex flex-col">
            <span class="text-base-content/40 text-sm text-end">{{
              page.b
            }}</span>
            <span>{{ page.d }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex justify-between items-center h-8">
          <span class="text-base-content/40 text-sm">{{ page.e }}</span>
          <span>$144.99</span>
        </div>
        <div class="flex justify-between items-center h-8">
          <span class="text-base-content/40 text-sm">{{ page.f }}</span>
          <span>$19.99</span>
        </div>

        <div class="flex justify-between items-center mt-8">
          <span class="text-2xl capitalize">{{ page.g }}</span>
          <span class="text-success">$889.93</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const lang = ref("en");
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
      a: "CHECK-IN",
      b: "CHECK-OUT",
      c: "29 NOV 2018",
      d: "29 DEC 2018",
      e: "Price per night",
      f: "Cleaning fee",
      g: "total",
    },
    zh: {
      a: "检查",
      b: "通过",
      c: "2018-09-22",
      d: "2018-10-22",
      e: "原价",
      f: "折扣后价格",
      g: "总计",
    },
  }[lang.value];
};
</script>
