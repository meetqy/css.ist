<template>
  <div class="h-screen overflow-y-scroll">
    <div class="bg-base-100 font-sans leading-normal tracking-normal w-full">
      <div
        class="w-full m-0 p-0 bg-cover bg-bottom h-[60vh] max-h-[460px] relative"
        :style="`background-image: url('${usePicsum('/1920/460')}')`"
      >
        <div class="absolute bg-neutral/80 left-0 top-0 w-full h-full">
          <div
            class="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal"
          >
            <p class="text-neutral-content font-extrabold text-3xl md:text-5xl">
              👻 {{ baseInfo[lang].title }}
            </p>
            <p
              class="text-xl md:text-2xl text-neutral-content/50 mt-4 w-1/2 m-auto"
            >
              {{ baseInfo[lang].subtitle }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="container md:max-w-screen-xl px-4 mx-auto -mt-32 relative z-50"
      >
        <div class="mx-0 sm:mx-6">
          <!-- nav -->
          <nav class="mt-0 w-full">
            <div
              class="container mx-auto flex items-center md:flex-row flex-col-reverse"
            >
              <div class="flex md:w-1/2 pl-4 text-sm">
                <ul
                  class="list-reset flex justify-between flex-1 md:flex-none items-center"
                >
                  <li
                    v-for="item in templateMenu[lang]"
                    :key="item.text"
                    class="mr-2"
                  >
                    <a
                      class="inline-block cursor-pointer capitalize p-2 text-neutral-content no-underline hover:underline"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="flex md:w-1/2 justify-end content-center">
                <a
                  v-for="(v, k) in templateContacts"
                  :key="k"
                  class="inline-block text-neutral-content/50 no-underline hover:text-neutral-content hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar"
                  v-html="v"
                />
              </div>
            </div>
          </nav>

          <!-- posts -->
          <div
            v-if="data"
            class="w-full text-xl md:text-2xl text-base-content leading-normal rounded-t"
          >
            <div
              class="flex h-full bg-base-100 rounded overflow-hidden shadow-lg"
            >
              <a class="flex flex-wrap no-underline hover:no-underline">
                <div class="w-full md:w-2/3 rounded-t">
                  <img
                    v-lazy="vLazy(data[0].img)"
                    class="h-full w-full shadow object-cover"
                  />
                </div>
                <div
                  class="w-full md:w-1/3 flex flex-col flex-grow flex-shrink"
                >
                  <div
                    class="flex-1 bg-base-100 rounded-t rounded-b-none overflow-hidden shadow-lg"
                  >
                    <p
                      class="w-full text-base-content/70 text-xs md:text-sm pt-6 px-6"
                    >
                      {{ data[0].go }}
                    </p>
                    <div
                      class="w-full font-bold text-xl text-base-content px-6 pb-1 line-clamp-2"
                    >
                      {{ data[0].title }}
                    </div>
                    <p
                      class="text-base-content font-serif text-base px-6 line-clamp-[12]"
                    >
                      {{ data[0].paragraph }}
                    </p>
                  </div>
                  <div
                    class="flex-none mt-auto bg-base-100 rounded-b rounded-t-none overflow-hidden shadow-lg p-6"
                  >
                    <div class="flex items-center justify-between">
                      <img
                        v-lazy="vLazy(data[0].avatar)"
                        class="w-8 h-8 rounded-full mr-4 avatar"
                      />
                      <p
                        class="text-base-content/70 text-xs md:text-sm uppercase"
                      >
                        {{ data[0].read }}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="flex flex-wrap justify-between pt-3 md:-mx-6">
              <a
                v-for="(item, i) in data.slice(1, 8)"
                :key="i"
                href="#"
                class="w-full py-3 md:p-6 flex flex-col flex-grow flex-shrink"
                :class="
                  [
                    'md:w-1/3',
                    'md:w-1/3',
                    'md:w-1/3',
                    'md:w-1/2',
                    'md:w-1/2',
                    'md:w-2/3',
                    'md:w-1/3',
                  ][i]
                "
              >
                <div
                  class="flex-1 bg-base-100 rounded-t rounded-b-none overflow-hidden shadow-lg"
                >
                  <div class="flex flex-wrap">
                    <img
                      v-lazy="vLazy(item.img)"
                      class="w-full rounded-t pb-6"
                    />
                    <p
                      class="w-full text-base-content/70 text-xs md:text-sm px-6"
                    >
                      {{ item.go }}
                    </p>
                    <div
                      class="w-full font-bold text-xl text-base-content px-6 line-clamp-1"
                    >
                      {{ item.title }}
                    </div>
                    <p
                      class="text-base-content font-serif text-base px-6 mb-5 line-clamp-5"
                    >
                      {{ item.paragraph }}
                    </p>
                  </div>
                </div>
                <div
                  class="flex-none mt-auto bg-base-100 rounded-b rounded-t-none overflow-hidden shadow-lg p-6"
                >
                  <div class="flex items-center justify-between">
                    <img
                      v-lazy="vLazy(item.avatar)"
                      class="w-8 h-8 rounded-full mr-4 avatar"
                    />
                    <p
                      class="text-base-content/70 text-xs md:text-sm uppercase"
                    >
                      {{ item.read }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- subscribe -->
          <div
            class="container font-sans bg-success/10 rounded mt-8 p-4 md:p-24 text-center"
          >
            <h2 class="font-bold break-normal text-2xl md:text-4xl">
              {{ page[lang].subscribe }}
            </h2>
            <h3
              class="break-normal font-normal text-base-content/70 text-base md:text-xl"
            >
              {{ page[lang].desc }}
            </h3>
            <div class="w-full text-center pt-4">
              <div
                class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center md:flex-row flex-col"
              >
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  class="flex-1 appearance-none rounded shadow p-3 text-base-content/70 md:mr-2 w-full focus:outline-none"
                />
                <button
                  class="flex-1 btn btn-success rounded mt-2 md:mt-0 btn-block"
                >
                  {{ page[lang].btn }}
                </button>
              </div>
            </div>
          </div>

          <!-- author -->
          <div class="flex w-full items-center font-sans py-8 px-4 md:p-24">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="http://i.pravatar.cc/300"
              alt="Avatar of Author"
            />
            <div class="flex-1">
              <p class="text-base font-bold md:text-xl leading-none">
                {{ baseInfo[lang].title }}
              </p>
              <p class="text-base-content/70 text-xs md:text-base mt-2">
                {{ baseInfo[lang].subtitle }}
                <a class="btn btn-link btn-success p-0 inline mt-2 normal-case">
                  wcao.cc
                </a>
              </p>
            </div>
            <div class="justify-end">
              <button
                class="btn btn-outline capitalize opacity-90 btn-xs md:btn-md"
              >
                {{ page[lang].more }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer class="bg-neutral">
        <div class="container max-w-6xl mx-auto flex items-center px-2 py-8">
          <div class="w-full mx-auto flex flex-wrap items-center">
            <div
              class="flex w-full md:w-1/2 justify-center md:justify-start text-neutral-content font-extrabold"
            >
              <a
                class="btn btn-link p-0 text-neutral-content hover:no-underline normal-case"
                href="#"
              >
                👻
                <span class="text-base ml-2">
                  {{ baseInfo[lang].title }}
                </span>
              </a>
            </div>
            <div
              class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end"
            >
              <ul
                class="list-reset flex justify-center flex-1 md:flex-none items-center"
              >
                <li v-for="item in templateMenu[lang]" :key="item.text">
                  <a
                    class="btn btn-link text-neutral-content/30 capitalize btn-xs"
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
  </div>
</template>

<script setup>
const { $Mock } = useNuxtApp();

const lang = ref("en");
const route = useRoute();
lang.value = route.query.lang || "en";

watch(route, (v) => {
  lang.value = v.query.lang || "en";
  init();
});

const data = ref(null);

const page = {
  en: {
    subscribe: "Subscribe to WCAO.CC",
    desc: "Get the latest posts delivered right to your inbox",
    btn: "subscribe",
    more: "read more",
  },
  zh: {
    subscribe: "订阅WCAO.CC",
    desc: "最新的文章会第一时间发送到你的邮箱",
    btn: "订阅",
    more: "更多",
  },
};

const init = () => {
  data.value = $Mock.mock({
    "en|8": [
      {
        "id|+1": 1,
        title: "@title",
        paragraph: "@paragraph(1,8)",
        img: () => usePicsum("/800/600"),
        avatar: () => usePicsum("/300/300"),
        read: () => $Mock.Random.natural(1, 10) + ` min read`,
        go: "GETTING STARTED",
      },
    ],
    "zh|8": [
      {
        "id|+1": 1,
        title: "@ctitle",
        paragraph: "@cparagraph(1,8)",
        img: () => usePicsum("/800/600"),
        avatar: () => usePicsum("/300/300"),
        read: () => `阅读 ${$Mock.Random.natural(1, 10)} 分钟`,
        go: "开始吧",
      },
    ],
  })[lang.value];
};

onMounted(() => {
  init();
});
</script>
