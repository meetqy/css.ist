<template>
  <div class="w-screen h-screen overflow-y-auto bg-base-200/40">
    <!-- header -->
    <header class="bg-neutral text-neutral-content w-full">
      <div class="container flex flex-col m-auto h-[174px]">
        <!-- top -->
        <div
          class="navbar items-center flex-1 border-b border-neutral-content/10"
        >
          <div class="navbar-start space-x-2">
            <span
              v-for="(item, i) in templateContacts"
              :key="i"
              v-html="item"
            ></span>
          </div>
          <div class="navbar-center font-bold text-2xl">
            {{ baseInfo[lang].title }}
          </div>
          <div class="navbar-end">
            <span class="uppercase">search</span>
            <button class="btn btn-ghost">
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>

        <!-- bottom menu -->
        <ul
          class="menu font-serif menu-horizontal m-auto capitalize text-neutral-content/60 py-4"
        >
          <li v-for="item in $MockKeywords()[lang].menu" :key="item">
            <a href="javascript:;">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </header>

    <!-- content -->
    <article class="py-20 container max-w-screen-lg m-auto font-mono">
      <h1 class="line-clamp-1 title text-center">
        {{ $MockTitle()[lang] }}
      </h1>
      <img :src="usePicsum('/800/400')" class="mt-12 m-auto w-full" />

      <div class="px-10">
        <p class="mt-12 font-bold text-base-content leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <p class="mt-12 desc leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <p class="mt-12 desc leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <div class="grid grid-cols-2 mt-12 gap-y-12 gap-x-6">
          <div v-for="item in 4" :key="item">
            <h2 class="subtitle line-clamp-1">{{ $MockTitle(2)[lang] }}</h2>
            <p class="desc mt-6 leading-7 line-clamp-6">
              {{ $MockContent()[lang] }}
            </p>
          </div>
        </div>
      </div>
    </article>

    <!-- other -->
    <div class="bg-base-100 py-12">
      <div class="m-auto container max-w-screen-xl grid grid-cols-2 gap-x-4">
        <div>
          <h2 class="line-clamp-1 subtitle">{{ $MockTitle(1)[lang] }}</h2>
          <ul class="space-y-4 mt-8">
            <li v-for="item in 4" :key="item" class="flex">
              <img :src="usePicsum('/200/200')" class="w-16 h-16" />
              <div class="flex-1 pl-4 flex flex-col justify-between font-bold">
                <h2 class="line-clamp-2">{{ $MockTitle()[lang] }}</h2>
                <p class="desc line-clamp-1">
                  {{ $MockTitle()[lang] }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="line-clamp-1 subtitle">
            {{ $MockTitle(1)[lang] }}
          </h2>
          <p class="mt-8 desc line-clamp-6">
            {{ $MockContent()[lang] }}
          </p>
          <div class="space-x-4 mt-4">
            <span
              v-for="(item, i) in templateContacts"
              :key="i"
              v-html="item"
            ></span>
          </div>
        </div>
      </div>

      <div class="container max-w-screen-lg m-auto text-center mt-24">
        <h2 class="subtitle line-clamp-1">
          {{ $MockTitle(1)[lang] }}
        </h2>
        <div class="flex mt-12 flex-wrap">
          <button
            v-for="item in 12"
            :key="item"
            class="btn mb-4 mr-4 btn-sm font-light"
          >
            {{ $MockName()[lang] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>

<style lang="postcss" scoped>
.title {
  @apply text-4xl font-extrabold capitalize;
}

.subtitle {
  @apply text-2xl font-extrabold capitalize;
}

.desc {
  @apply text-base-content/60 font-light;
}
</style>
