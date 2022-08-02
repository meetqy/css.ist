<template>
  <div class="drawer drawer-mobile bg-base-100">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex justify-center lg:justify-start">
      <div class="lg:w-[70vw] max-w-screen-lg">
        <div class="navbar bg-base-100 lg:hidden sticky top-0 w-full z-50">
          <div class="flex-none">
            <label for="my-drawer-2" class="btn btn-square btn-ghost lg:hidden">
              <span class="material-symbols-outlined"> menu_open </span>
            </label>
          </div>

          <div class="flex-1">
            <a class="btn btn-ghost capitalize text-xl">
              {{ page.title }}
            </a>
          </div>

          <div class="flex-none">
            <button
              data-set-theme="winter"
              class="btn btn-sm btn-ghost btn-square"
              data-act-class="btn-active"
              v-for="item in ['dark_mode', 'menu_book', 'light_mode']"
            >
              <span
                class="material-symbols-outlined !text-xl"
                :style="iconFill"
                v-html="item"
              >
              </span>
            </button>
          </div>
        </div>

        <div>
          <div class="space-y-6 mt-4">
            <div
              class="card bg-base-200 shadow flex-col md:flex-row w-full"
              v-for="item in data"
              :key="item.id"
            >
              <img
                v-if="item.image.length > 0"
                v-lazy="vLazy(item.image[0])"
                :alt="item.title"
                class="md:max-w-sm w-full"
              />
              <div class="card-body">
                <h2 class="card-title line-clamp-1">
                  {{ item.title }}
                </h2>
                <div class="justify-start">
                  <button
                    class="btn btn-xs mr-1"
                    :class="
                      $Mock.mock({
                        'array|1': allBtnType,
                      }).array
                    "
                    v-for="tag in item.tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </button>
                </div>
                <p class="line-clamp-5 grow-0">
                  {{ item.paragraph }}
                </p>
              </div>
            </div>

            <div class="flex justify-center">
              <div class="btn-group">
                <button class="btn btn-active">1</button>
                <button class="btn">2</button>
                <button class="btn btn-disabled">...</button>
                <button class="btn">99</button>
                <button class="btn">100</button>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <p class="text-sm pl-4">
            © 1967 - 2022 <span class="capitalize">{{ page.title }}</span>
          </p>

          <p class="text-xs pl-4 pb-4">
            <span class="capitalize">{{ page.title }}</span> theme desing by
            <a class="link capitalize">{{ page.title }}</a>
          </p>
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <div class="overflow-y-auto flex lg:justify-center w-fit lg:w-[30vw]">
        <!-- Sidebar content here -->
        <div class="w-72 p-3 lg:m-6 bg-base-100">
          <div class="avatar w-full">
            <div class="w-16 lg:w-32 rounded-full mx-auto">
              <img v-lazy="vLazy(useMockPic('/128/128'))" />
            </div>
          </div>

          <h1 class="text-2xl p-2 text-center capitalize">
            {{ page.title }}
          </h1>
          <p class="text-sm text-center line-clamp-2 text-base-content/80">
            {{ page.subtitle }}
          </p>

          <div class="flex gap-1 justify-center pt-4">
            <a
              class="btn btn-sm btn-ghost btn-square"
              v-for="item in templateContacts"
              v-html="item"
            >
            </a>
          </div>
          <div class="divider"></div>
          <!-- menu start -->
          <div class="pt-4">
            <ul class="menu bg-base-100 rounded-box">
              <li v-for="item in menu">
                <a class="capitalize">
                  <span class="material-symbols-outlined" v-html="item.icon">
                  </span>
                  {{ item.text }}
                </a>
              </li>

              <div class="divider"></div>
              <li class="hidden lg:block">
                <div class="flex gap-1 justify-center">
                  <button
                    data-set-theme="winter"
                    class="btn btn-sm btn-ghost btn-square"
                    data-act-class="btn-active"
                    v-for="item in ['dark_mode', 'menu_book', 'light_mode']"
                  >
                    <span
                      class="material-symbols-outlined !text-xl"
                      :style="iconFill"
                      v-html="item"
                    >
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <!-- menu end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { $Mock } = useNuxtApp();

const data = ref();
const menu = ref([]);
const page = ref({});

watch(route, (v) => {
  const { lang = "en" } = v.query;
  init(lang);
});

onMounted(() => {
  init(route.query.lang || "en");
});

const init = (lang) => {
  page.value = {
    en: {
      title: $Mock.mock("@first") + " blog",
      subtitle: $Mock.mock("@sentence"),
    },
    zh: {
      title: $Mock.mock("@cname"),
      subtitle: $Mock.mock("@csentence"),
    },
  }[lang];

  data.value = $Mock.mock({
    "en|4-15": [
      {
        "id|+1": 1,
        title: "@title",
        paragraph: "@paragraph(1,5)",
        "tags|1-5": ["@word"],
        "image|0-1": () =>
          $Mock.Random.boolean()
            ? [`${useMockPic("/400/300")}?t=${$Mock.Random.natural(0, 1000)}`]
            : [],
      },
    ],
    "zh|4-15": [
      {
        "id|+1": 1,
        title: "@ctitle",
        paragraph: "@cparagraph(3, 20)",
        "tags|1-5": ["@cword(2,5)"],
        "image|0-1": () =>
          $Mock.Random.boolean()
            ? [`${useMockPic("/400/300")}?t=${$Mock.Random.natural(0, 1000)}`]
            : [],
      },
    ],
  })[lang];

  menu.value = templateMenu[lang];
};
</script>
