<template>
  <div class="w-full" v-if="page">
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

    <div class="lg:container w-full bg-info/5 pb-8 rounded-b">
      <article
        class="md:prose prose-sm prose-p:mb-0 prose-h2:mb-0 !max-w-full px-4 pt-4"
      >
        <div
          class="pl-0 md:pl-4 shadow bg-base-100 overflow-hidden rounded-box mb-4 flex items-center justify-between flex-col md:flex-row"
          v-if="page.previews"
        >
          <h1 class="!m-0 py-4 md:py-0">{{ page.title }}</h1>

          <div
            class="flex justify-end max-h-24 flex-1 md:flex-none items-center bg-primary md:rounded-r-box rounded-b-box"
          >
            <div
              class="flex bg-base-300 items-center md:max-w-md w-full overflow-x-scroll"
            >
              <div
                v-for="(item, i) in page.previews"
                :key="i"
                @click="activePreviewIndex = i"
                class="p-1 border-2 border-transparent flex-shrink-0"
                :class="{
                  '!border-primary ': activePreviewIndex === i,
                }"
              >
                <img
                  class="object-cover w-24 h-24 object-top m-0 p-0"
                  v-lazy="vLazy(useAsset(item, 'embed,f_webp,s_300x300'))"
                />
              </div>
            </div>
            <NuxtLink
              :to="`${page._path.replace('introduce', 'template')}`"
              class="px-4 !h-full bg-primary text-primary-content flex justify-center items-center !no-underline"
            >
              <span class="material-symbols-outlined"> fullscreen </span>
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="page.previews"
          class="w-full flex-shrink-0 rounded-box bg-neutral max-h-[80vh] overflow-y-auto transition-all"
          v-for="(item, i) in page.previews"
          v-show="activePreviewIndex === i"
        >
          <img
            v-lazy="vLazy(useAsset(item, 'f_web'))"
            class="m-auto !my-0 transition-all object-center"
            :class="full ? 'object-contain' : 'w-96 object-fill'"
            @click="full = !full"
          />
        </div>

        <p class="mt-8 flex items-center">
          <span class="material-symbols-outlined"> sell </span>
          <span class="ml-1 uppercase">tags:</span>
          <NuxtLink
            :to="`/tag/${item}`"
            class="btn btn-primary btn-xs ml-2 !no-underline !text-primary-content"
            @click="cleanStorage"
            v-for="item in page.tags"
          >
            {{ item }}
          </NuxtLink>
        </p>

        <div class="mt-4 flex items-center" v-if="page.source">
          <span class="material-symbols-outlined"> my_location </span>
          <span class="ml-1 uppercase">source:</span>
          《<span class="line-clamp-1">
            <a
              :href="page.source"
              target="_blank"
              class="text-primary uppercase"
              >{{ page.source }}</a
            > </span
          >》
        </div>

        <h2 class="capitalize">more</h2>
        <div
          class="grid transition-all xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4"
        >
          <div
            v-for="item in moreContent"
            :key="item._id"
            @click="$router.push(item._path)"
            class="cursor-zoom-in"
          >
            <img
              v-lazy="vLazy(useAsset(item.previews[0], 'f_webp,s_500x500'))"
              class="w-full aspect-square object-cover object-top rounded-box border border-base-200 shadow"
            />
            <p class="px-2">{{ item.title }}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core";
const { page } = useContent();

// console.log(page);

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);

const moreContent = await getContentByTag(
  page.value.tags,
  {
    pageIndex: 1,
    pageSize: 12,
  },
  "$in"
);

try {
  const el = document.querySelector("#drawer-content");
  if (el) {
    el.scrollTop = 0;
  }
} catch (e) {}

const toTop = () => {
  document.querySelector("#drawer-content").scrollTop = 0;
};

const cleanStorage = () => {
  const storage = useStorage("tag-list-data");
  const scrollStorage = useStorage("tag-scroll");

  storage.value = [];
  scrollStorage.value = 0;
};
</script>
