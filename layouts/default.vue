<template>
  <main>
    <slot name="outside" />
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div id="drawer-content" ref="drawerContent" class="drawer-content">
        <!-- mobile navbar -->
        <label
          for="my-drawer-2"
          class="drawer-button lg:hidden flex justify-between pl-4 border-b border-base-200/50 sticky top-0 bg-base-100 z-20"
        >
          <div class="flex justify-center items-center font-seri">
            <img src="/logo.png" class="w-8 h-8 mr-2" />
            {{ websiteConfig.name }}
          </div>

          <CoreDark />
        </label>

        <div class="sticky top-0 z-30 bg-base-100 text-base-content">
          <!-- pc navbar -->
          <div
            class="navbar h-16 bg-base-100 pl-4 hidden lg:flex border-b border-base-200"
          >
            <div class="flex-1">
              <input
                type="text"
                class="input w-72 input-bordered h-10"
                placeholder="search here..."
              />
            </div>
            <div class="flex-none">
              <CoreDark />
            </div>
          </div>
        </div>

        <!-- Page content here -->
        <slot />

        <CoreFooter />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay" />

        <aside class="w-80 bg-base-100">
          <div
            class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100"
          >
            <NuxtLink
              to="/"
              class="btn btn-ghost text-2xl normal-case hover:bg-transparent hidden lg:flex font-serif"
            >
              <img src="/logo.png" class="w-10 h-10 mr-2" />
              {{ websiteConfig.name }}
            </NuxtLink>

            <input
              class="input input-bordered h-10 w-10/12 lg:hidden"
              placeholder="search here ..."
            />
          </div>

          <div
            class="bg-base-100 border-r border-base-200 p-4 font-serif"
            style="height: calc(100% - 64px)"
          >
            <ul class="menu rounded-box p-2 capitalize">
              <li class="border-b border-base-200 pb-2">
                <NuxtLink to="/">
                  <span class="material-symbols-outlined"> home </span>
                  home
                </NuxtLink>
                <NuxtLink to="/about">
                  <span class="material-symbols-outlined"> person </span>
                  about
                </NuxtLink>
              </li>
              <li class="menu-title mt-2">
                <a>tags</a>
              </li>
              <li v-for="item in navs" :key="item">
                <NuxtLink :to="'/tag/' + item" @click="storage = []">
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>

            <!-- ads -->
            <img
              class="w-72 h-72 rounded-box mx-auto mt-4"
              :src="usePicsum('/288/288')"
            />
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useInfiniteScroll, useScroll, useStorage } from "@vueuse/core";
const storage = useStorage("tag-list-data", []);

const drawerContent = ref(null);
useInfiniteScroll(drawerContent, () => drawerContentPullUpEnd.value++, {
  distance: 100,
});

drawerContentScroll.value = useScroll(drawerContent);

const navs = ["page", "section", "blog", "profile", "card", "form", "hero"];
</script>
