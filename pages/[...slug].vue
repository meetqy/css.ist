<template>
  <NuxtLayout>
    <div class="w-full" v-if="page">
      <div
        class="bg-base-100 p-2 shadow rounded fixed right-4 top-20 z-50 opacity-80"
        v-if="page.previews"
      >
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
              v-lazy="vLazy(item)"
            />
          </div>
          <p class="text-center text-base-content/50 font-serif">
            0{{ i + 1 }}
          </p>
        </div>
      </div>

      <div class="fixed right-4 bottom-8">
        <div
          class="btn btn-primary btn-square btn-sm mr-2"
          @click="$router.back()"
        >
          <span class="material-symbols-outlined"> chevron_left </span>
        </div>
        <div class="btn btn-primary btn-circle btn-sm">
          <span class="material-symbols-outlined"> expand_less </span>
        </div>
      </div>

      <div class="container m-auto bg-info/5 pb-8 rounded-b relative">
        <article class="prose max-w-full px-4 pt-8">
          <h1>{{ page.title }}</h1>
          <div v-if="page.previews">
            <img
              v-lazy="vLazy(page.previews[activePreviewIndex])"
              class="m-auto object-top object-cover transition-all"
              :class="
                full
                  ? 'w-full cursor-zoom-out'
                  : 'w-1/2 cursor-zoom-in aspect-square'
              "
              @click="full = !full"
            />
          </div>

          <div class="flex items-center mt-8">
            <span>tags:</span>
            <div class="btn btn-primary btn-xs ml-2" v-for="item in page.tags">
              {{ item }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { page } = useContent();

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);
</script>
