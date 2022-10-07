<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <slot></slot>

    <CoreHeader />

    <!-- aside -->
    <div class="drawer-side !overflow-hidden border-r border-base-200">
      <label for="my-drawer-2" class="drawer-overlay"></label>

      <aside
        ref="drawerSide"
        class="w-80 h-screen lg:overflow-y-visible overflow-y-auto capitalize lg:bg-base-200/50 bg-base-100/80 backdrop-blur pb-24"
      >
        <ul class="menu rounded-box p-2 w-full">
          <li class="lg:hidden h-10 bg-transparent"></li>
          <li class="border-b border-base-200 pb-2 lg:hidden">
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

        <img
          class="w-72 h-72 rounded-box mx-auto mt-4"
          :src="usePicsum('/300/300')"
        />
      </aside>
    </div>
  </div>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

const drawerSide = ref(null);
watch(drawerSide, (e) => !isMobile() && new SimpleBar(e));

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
