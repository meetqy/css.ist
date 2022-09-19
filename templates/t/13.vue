<template>
  <div class="h-screen overflow-y-auto bg-base-200">
    <main
      class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200"
    >
      <nav
        class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main=""
        navbar-scroll="true"
      >
        <div
          class="flex items-center justify-between w-full md:px-4 px-0 py-1 mx-auto flex-wrap"
        >
          <nav>
            <ol class="flex flex-wrap pt-1 bg-transparent rounded-lg">
              <li class="leading-normal text-sm">
                <a class="opacity-50 text-base-content/70" href="javascript:;">
                  {{ page.d }}
                </a>
              </li>
              <li
                class="text-sm pl-2 capitalize leading-normal text-base-content/70 before:float-left before:pr-2 before:text-base-content/60 before:content-['/']"
                aria-current="page"
              >
                {{ page.e }}
              </li>
            </ol>
            <h6 class="mb-0 font-bold capitalize">{{ page.e }}</h6>
          </nav>

          <div class="flex items-center justify-between mt-2">
            <div class="md:flex hidden items-center ml-auto">
              <label class="input-group">
                <button class="btn">
                  <span class="material-symbols-outlined p-0 bg-transparent">
                    search
                  </span>
                </button>
                <input
                  type="text"
                  placeholder="css.ist"
                  class="input focus:outline-none"
                />
              </label>
            </div>
            <ul class="flex flex-row justify-end">
              <li>
                <button class="btn btn-ghost normal-case">
                  <span class="material-symbols-outlined"> person </span>
                  {{ page.c }}
                </button>
              </li>
              <li>
                <button class="btn btn-square">
                  <span class="material-symbols-outlined"> settings </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="w-full px-6 py-6 mx-auto">
        <div class="flex flex-wrap -mx-3">
          <div
            v-for="(item, i) in page.a"
            :key="i"
            class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4"
          >
            <div
              class="relative flex flex-col min-w-0 break-words bg-base-100 shadow-soft-xl rounded-2xl bg-clip-border"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-row -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p
                        class="mb-0 font-sans font-semibold leading-normal text-sm line-clamp-1"
                      >
                        {{ item.title }}
                      </p>
                      <h5 class="mb-0 font-bold">
                        {{ item.prefix }}{{ item.price }}
                        <span
                          class="leading-normal text-sm font-weight-bolder"
                          :class="
                            item.trend > 0 ? 'text-error' : 'text-success'
                          "
                        >
                          {{ item.trend > 0 ? "+" : "" }}{{ item.trend }}%
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div class="px-3 text-right basis-1/3">
                    <div
                      class="inline-flex w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 justify-center items-center text-base-100"
                      v-html="templateIcons(i)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap mt-6 -mx-3">
          <div class="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
            <div
              class="relative flex flex-col min-w-0 break-words bg-base-100 shadow-soft-xl rounded-2xl bg-clip-border"
            >
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="max-w-full px-3 lg:w-1/2 lg:flex-none">
                    <div class="flex flex-col h-full">
                      <p class="pt-2 mb-1 font-semibold text-base-content/50">
                        {{ $MockWord(1, 3)[lang] }}
                      </p>
                      <h5 class="font-bold text-xl my-2">
                        {{ $MockTitle()[lang] }}
                      </h5>
                      <p class="mb-12 line-clamp-3">
                        {{ $MockContent()[lang] }}
                      </p>
                      <a
                        class="mt-auto mb-0 font-semibold leading-normal text-sm group text-base-content/40 inline-flex items-center capitalize"
                        href="javascript:;"
                      >
                        {{ $MockWord(2, 4)[lang] }}
                        <span class="material-symbols-outlined">
                          navigate_next
                        </span>
                      </a>
                    </div>
                  </div>
                  <div
                    class="max-w-full px-3 mt-12 lg:ml-auto w-full text-center lg:mt-0 lg:w-5/12 lg:flex-none"
                  >
                    <div
                      class="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl text-base-100"
                    >
                      <span
                        class="material-symbols-outlined absolute top-0 hidden w-1/2 h-full lg:block"
                      >
                        rocket
                      </span>

                      <div
                        class="relative flex items-center justify-center h-[300px]"
                      >
                        <span
                          class="material-symbols-outlined !text-9xl relative z-20 w-full"
                        >
                          rocket
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
            <div
              class="shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-base-100 bg-clip-border p-4"
            >
              <div
                class="relative h-full overflow-hidden bg-cover rounded-xl"
                :style="`background-image: url(${usePicsum('/600/300')})`"
              >
                <span
                  class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-neutral to-neutral/70 opacity-70"
                ></span>
                <div
                  class="relative z-10 flex flex-col flex-auto h-full p-4 text-neutral-content"
                >
                  <h5 class="pt-2 mb-6 font-bold">{{ $MockTitle()[lang] }}</h5>
                  <p class="line-clamp-3">
                    {{ $MockContent()[lang] }}
                  </p>
                  <a
                    class="mt-auto mb-0 font-semibold leading-normal group text-sm inline-flex items-center text-neutral-content/50"
                    href="javascript:;"
                  >
                    {{ $MockWord(2, 4)[lang] }}
                    <span class="material-symbols-outlined">
                      navigate_next
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap mt-6 -mx-3">
          <div
            class="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-5/12 lg:flex-none"
          >
            <div
              class="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-base-100 bg-clip-border"
            >
              <div class="flex-auto p-4">
                <div class="mb-4 rounded-xl h-[220px] overflow-hidden">
                  <img
                    v-lazy="vLazy(usePicsum('/600/300'))"
                    class="w-full h-full object-fill"
                  />
                </div>
                <h6 class="mt-6 mb-0 ml-2">{{ $MockTitle()[lang] }}</h6>
                <p class="ml-2 leading-normal text-sm">
                  (<span class="font-bold">+23%</span>) {{ page.b }}
                </p>
                <div class="w-full px-6 mx-auto max-w-screen-2xl rounded-xl">
                  <div class="flex flex-wrap mt-0 -mx-3">
                    <div
                      v-for="(item, i) in [
                        'bg-gradient-to-tl from-purple-700 to-pink-500',
                        'bg-gradient-to-tl from-blue-600 to-cyan-400',
                        'bg-gradient-to-tl from-red-500 to-yellow-400',
                        ' bg-gradient-to-tl from-red-600 to-rose-400',
                      ]"
                      :key="i"
                      class="flex-none w-1/4 max-w-full py-4 pl-0 pr-3 mt-0"
                    >
                      <div class="flex mb-2">
                        <div
                          class="flex items-center justify-center w-5 h-5 mr-2 text-center bg-center rounded fill-current shadow-soft-2xl"
                          :class="item"
                          v-html="
                            templateIcons(i, '', '!text-sm !text-base-100')
                          "
                        ></div>
                        <p
                          class="mt-1 mb-0 font-semibold leading-tight text-xs capitalize"
                        >
                          {{ $MockWord()[lang] }}
                        </p>
                      </div>
                      <h4 class="font-bold text-xl">
                        {{ $Mock.Random.natural(1, 100) }}K
                      </h4>
                      <div
                        class="text-xs h-0.75 flex w-3/4 overflow-visible rounded-lg bg-base-100"
                      >
                        <progress
                          class="progress w-full"
                          :value="$Mock.Random.natural(1, 100)"
                          max="100"
                        ></progress>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
            <div
              class="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-base-100 bg-clip-border"
            >
              <div
                class="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-base-100 p-6 pb-0"
              >
                <h6 class="text-2xl mb-1">{{ $MockTitle()[lang] }}</h6>
                <p class="leading-normal text-sm inline-flex items-center">
                  <span
                    class="material-symbols-outlined !text-base !text-success mr-1"
                  >
                    arrow_upward
                  </span>
                  <span class="font-semibold mr-2">4% more</span>
                  in 2021
                </p>
              </div>
              <div class="flex-auto p-4">
                <img
                  v-lazy="vLazy(usePicsum('/600/300'))"
                  class="w-full h-[300px] rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap my-6 -mx-3">
          <div
            class="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none"
          >
            <div
              class="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-base-100 bg-clip-border"
            >
              <div
                class="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-base-100 p-6 pb-0"
              >
                <div class="flex flex-wrap mt-0 -mx-3">
                  <div
                    class="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none"
                  >
                    <h6>{{ $MockTitle()[lang] }}</h6>
                    <p
                      class="mb-0 leading-normal text-sm inline-flex items-center"
                    >
                      <span class="material-symbols-outlined text-info">
                        done
                      </span>
                      <span class="mx-1 font-semibold"
                        >30 {{ $MockWord(1)[lang] }}</span
                      >
                      {{ $MockWord(2)[lang] }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex-auto p-6">
                <img
                  v-lazy="vLazy(usePicsum('/800'))"
                  class="w-full h-[400px] rounded-xl"
                />
              </div>
            </div>
          </div>

          <div
            class="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none"
          >
            <div
              class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-base-100 bg-clip-border"
            >
              <div
                class="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-base-100 p-6 pb-0"
              >
                <h6 class="text-xl mb-2">{{ $MockTitle()[lang] }}</h6>
                <p
                  class="leading-normal text-sm inline-flex items-center text-base-content/50"
                >
                  <span
                    class="material-symbols-outlined text-success !text-base"
                  >
                    arrow_upward
                  </span>
                  <span class="font-semibold mx-2 text-base-content">24%</span>
                  {{ $MockWord(2)[lang] }}
                </p>
              </div>
              <div class="flex-auto p-4 font-sans">
                <div
                  v-for="color in $MockDaisyColorType()"
                  :key="color"
                  class="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px"
                >
                  <div
                    class="relative my-4 after:clear-both after:table after:content-['']"
                  >
                    <span
                      class="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-base-100 text-center font-semibold"
                    >
                      <span
                        class="material-symbols-outlined relative z-10"
                        :class="`text-${color}`"
                      >
                        diversity_2
                      </span>
                    </span>
                    <div
                      class="ml-12 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto"
                    >
                      <h6
                        class="mb-0 font-semibold leading-normal text-sm text-base-content"
                      >
                        {{ $Mock.Random.natural(-1000, 1000) }},
                        {{ $MockWord(2, 4)[lang] }}
                      </h6>
                      <p
                        class="mt-1 mb-0 leading-tight text-xs text-base-content/50"
                      >
                        22 DEC 7:20 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="pt-4">
          <div class="w-full mx-auto">
            <div class="flex flex-wrap items-center -mx-3 lg:justify-between">
              <div
                class="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none"
              >
                <div
                  class="leading-normal text-center text-sm text-base-content/50 lg:text-left"
                >
                  {{ baseInfo[lang].subtitle }}
                </div>
              </div>

              <div
                class="w-full max-w-full mt-0 shrink-0 lg:w-1/2 lg:flex-none"
              >
                <ul class="flex flex-wrap justify-center lg:justify-end">
                  <li v-for="(item, i) in templateMenu[lang]" :key="i">
                    <a
                      class="block px-4 font-normal transition-colors ease-soft-in-out text-sm text-base-content/50"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
const { $Mock, $MockDaisyColorType } = useNuxtApp();
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
  page.value = $Mock.mock({
    en: {
      "a|4": [
        {
          title: "@title",
          price: "@natural(100,10000)",
          prefix: "$",
          trend: "@natural(-99, 99)",
        },
      ],
      b: "than last week",
      c: "sign in",
      d: "pages",
      e: "Dashboard",
    },
    zh: {
      "a|4": [
        {
          title: "@ctitle",
          price: "@natural(100,10000)",
          prefix: "￥",
          trend: "@natural(-99, 99)",
        },
      ],
      b: "对比上一周",
      c: "登录/注册",
      d: "页面",
      e: "仪表盘",
    },
  })[lang.value];
};
</script>
