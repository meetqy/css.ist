<template>
  <div class="w-screen h-screen overflow-y-auto bg-base-200">
    <div class="border-b border-base-300">
      <div class="navbar max-w-5xl m-auto">
        <div class="navbar-start">
          <a class="btn btn-ghost normal-case text-xl">{{
            getWebConfig(lang).title
          }}</a>
        </div>

        <div class="navbar-end">
          <button class="btn btn-square btn-ghost block lg:hidden">
            <span class="material-symbols-outlined !text-3xl"> list </span>
          </button>
          <ul
            class="menu menu-vertical lg:menu-horizontal bg-transparent hidden lg:flex"
          >
            <li
              v-for="(item, i) in $MockKeywords()[lang].menu"
              :key="i"
              class="capitalize"
            >
              <a>{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-auto max-w-5xl lg:py-12 py-8 px-2 flex flex-col lg:flex-row">
      <div class="lg:w-2/3 w-full m-auto">
        <div
          v-for="(item, i) in $MockList(3, '/600/200')[lang]"
          :key="i"
          class="mb-12 lg:pr-16 px-4"
        >
          <div
            class="relative p-1 border-base-300 border mb-5 flex justify-center items-center"
          >
            <img v-lazy="vLazy(item.image)" class="w-full" alt="Image 01" />
            <span class="date"> {{ item.date }} </span>
          </div>

          <h2 class="text-2xl py-1 mb-6">{{ item.title }}</h2>

          <p class="mb-5 text-sm font-sans">
            {{ item.desc }}
          </p>
          <a href="javascript:;" class="text-primary text-sm capitalize">
            {{ $MockKeywords()[lang].readMore }}...
          </a>
        </div>

        <div class="btn-group">
          <button class="btn btn-sm btn-outline capitalize mr-4 font-normal">
            {{ $MockKeywords()[lang].previous }}
          </button>
          <button
            v-for="item in 5"
            :key="item"
            class="btn btn-sm btn-outline mx-4 text-base-content/70 font-normal"
          >
            {{ item }}
          </button>
          <button class="btn btn-sm btn-outline capitalize ml-4 font-normal">
            {{ $MockKeywords()[lang].next }}
          </button>
        </div>
      </div>
      <!-- END of content -->

      <div
        id="sidebar"
        class="flex-1 mt-12 lg:mt-0 mx-auto w-full px-4 lg:px-0"
      >
        <h3 class="text-xl capitalize">{{ $MockWord(8)[lang] }}</h3>
        <ul class="mt-4 mb-5 ml-2.5 templatemo_list">
          <li v-for="item in 6" :key="item" class="line-clamp-1">
            {{ $MockTitle()[lang] }}
          </li>
        </ul>

        <h3 class="text-xl mb-5 mt-14 capitalize">{{ $MockWord(8)[lang] }}</h3>
        <ul class="popular_post">
          <li
            v-for="(item, i) in $MockList(5)[lang]"
            :key="i"
            class="mb-7 text-sm font-serif"
          >
            <a href="#" class="text-primary">{{ item.title }}</a>
            <p class="line-clamp-2">
              {{ item.desc }}
            </p>
          </li>
        </ul>
      </div>
      <!-- END of sidebar -->
    </div>

    <div class="bg-base-300 text-base-content">
      <footer class="px-4 py-6 max-w-5xl m-auto text-sm">
        <p class="text-center">
          Copyright © 2022 - All right reserved by
          <span class="font-bold">css.ist</span>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>

<style scoped lang="postcss">
.date {
  @apply absolute w-28 h-12 top-2 -left-2 font-bold text-xs flex items-center justify-center text-base-100/70;
  background: url(./date.png) no-repeat 100% 100%;
}

.page {
  @apply py-1.5 px-2.5 border-base-300 border bg-base-100 mr-2 text-sm;
  &:hover {
    @apply bg-warning text-warning-content;
  }

  &.active {
    @apply bg-primary text-primary-content;
  }
}

.templatemo_list {
  li {
    @apply mb-2.5 pl-4 text-sm text-base-content/70;
    background: url(./list-tick.png) no-repeat scroll 0 5px;
  }
}
</style>
