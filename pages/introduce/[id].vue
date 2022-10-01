<template>
  <div class="w-full">
    <div class="fixed right-4 bottom-8 z-50 flex justify-center items-center">
      <div
        class="btn btn-primary btn-square btn-sm mr-2"
        @click="$router.back()"
      >
        <span class="material-symbols-outlined"> chevron_left </span>
      </div>
      <div class="btn btn-circle btn-sm" @click="toTop">
        <span class="material-symbols-outlined !text-lg"> rocket </span>
      </div>
    </div>

    <div class="w-full bg-info/5 pb-8 rounded-b">
      <div class="lg:container">
        <article
          class="md:prose prose-sm prose-p:mb-0 prose-h2:mb-0 !max-w-full px-4 pt-4"
        >
          <div
            v-if="page.previews"
            class="shadow flex items-center justify-between bg-base-100 overflow-hidden rounded-box flex-col lg:flex-row lg:pl-4 pt-4 lg:pt-0"
          >
            <h1
              class="!m-0 px-4 lg:px-4 lg:text-lg text-base font-semibold lg:pb-0 flex items-center pb-4"
            >
              {{ page.title }}

              <NuxtLink
                :to="`${page._path.replace('introduce', 'template')}`"
                class="btn btn-circle btn-md lg:hidden !no-underline flex-shrink-0 ml-4"
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
                class="w-full relative flex-shrink-0 lg:rounded-box lg:bg-base-200 max-h-[80vh] overflow-y-auto transition-all mt-8 lg:shadow"
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
                  :class="[
                    full ? 'w-full' : 'lg:w-1/3 w-full',
                    showImgPreview ? ' opacity-100' : ' opacity-0',
                  ]"
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

          <section class="space-y-8 mt-8">
            <!-- tags -->
            <div
              id="tags"
              class="flex items-center flex-wrap lg:flex-row flex-col"
            >
              <div class="w-full lg:w-auto flex items-center justify-start">
                <span class="material-symbols-outlined mt-2 text-accent">
                  sell
                </span>
                <span class="ml-2 mt-2 uppercase">tags:</span>
              </div>
              <div class="flex-1">
                <NuxtLink
                  v-for="item in page.tags"
                  :key="item"
                  :to="`/tag/${item}`"
                  class="btn mt-2 btn-primary btn-xs ml-2 !no-underline !text-primary-content"
                >
                  {{ item }}
                </NuxtLink>
              </div>
            </div>

            <!-- 灵感 -->
            <div
              v-if="page.source"
              class="flex items-center lg:flex-row flex-col"
            >
              <div class="flex items-center lg:w-auto w-full">
                <span class="material-symbols-outlined text-secondary">
                  emoji_nature
                </span>
                <span class="ml-2 uppercase">source of inspiration:</span>
              </div>
              <a
                :href="page.source"
                target="_blank"
                class="text-primary normal-case line-clamp-1 text-center lg:text-left inline-block lg:ml-2 mt-2 lg:mt-0"
              >
                {{ source.hostname }}
              </a>
            </div>

            <!-- 源码 -->
            <div
              v-if="page.source"
              class="flex items-center lg:flex-row flex-col"
            >
              <div class="flex items-center lg:w-auto w-full">
                <span class="material-symbols-outlined text-secondary">
                  code
                </span>
                <span class="ml-2 uppercase">source code:</span>
              </div>
              <a
                :href="`${github}${
                  page.template_folder ? '/index.vue' : '.vue'
                }`"
                target="_blank"
                class="text-info normal-case line-clamp-1 text-center lg:text-left inline-block lg:ml-2 mt-2 lg:mt-0"
              >
                {{ page._path.replace("/introduce", "/template") }}
              </a>
            </div>

            <!-- 开发记录 -->
            <div
              v-if="page.development_record"
              class="flex items-center lg:flex-row flex-col"
            >
              <div class="flex items-center lg:w-auto w-full">
                <span class="material-symbols-outlined">
                  radio_button_checked
                </span>
                <span class="ml-2 uppercase">development record</span>:
              </div>
              <a
                :href="page.development_record.url"
                target="_blank"
                class="text-info normal-case line-clamp-1 text-center lg:text-left inline-block lg:ml-2 mt-2 lg:mt-0"
              >
                {{ page.development_record.name }}
              </a>
            </div>
          </section>

          <h2 class="capitalize">more</h2>
          <div
            class="grid transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4"
          >
            <nuxt-link
              v-for="item in moreContent"
              :key="item._id"
              :to="item._path"
              class="cursor-zoom-in"
              @click="
                (e) =>
                  toIntroduce(e, {
                    offsetLeft: 320,
                  })
              "
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
              <p class="px-2">{{ item.title }}</p>
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
const showImgPreview = ref(false);

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

  toTop();

  const imgPreview = document.getElementById("img-preview");

  if (nextImgProps.value) {
    setTimeout(() => {
      const scrollWidth =
        drawerContentElement.value.offsetWidth -
        drawerContentElement.value.clientWidth;

      nextImgProps.value = {
        start: {
          left: 0,
          top: 0,
          width: "calc(100% - 320px)",
          height: "calc(100% - 64px)",
        },
        end: {
          left:
            imgPreview.offsetLeft +
            drawerContentElement.value.scrollLeft +
            scrollWidth +
            "px",
          top:
            imgPreview.offsetTop -
            drawerContentElement.value.scrollTop +
            32 +
            152 +
            "px",
          width: imgPreview.clientWidth + "px",
          height: imgPreview.clientHeight + "px",
        },
        status: "full-to-target",
        src: nextImgProps.value.src,
      };

      setTimeout(() => {
        showImgPreview.value = true;
        nextImgProps.value = undefined;
      }, 1000);
    }, 1000);
  } else {
    showImgPreview.value = true;
  }
});

const toTop = () => {
  drawerContentElement.value.scrollTop = 0;
};
</script>
