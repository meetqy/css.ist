<template>
  <!-- 
    注：只注重整体结构、风格。一些可有可无的交互不会去实现
    颜色会统一使用 daisyui 中的变量，以便主题切换。
  -->
  <div class="w-screen h-screen bg-base-200 overflow-y-auto">
    <div class="bg-neutral text-neutral-content">
      <header class="navbar h-16 container mx-auto">
        <!-- contacts -->
        <div class="navbar-start space-x-4 flex items-center">
          <span
            v-for="(item, k) in templateContacts"
            :key="k"
            class="fill-current w-3.5 h-3.5 text-neutral-content/70 flex justify-center items-center"
            v-html="item"
          ></span>
        </div>

        <!-- menus -->
        <div class="navbar-center">
          <nav class="menu bg-neutral menu-horizontal capitalize font-serif">
            <li v-for="(item, i) in templateMenu[lang]" :key="i">
              <a
                href="javascript:;"
                :class="{ active: i === menuActive }"
                @click="menuActive = i"
              >
                {{ item.text }}
              </a>
            </li>
          </nav>
        </div>

        <!-- search -->
        <div class="navbar-end">
          <button class="btn">
            <span class="material-symbols-outlined"> search </span>
          </button>
        </div>
      </header>
    </div>

    <main class="conatiner m-auto">
      <!-- logo/title -->
      <section class="py-12">
        <h1 class="text-center text-3xl italic font-bold">
          {{ baseInfo[lang].title }}
        </h1>
        <p class="text-sm text-base-content/50 text-center mt-4">
          {{ baseInfo[lang].subtitle.split(".")[1] }}
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");

const menuActive = ref(0);
</script>

<style lang="postcss" scoped>
.menu {
  li a {
    @apply text-neutral-content/50 active:bg-transparent;
  }

  .active {
    @apply bg-transparent text-neutral-content/90;
  }
}
</style>
