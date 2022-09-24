<template>
  <main>
    <slot name="outside" />
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div
        id="drawer-content"
        ref="drawerContent"
        class="drawer-content scroll-smooth !h-full"
      >
        <!-- mobile navbar -->
        <label
          for="my-drawer-2"
          class="drawer-button lg:hidden flex justify-between pl-4 border-b border-base-200/50 sticky top-0 bg-base-100 z-20"
        >
          <div class="flex justify-center items-center font-seri">
            <img
              :src="useCF('css.ist-logo', 'sm')"
              alt="css.ist logo"
              class="w-8 h-8 mr-2"
            />
            {{ getWebConfig().title }}
          </div>

          <CoreDark />
        </label>

        <div class="sticky top-0 z-30 bg-base-100 text-base-content">
          <!-- pc navbar -->
          <div
            class="navbar h-16 bg-base-100 pl-4 hidden lg:flex border-b border-base-200"
          >
            <div class="flex-1">
              <div class="dropdown w-72">
                <label tabindex="0" class="block my-2 bg-transparent">
                  <input
                    type="text"
                    class="input w-full input-bordered h-10"
                    placeholder="search here..."
                  />
                </label>
                <div
                  tabindex="0"
                  class="dropdown-content card w-full shadow border bg-base-100"
                >
                  <ul class="menu w-full rounded-box">
                    <li><a class="active">Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                  </ul>
                </div>
              </div>
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
      <div
        id="drawer-side"
        ref="drawerSide"
        class="drawer-side overflow-x-hidden w-80"
      >
        <label for="my-drawer-2" class="drawer-overlay" />

        <aside class="bg-base-100">
          <div
            class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100"
          >
            <NuxtLink
              to="/"
              class="btn btn-ghost text-2xl normal-case hover:bg-transparent hidden lg:flex font-serif"
            >
              <img
                :src="useCF('css.ist-logo', 'sm')"
                alt="css.ist logo"
                class="w-10 h-10 mr-2"
              />
              {{ getWebConfig().title }}
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
            <ul class="menu rounded-box p-2 capitalize w-full">
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
              :src="usePicsum('/300/300')"
            />
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

import { useInfiniteScroll, useScroll, useStorage } from "@vueuse/core";
const storage = useStorage("tag-list-data", []);

const drawerContent = ref(null);
const drawerSide = ref(null);

watch(drawerContent, (e) => {
  drawerContentElement.value = e;
});

watch(drawerSide, (e) => {
  drawerSideElement.value = e;
  new SimpleBar(drawerSideElement.value);
});

useInfiniteScroll(drawerContentElement, () => drawerContentPullUpEnd.value++, {
  distance: 100,
});

drawerContentScroll.value = useScroll(drawerContentElement);

const res = await queryContent("introduce").only(["tags"]).find();

const navs = [
  ...new Set(
    res
      .map((item) => item.tags)
      .filter((item) => !!item)
      .flat(1)
  ),
];
</script>
