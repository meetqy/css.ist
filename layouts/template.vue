<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div
        id="template-priview"
        class="fixed left-0 w-full top-0"
        :data-theme="mode"
      >
        <slot />
      </div>

      <div class="fixed left-0 md:left-2 top-1/3 z-50 flex flex-col">
        <div
          class="btn btn-primary btn-md btn-square md:scale-100 scale-75 drawer-button shadow-md md:mb-2"
          @click="
            navigateTo(path.replace('template', 'introduce'), {
              replace: true,
            })
          "
        >
          <span class="material-symbols-outlined"> chevron_left </span>
        </div>
        <label
          for="my-drawer"
          class="btn btn-square btn-md md:scale-100 scale-75 drawer-button shadow-md"
        >
          <span class="material-symbols-outlined"> flaky </span>
        </label>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay" />

      <ul class="menu w-80 bg-base-100 p-4">
        <li class="menu-title">
          <a>Choose Theme</a>
        </li>
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
              v-for="item in allThemes"
              :key="item"
              class="outline-base-content mt-4 overflow-hidden w-full rounded-lg outline-2 outline-offset-2"
              :data-set-theme="item"
              :class="{ outline: item === mode }"
              data-act-class="outline"
              @click="mode = item"
            >
              <div
                :data-theme="item"
                class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div class="grid grid-cols-5 grid-rows-3">
                  <div
                    class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4"
                  >
                    <div class="flex-grow text-sm font-bold">
                      {{ item }}
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap gap-1">
                      <div class="bg-primary w-2 rounded" />
                      <div class="bg-secondary w-2 rounded" />
                      <div class="bg-accent w-2 rounded" />
                      <div class="bg-neutral w-2 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <li class="menu-title mt-4">
          <a>Choose Language</a>
        </li>
        <div class="dropdown mt-2">
          <label tabindex="2">
            <input
              type="text"
              class="input input-bordered w-72 focus:outline-none focus:border-primary focus:border-2"
              placeholder="Choose a Theme"
              :value="langs[lang]"
            />
          </label>
          <div
            tabindex="2"
            class="dropdown-content max-h-96 grid-cols-1 w-72 p-4 pt-0 bg-base-300 rounded-box overflow-y-scroll"
          >
            <div
              v-for="(v, k) in langs"
              :key="k"
              class="mt-4 overflow-hidden w-full rounded-lg outline-primary"
              :class="{ outline: k === lang }"
              @click="setLang(k)"
            >
              <div
                class="bg-base-100 text-base-content w-full cursor-pointer font-sans px-4 py-3 flex justify-between"
              >
                <span>{{ k }} </span>
                <span class="capitalize"> {{ v }}</span>
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
const { path } = useRoute();

const langs = {
  en: "english",
  zh: "中文",
};

const lang = computed(() => useRoute().query.lang || "en");

const setLang = (k) => {
  useRouter().push(`${path}?lang=${k}`);
};

const mode = useColorMode({
  modes: allThemes,
});
</script>
