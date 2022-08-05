<template>
  <div v-if="page" class="w-full">
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
            <h1 class="!m-0">
              {{ page.title }}
            </h1>

            <div class="w-full lg:w-1/3 flex justify-end mt-4 lg:mt-0">
              <Swiper
                :slides-per-view="4"
                :space-between="12"
                class="flex-1 bg-base-300"
                @tap="onTap"
              >
                <SwiperSlide v-for="(item, i) in page.previews" :key="i">
                  <img
                    v-lazy="
                      vLazy(
                        useAsset(item, 'embed,f_webp,s_300x300', page._path, {
                          format: 'webp',
                          s: '300x300',
                        })
                      )
                    "
                    class="w-full max-h-24 object-cover object-top !m-1 outline-4 outline"
                    :class="
                      activePreviewIndex === i
                        ? 'outline-primary'
                        : 'outline-base-100'
                    "
                  />
                </SwiperSlide>
              </Swiper>

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
              class="w-full flex-shrink-0 rounded-box bg-base-200 max-h-[80vh] overflow-y-auto transition-all mt-8 shadow"
            >
              <img
                v-lazy="
                  vLazy(
                    useAsset(item, 'f_webp', page._path, { format: 'webp' })
                  )
                "
                class="m-auto !my-0 transition-all object-center"
                :class="
                  full
                    ? 'object-contain cursor-zoom-out'
                    : 'w-96 object-fill cursor-zoom-in'
                "
                @click="full = !full"
              />
            </div>
          </template>

          <p class="mt-8 flex items-center">
            <span class="material-symbols-outlined"> sell </span>
            <span class="ml-1 uppercase">tags:</span>
            <NuxtLink
              v-for="item in page.tags"
              :key="item"
              :to="`/tag/${item}`"
              class="btn btn-primary btn-xs ml-2 !no-underline !text-primary-content"
              @click="cleanStorage"
            >
              {{ item }}
            </NuxtLink>
          </p>

          <div v-if="page.source" class="mt-4 flex items-center">
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
              class="cursor-zoom-in"
              @click="$router.push(item._path)"
            >
              <img
                v-lazy="
                  vLazy(
                    useAsset(item.previews[0], 'f_webp,500x500', item._path, {
                      format: 'webp',
                      s: '500x500',
                    })
                  )
                "
                class="w-full aspect-square object-cover object-top rounded-box border border-base-200 shadow"
              />
              <p class="px-2">{{ item.title }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const { page } = useContent();

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);

const onTap = (swiper) => {
  activePreviewIndex.value = swiper.clickedIndex;
  swiper.slideTo(swiper.clickedIndex);
};

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
