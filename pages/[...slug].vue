<template>
  <div class="w-full" v-if="page">
    <div
      class="bg-base-100 p-2 shadow rounded fixed right-4 top-20 z-50 opacity-80"
      v-if="page.previews"
    >
      <div class="flex justify-center mb-2">
        <NuxtLink
          :to="`${page._path.replace('introduce', 'template')}`"
          class="btn btn-primary btn-ghost btn-sm btn-square"
        >
          <span class="material-symbols-outlined"> settings </span>
        </NuxtLink>
      </div>

      <div
        v-for="(item, i) in page.previews"
        :key="i"
        @click="activePreviewIndex = i"
      >
        <div
          class="p-1 border-2 border-base-200 overflow-hidden rounded"
          :class="{
            'border-primary !border-solid': activePreviewIndex === i,
          }"
        >
          <img
            class="object-cover w-24 h-24 object-top m-0 p-0"
            v-lazy="vLazy(useAsset(item, 'embed,f_webp,s_300x300'))"
          />
        </div>
        <p class="text-center text-base-content/50 font-serif">0{{ i + 1 }}</p>
      </div>
    </div>

    <div class="fixed right-4 bottom-8 z-50">
      <div
        class="btn btn-primary btn-square btn-sm mr-2"
        @click="$router.back()"
      >
        <span class="material-symbols-outlined"> chevron_left </span>
      </div>
      <div class="btn btn-primary btn-circle btn-sm" @click="toTop">
        <span class="material-symbols-outlined"> expand_less </span>
      </div>
    </div>

    <div class="container m-auto bg-info/5 pb-8 rounded-b">
      <article class="prose max-w-full px-4 pt-8">
        <h1>{{ page.title }}</h1>
        <div v-if="page.previews" class="flex overflow-hidden">
          <div
            class="w-full flex-shrink-0"
            v-for="(item, i) in page.previews"
            v-show="activePreviewIndex === i"
          >
            <img
              v-lazy="vLazy(useAsset(item, 'f_web,w_1920'))"
              class="m-auto object-top object-cover transition-all"
              :class="
                full
                  ? 'w-full cursor-zoom-out'
                  : 'w-1/2 cursor-zoom-in aspect-square'
              "
              @click="full = !full"
            />
          </div>
        </div>

        <p class="mt-8">
          <span>tags:</span>
          <span class="btn btn-primary btn-xs ml-2" v-for="item in page.tags">
            {{ item }}
          </span>
        </p>

        <h2 class="capitalize">more</h2>
        <div class="grid grid-cols-4 gap-x-4">
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
const { page } = useContent();

console.log(page);

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);

const moreContent = await getContentByTag(page.value.tags, {
  pageIndex: 1,
  pageSize: 12,
});

try {
  const el = document.querySelector("#drawer-content");
  if (el) {
    el.scrollTop = 0;
  }
} catch (e) {}

const toTop = () => {
  document.querySelector("#drawer-content").scrollTop = 0;
};
</script>
