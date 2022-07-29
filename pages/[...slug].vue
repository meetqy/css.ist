<template>
  <NuxtLayout>
    <template v-slot:outside>
      <div
        ref="el"
        class="w-screen h-screen fixed left-0 top-0 bg-black/80 z-[999] overflow-y-scroll"
      >
        <div
          class="btn btn-ghost text-white fixed left-0 top-0 z-[51]"
          @click="$router.go(-1)"
        >
          <span class="material-symbols-outlined"> close </span>
        </div>

        <div
          class="sticky w-full z-50 transition-all"
          :class="y > 50 ? 'top-0' : 'top-4'"
        >
          <div
            class="m-auto rounded px-4 py-2 flex items-center justify-between bg-base-100 prose !container transition-all"
            :class="y > 50 ? ' shadow-lg' : 'shadow-none'"
          >
            <h1 class="m-0 flex-1">{{ page.title }}</h1>
            <div class="flex flex-shrink-0" v-if="page.previews">
              <div
                v-for="(item, i) in page.previews"
                :key="i"
                class="p-1 border-dashed border-2 w-20 h-20 overflow-hidden mr-2"
                :class="{
                  'border-primary !border-solid': activePreviewIndex === i,
                }"
                @click="activePreviewIndex = i"
              >
                <img
                  class="object-cover w-full h-full object-top m-0 p-0"
                  v-lazy="vLazy(item)"
                />
              </div>
            </div>
            <div class="flex-1 flex justify-end">
              <NuxtLink
                class="btn btn-ghost text-primary capitalize"
                target="_blank"
                :to="`${page._path.replace('introduce', 'template')}`"
              >
                <span class="material-symbols-outlined"> visibility </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="container bg-base-100 m-auto rounded-b p-4 relative">
          <article class="prose max-w-full">
            <div class="relative mt-4" v-if="page.previews">
              <img
                v-lazy="vLazy(page.previews[activePreviewIndex])"
                class="m-auto object-cover object-top transition-all"
                :class="full ? 'w-full cursor-zoom-out' : 'w-96 cursor-zoom-in'"
                @click="full = !full"
                :style="`height: ${full ? 'auto' : 'calc(100vh - 300px)'}`"
              />
            </div>
          </article>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useScroll } from "@vueuse/core";

const { page } = useContent();

const el = ref(null);
const { y } = useScroll(el);

// 当前选中的预览图
const activePreviewIndex = ref(0);
const full = ref(false);
</script>
