<template>
  <main>
    <slot name="outside"></slot>
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content" id="drawer-content" ref="drawerContent">
        <!-- mobile navbar -->
        <label
          for="my-drawer-2"
          class="drawer-button lg:hidden flex justify-between pl-4 border-b border-base-200/50 sticky top-0 bg-base-100 z-20"
        >
          <div class="flex justify-center items-center">
            <img src="/logo.png" class="w-8 h-8 mr-2" />
            {{ websiteConfig.name }}
          </div>

          <button class="btn btn-square btn-ghost hover:bg-transparent">
            <label class="swap swap-rotate">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" />
              <!-- sun icon -->
              <span class="material-symbols-outlined swap-on">
                light_mode
              </span>
              <!-- moon icon -->
              <span class="material-symbols-outlined swap-off">
                dark_mode
              </span>
            </label>
          </button>
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
              <button class="btn btn-square btn-ghost">
                <label class="swap swap-rotate">
                  <!-- this hidden checkbox controls the state -->
                  <input type="checkbox" />
                  <!-- sun icon -->
                  <span class="material-symbols-outlined swap-on">
                    light_mode
                  </span>
                  <!-- moon icon -->
                  <span class="material-symbols-outlined swap-off">
                    dark_mode
                  </span>
                </label>
              </button>
            </div>
          </div>
        </div>

        <!-- Page content here -->
        <slot></slot>

        <CoreFooter />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>

        <aside class="w-80 bg-base-100">
          <div
            class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100"
          >
            <NuxtLink
              to="/"
              class="btn btn-ghost text-xl normal-case hover:bg-transparent hidden lg:flex"
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
            class="bg-base-100 border-r border-base-200 p-4"
            style="height: calc(100% - 64px)"
          >
            <div
              class="collapse collapse-arrow min-h-[40px] bg-base-200 rounded-box"
            >
              <input type="checkbox" checked class="peer" />
              <div class="collapse-title capitalize">tag</div>
              <div class="collapse-content !p-0">
                <ul class="menu text-base-content capitalize border-base-200">
                  <!-- Sidebar content here -->
                  <li v-for="item in navs">
                    <NuxtLink :to="'/tag/' + item" @click="storage = []">
                      {{ item }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <!-- ads -->
            <img
              class="w-72 h-72 rounded-box mx-auto mt-4"
              :src="useMockPic('/288/288')"
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

const navs = [
  "page",
  "section",
  "blog",
  "homepage",
  "profile",
  "card",
  "form",
  "hero",
];
</script>
