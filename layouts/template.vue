<template>
  <main>
    <div class="drawer">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
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
            <div class="flex-1"></div>
            <div class="flex-none">
              <button class="btn btn-square btn-ghost" @click="openFull">
                <span class="material-symbols-outlined"> fullscreen_exit </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Page content here -->
        <slot></slot>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>

        <aside class="w-80 pb-12">
          <div
            class="z-20 sticky top-0 h-16 flex items-center justify-center border-b border-base-200 bg-base-100"
          >
            <NuxtLink to="/" class="btn btn-ghost hover:bg-transparent">
              <img src="/logo.png" class="w-10 h-10 mr-2" />
              {{ websiteConfig.name }}
            </NuxtLink>
          </div>

          <div
            class="min-h-full border-r border-base-200 lg:bg-transparent bg-base-100"
          >
            <ul
              class="menu p-4 overflow-y-auto w-full text-base-content border-base-200"
            >
              <!-- Sidebar content here -->
              <li v-for="item in themes">
                <a>{{ item }}</a>
              </li>
            </ul>

            <!-- ads -->
            <img
              class="w-72 h-72 rounded-box m-auto"
              :src="useMockPic('/288/288')"
            />
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
const themes = ["light", "dark", "cupcake", "bumblebee", "emerald"];

const openFull = () => {
  window.open(useRoute().fullPath + "?full=true");
};
</script>
