<template>
  <div class="lg:mb-24 mb-12">
    <div class="px-4 pb-8 rounded-b bg-base-100 border-b border-base-200">
      <div class="container m-auto">
        <article class="w-full introduce-wrapper">
          <div
            v-if="page.previews"
            class="shadow flex items-center justify-between bg-base-100 overflow-hidden rounded-box"
          >
            <h1
              class="!m-0 lg:text-lg text-base font-semibold flex items-center justify-between w-full p-4"
            >
              <span class="flex-1">
                {{ page.title }}
              </span>

              <NuxtLink
                :to="`${page._path.replace('introduce', 'template')}`"
                class="btn btn-primary btn-circle lg:hidden !no-underline flex-shrink-0 ml-4"
              >
                <span class="material-symbols-outlined text-primary-content">
                  fullscreen
                </span>
              </NuxtLink>
            </h1>

            <!-- pc端显示 -->
            <div
              class="w-full lg:w-1/3 lg:flex hidden justify-end mt-4 lg:mt-0"
            >
              <div
                id="introduce-previews"
                class="flex-1 bg-base-300 overflow-x-scroll flex space-x-4"
              >
                <div
                  v-for="(item, i) in page.previews"
                  :key="i"
                  class="flex-shrink-0 w-24 h-24 overflow-hidden flex justify-center items-center cursor-pointer hover:bg-primary/5 transition-all"
                  @click="activePreviewIndex = i"
                >
                  <img
                    :src="useCFContentVLazy(page._path, item, 'sm').src"
                    class="object-contain object-center !my-0"
                    :alt="
                      useImgAltContent(
                        title,
                        tags,
                        item,
                        'introduce › previews › sm'
                      )
                    "
                    preload
                  />
                </div>
              </div>

              <NuxtLink
                :to="`${page._path.replace('introduce', 'template')}`"
                class="w-12 shrink-0 bg-primary flex justify-center items-center !no-underline"
              >
                <span class="material-symbols-outlined text-primary-content">
                  fullscreen
                </span>
              </NuxtLink>
            </div>
          </div>

          <!-- pc端显示 -->
          <div class="lg:block hidden">
            <template v-for="(item, i) in page.previews">
              <div
                v-if="page.previews"
                v-show="activePreviewIndex === i"
                :key="i"
                class="w-full relative flex-shrink-0 lg:rounded-box lg:bg-base-200 max-h-[80vh] overflow-y-auto transition-all lg:shadow"
              >
                <div class="sticky left-0 top-0 pt-2 pl-2">
                  <a
                    :href="`${github}${
                      page.template_folder ? '/index.vue' : '.vue'
                    }`"
                    target="_blank"
                    class="btn btn-square btn-ghost !no-underline"
                  >
                    <span class="material-symbols-outlined"> code </span>
                  </a>
                </div>
                <img
                  id="img-preview"
                  v-lazy="useCFContentVLazy(page._path, item, '2xl')"
                  class="transition-all object-contain duration-300 ease-in-out m-auto cursor-zoom-out !my-0 min-h-[368px]"
                  :class="[full ? 'w-full' : 'lg:w-1/3 w-full']"
                  :alt="
                    useImgAltContent(
                      title,
                      tags,
                      item,
                      'introduce › detail › 2xl'
                    )
                  "
                  @click="full = !full"
                />
                <div class="w-full h-14"></div>
              </div>
            </template>
          </div>

          <!-- mobile ipad 显示 -->
          <div class="grid lg:hidden">
            <div v-for="(item, i) in page.previews" :key="i">
              <p class="py-4">{{ item.replace(/png /, "") }}</p>
              <nuxt-img
                :src="useCFContentVLazy(page._path, item, 'public').src"
                class="m-auto"
                width="788"
                height="484"
                :alt="
                  useImgAltContent(
                    title,
                    tags,
                    item,
                    'introduce › detail › 2xl'
                  )
                "
                sizes="sm:100vw md:80vw"
                :preload="i < 3"
                loading="lazy"
              />
            </div>
          </div>

          <div class="flex">
            <NuxtLink
              v-for="item in page.tags"
              :key="item"
              :to="`/tag/${item}`"
              class="btn mt-2 btn-primary btn-xs ml-2 !no-underline !text-primary-content"
            >
              {{ item }}
            </NuxtLink>
          </div>

          <h2 class="capitalize">base info</h2>

          <ul class="menu w-full overflow-hidden">
            <li class="active:bg-transparent">
              <a :href="page.source" target="_blank">
                <span class="material-symbols-outlined"> emoji_nature </span>
                {{ source.hostname }}
              </a>
            </li>
            <li>
              <a
                :href="`${github}${
                  page.template_folder ? '/index.vue' : '.vue'
                }`"
                target="_blank"
              >
                <span class="material-symbols-outlined"> code </span>
                {{ page._path.replace("/introduce", "/template") }}
              </a>
            </li>
            <li>
              <a :href="page.development_record.url" target="_blank">
                <span class="material-symbols-outlined">
                  radio_button_checked
                </span>
                {{ page.development_record.name }}
              </a>
            </li>
          </ul>

          <h2 class="capitalize">more</h2>
          <div
            class="grid transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8"
          >
            <nuxt-link
              v-for="item in moreContent"
              :key="item._id"
              :to="item._path"
              class="cursor-zoom-in group"
            >
              <img
                :src="useCFContentVLazy(item._path, item.previews[0], 'sm').src"
                class="w-full aspect-video object-contain rounded-box border border-base-200 shadow bg-base-200/20"
                :alt="
                  useImgAltContent(
                    item.title,
                    item.tags,
                    item.previews[0],
                    'introduce › list › sm'
                  )
                "
                width="364"
                height="205"
                sizes="sm:100vw md:364"
                loading="lazy"
              />
              <p class="px-2 mt-4 group-hover:font-bold">{{ item.title }}</p>
            </nuxt-link>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const { page } = useContent();

const { title, tags } = page.value;

const source = computed(() => {
  const url = page.value.source;
  return new URL(url);
});

useHead({
  title: `${title} › introduce`,
  meta: [
    {
      name: "description",
      content: `${title} are ${tags}, based on tailwindcss,daisyui. › introduce`,
    },
    {
      name: "keywords",
      content: `${tags.join(",")},tailwindcss,daisyui`,
    },
  ],
});

const github = computed(() => {
  return page
    ? `https://github.com/meetqy/wcao.cc/blob/dev/templates/t/${page.value._path.replace(
        "/introduce/",
        ""
      )}`
    : "";
});

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);

const moreContent = ref([]);

onMounted(async () => {
  const res = await getContentByTag(
    tags,
    {
      pageIndex: 1,
      pageSize: 12,
    },
    "$in"
  );

  moreContent.value = res.filter((item) => item._id !== page.value._id);
});
</script>

<style lang="postcss" scoped>
.introduce-wrapper {
  @apply space-y-8 mt-8;

  h1 {
    @apply text-2xl;
  }

  h2 {
    @apply text-xl font-bold lg:text-base-content/80 text-primary/80;

    &:before {
      content: "#";
      @apply text-base mr-2 text-base-300;
    }
  }

  li {
    a {
      @apply hover:bg-transparent font-bold active:text-primary active:bg-transparent focus:bg-transparent;

      span {
        @apply !text-base-300;
      }
    }
  }
}
</style>
