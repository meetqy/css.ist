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
            <h1 class="!m-0 px-4 text-lg font-semibold">
              {{ page.title }}
            </h1>

            <div class="w-full lg:w-1/3 flex justify-end mt-4 lg:mt-0">
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
                    v-lazy="useCFContentVLazy(page._path, item, 'sm')"
                    class="object-contain object-center !my-0"
                    :alt="`${title} template in ${tags.join(
                      '/'
                    )}, based on tailwindcss,daisyui. introduce › previews › sm`"
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

          <template v-for="(item, i) in page.previews">
            <div
              v-if="page.previews"
              v-show="activePreviewIndex === i"
              :key="i"
              class="w-full relative flex-shrink-0 lg:rounded-box lg:bg-base-200 max-h-[80vh] overflow-y-auto transition-all mt-8 lg:shadow"
            >
              <div class="sticky left-0 top-0 pt-2 pl-2">
                <a
                  :href="github"
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
                :alt="`${title} template in ${tags.join(
                  '/'
                )}, based on tailwindcss,daisyui. introduce › detail › 2xl`"
                @click="full = !full"
              />
              <div class="w-full h-14"></div>
            </div>
          </template>

          <p id="tags" class="flex items-center flex-wrap mt-6">
            <span class="material-symbols-outlined mt-2 text-primary/20">
              sell
            </span>
            <span class="ml-2 mt-2 uppercase">tags:</span>
            <NuxtLink
              v-for="item in page.tags"
              :key="item"
              :to="`/tag/${item}`"
              class="btn mt-2 btn-primary btn-xs ml-2 !no-underline !text-primary-content"
            >
              {{ item }}
            </NuxtLink>
          </p>

          <div v-if="page.source" class="mt-4 flex items-center">
            <span class="material-symbols-outlined text-secondary/20">
              emoji_nature
            </span>
            <span class="ml-2 uppercase">source of inspiration:</span>
            《<span class="line-clamp-1">
              <a
                :href="page.source"
                target="_blank"
                class="text-primary uppercase"
                >{{ page.source }}
              </a> </span
            >》
          </div>

          <p class="mt-4 flex items-center">
            <span class="material-symbols-outlined text-accent/20"> code </span>
            <span class="ml-2 uppercase">source code:</span>
            <span>
              <a
                :href="`${github}${
                  page.template_folder ? '/index.vue' : '.vue'
                }`"
                target="_blank"
                class="ml-1 text-info"
              >
                {{ page._path.replace("/introduce", "/template") }}
              </a>
            </span>
          </p>

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
                v-lazy="useCFContentVLazy(item._path, item.previews[0], 'sm')"
                class="w-full aspect-video object-contain rounded-box border border-base-200 shadow bg-base-200/20"
                :alt="`${item.title} template in ${item.tags.join(
                  '/'
                )}, based on tailwindcss,daisyui. introduce › list › sm`"
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
    ? `https://github.com/meetqy/wcao.cc/blob/dev/components/template/${page.value._path.replace(
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

  const imgPreview = document.getElementById("img-preview");

  toTop();

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
