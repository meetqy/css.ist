<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="fixed left-0 w-full top-0" :data-theme="mode">
        <slot></slot>
      </div>

      <div class="fixed left-2 top-2 z-50 flex flex-col">
        <div
          class="btn btn-primary btn-square drawer-button shadow-md mb-2"
          @click="$router.back()"
        >
          <span class="material-symbols-outlined"> chevron_left </span>
        </div>
        <label
          for="my-drawer"
          class="btn btn-primary btn-square drawer-button shadow-md"
        >
          <span class="material-symbols-outlined"> flaky </span>
        </label>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>

      <ul class="menu w-80 bg-base-100 p-4">
        <li class="menu-title"><a>Themes</a></li>
        <div class="dropdown mt-2">
          <label tabindex="1">
            <input
              type="text"
              class="input input-bordered w-72 focus:outline-none focus:border-primary focus:border-2"
              placeholder="Choose a Theme"
              :value="mode"
            />
          </label>
          <div
            tabindex="1"
            class="dropdown-content max-h-96 grid-cols-1 w-72 p-4 pt-0 bg-base-300 rounded-box overflow-y-scroll"
          >
            <div
              v-for="item in themes"
              class="outline-base-content mt-4 overflow-hidden w-full rounded-lg outline-2 outline-offset-2"
              :data-set-theme="item"
              :class="{ outline: item === mode }"
              :key="item"
              @click="mode = item"
              data-act-class="outline"
            >
              <div
                :data-theme="item"
                class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div class="grid grid-cols-5 grid-rows-3">
                  <div
                    class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"
                  >
                    <div class="flex-grow text-sm font-bold">{{ item }}</div>
                    <div class="flex flex-shrink-0 flex-wrap gap-1">
                      <div class="bg-primary w-2 rounded"></div>
                      <div class="bg-secondary w-2 rounded"></div>
                      <div class="bg-accent w-2 rounded"></div>
                      <div class="bg-neutral w-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const mode = useColorMode({
  modes: {
    light: "light",
    dark: "dark",
    cupcake: "cupcake",
    bumblebee: "bumblebee",
    emerald: "emerald",
    corporate: "corporate",
    synthwave: "synthwave",
    retro: "retro",
    cyberpunk: "cyberpunk",
    valentine: "valentine",
    halloween: "halloween",
    garden: "garden",
    forest: "forest",
    aqua: "aqua",
    lofi: "lofi",
    pastel: "pastel",
    fantasy: "fantasy",
    wireframe: "wireframe",
    black: "black",
    luxury: "luxury",
    dracula: "dracula",
    cmyk: "cmyk",
    autumn: "autumn",
    business: "business",
    acid: "acid",
    lemonade: "lemonade",
    night: "night",
    coffee: "coffee",
    winter: "winter",
  },
});
</script>
