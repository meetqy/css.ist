<template>
  <div
    class="bg-base-100 text-base-content text-opacity-60 work-sans leading-normal text-base tracking-normal w-full h-screen overflow-y-scroll"
  >
    <!-- header -->
    <div
      class="container h-20 m-auto flex flex-wrap items-center justify-between mt-0 py-3"
    >
      <div class="dropdown lg:dropdown-open lg:h-10">
        <label tabindex="0" class="btn btn-ghost btn-sm lg:hidden">
          <span class="material-symbols-outlined"> menu_open </span>
        </label>
        <div tabindex="0" class="dropdown-content w-max">
          <ul
            class="menu lg:menu-horizontal menu-vertical bg-base-100 w-56 lg:w-full rounded-box shadow lg:shadow-none"
          >
            <li v-for="item in templateMenu[lang]">
              <a class="hover:bg-transparent hover:underline">{{
                item.text
              }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="order-1 md:order-2">
        <a
          class="flex uppercase tracking-wide no-underline hover:no-underline font-bold text-base-content text-opacity-80 text-lg font-serif"
          href="#"
        >
          <span class="material-symbols-outlined"> shopping_bag </span>
          <span class="ml-1">{{ page.title }}</span>
        </a>
      </div>

      <div class="order-2 md:order-3 flex items-center">
        <a class="btn btn-ghost btn-square" href="#">
          <span class="material-symbols-outlined"> person </span>
        </a>
        <a class="btn btn-ghost btn-square" href="#">
          <span class="material-symbols-outlined"> shopping_cart </span>
        </a>
      </div>
    </div>

    <!-- banner -->
    <section
      class="w-full h-[32rem] max-w-screen-2xl mx-auto bg-nordic-base-content-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
      style="
        background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc');
      "
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide"
        >
          <h1 class="text-base-content text-2xl">{{ page.slogen }}</h1>
          <a class="btn btn-link capitalize font-normal btn-lg px-0" href="#">
            {{ page.sub }}
          </a>
        </div>
      </div>
    </section>

    <!-- store -->
    <section class="bg-base-100 py-8">
      <div class="container mx-auto flex items-center flex-wrap">
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between px-2 py-3"
        >
          <a
            class="uppercase tracking-wide font-bold text-base-content text-opacity-80 text-xl"
            href="#"
          >
            Store
          </a>
          <div class="flex items-center">
            <a class="btn btn-square btn-ghost" href="#">
              <span class="material-symbols-outlined"> filter_list </span>
            </a>
            <a class="btn btn-square btn-ghost" href="#">
              <span class="material-symbols-rounded"> search </span>
            </a>
          </div>
        </div>
        <div
          class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
          v-for="item in store"
          :key="item.id"
        >
          <a href="#">
            <img
              v-lazy="vLazy(item.image)"
              class="hover:shadow-md hover:scale-105 transition-all duration-500"
            />
            <div class="pt-3 flex items-center justify-between">
              <p class="line-clamp-1">{{ item.title }}</p>
              <label class="swap">
                <input type="checkbox" :checked="item.fav" />
                <span class="material-symbols-outlined swap-on">
                  favorite
                </span>
                <span
                  class="material-symbols-rounded text-error swap-off"
                  :style="iconFill"
                >
                  favorite
                </span>
              </label>
            </div>
            <p class="mt-1 text-base-content text-opacity-90">
              {{ item.prefix }}{{ item.money }}
            </p>
          </a>
        </div>
      </div>
    </section>

    <!-- bottom -->
    <section class="bg-base-100">
      <div class="container py-8 px-6 mx-auto">
        <a
          class="uppercase tracking-wide no-underline hover:no-underline font-bold text-base-content text-opacity-80 text-xl mb-8"
          href="#"
        >
          {{ page.bottomTitle }}
        </a>

        <p class="my-8">
          {{ page.bottomParagraph }}
        </p>
      </div>
    </section>

    <!-- footer -->
    <footer
      class="container lg:flex-row flex-col mx-auto flex bg-base-100 px-3 py-8 border-t border-base-content border-opacity-40"
    >
      <div class="px-3 flex-1 md:px-0">
        <h3 class="font-bold text-base-content text-opacity-90 capitalize">
          {{ page.footerTitle }}
        </h3>
        <p class="py-4">
          {{ page.footerParagraph }}
        </p>
      </div>
      <div class="flex-1 text-center">
        <h3 class="font-bold text-base-content text-opacity-90">
          {{ page.name }}
        </h3>
        <a class="btn btn-link" href="#"> @{{ page.title }} </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute();
const { $Mock } = useNuxtApp();

const lang = ref("en");

watch(route, (v) => {
  lang.value = v.query.lang;
  init(lang.value);
});

onMounted(() => {
  lang.value = route.query.lang || "en";
  init(lang.value);
});
const page = ref({});

const store = ref([]);

const init = (lang) => {
  store.value = $Mock.mock({
    "en|12": [
      {
        "id|+1": 1,
        title: "@title",
        fav: "@boolean",
        "money|1-100": 1,
        prefix: "$",
        image: () => {
          return `https://source.unsplash.com/user/feeypflanzen/500x500/?${$Mock.Random.natural(
            0,
            1000
          )}`;
        },
      },
    ],
    "zh|12": [
      {
        "id|+1": 1,
        title: "@ctitle",
        fav: "@boolean",
        "money|1-100": 1,
        prefix: "￥",
        image: () => {
          return `https://source.unsplash.com/user/feeypflanzen/500x500/?${$Mock.Random.natural(
            0,
            1000
          )}`;
        },
      },
    ],
  })[lang];

  page.value = {
    en: {
      title: "wcao.cc",
      slogen: $Mock.mock("@sentence"),
      sub: $Mock.mock("@title(1,3)"),
      bottomTitle: $Mock.mock("@title(1)"),
      bottomParagraph: $Mock.mock("@paragraph(3,7)"),
      footerTitle: $Mock.mock("@title(1)"),
      footerParagraph: $Mock.mock("@paragraph(1,3)"),
      name: $Mock.mock("@name"),
    },
    zh: {
      title: "卧槽 - 表示惊讶",
      slogen: $Mock.mock("@csentence"),
      sub: $Mock.mock("@ctitle(1,3)"),
      bottomTitle: $Mock.mock("@ctitle"),
      bottomParagraph: $Mock.mock("@cparagraph(20)"),
      footerTitle: $Mock.mock("@ctitle"),
      footerParagraph: $Mock.mock("@cparagraph(1,3)"),
      name: $Mock.mock("@cname"),
    },
  }[lang];
};
</script>
