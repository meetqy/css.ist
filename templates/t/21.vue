<template>
  <div class="w-screen h-screen overflow-y-auto bg-base-200/40">
    <!-- header -->
    <header class="bg-neutral text-neutral-content w-full">
      <div class="container flex flex-col m-auto lg:h-[174px] h-20">
        <!-- top -->
        <div
          class="navbar items-center flex-1 border-b border-neutral-content/10"
        >
          <div class="navbar-start space-x-2 lg:flex hidden">
            <span
              v-for="(item, i) in templateContacts"
              :key="i"
              v-html="item"
            ></span>
          </div>
          <div class="navbar-start lg:hidden">
            <button class="btn btn-ghost">
              <span class="material-symbols-outlined"> menu </span>
            </button>
          </div>
          <div class="navbar-center font-bold text-2xl">
            {{ baseInfo[lang].title }}
          </div>
          <div class="navbar-end">
            <span class="uppercase lg:block hidden">search</span>
            <button class="btn btn-ghost">
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>

        <!-- bottom menu -->
        <ul
          class="menu hidden lg:flex font-serif menu-horizontal m-auto capitalize text-neutral-content/60 py-4"
        >
          <li v-for="item in $MockKeywords()[lang].menu" :key="item">
            <a href="javascript:;">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </header>

    <!-- content -->
    <article class="md:py-20 py-12 container max-w-screen-lg m-auto font-mono">
      <div class="md:space-y-12 space-y-10">
        <h1 class="md:line-clamp-1 title text-center">
          {{ $MockTitle(2, 5)[lang] }}
        </h1>
        <img :src="usePicsum('/800/400')" class="m-auto w-full" />
      </div>

      <div class="md:px-10 px-4 md:space-y-12 space-y-10 md:mt-12 mt-10">
        <p class="text-base-content font-medium leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <p class="desc leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <p class="desc leading-7">
          {{ $MockContent()[lang] }}
        </p>

        <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-12 gap-x-6">
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
    <div class="bg-base-100 md:py-12 py-10">
      <div
        class="m-auto container max-w-screen-xl grid lg:grid-cols-2 grid-cols-1 gap-x-4 md:px-10 px-5"
      >
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

        <div class="mt-12 lg:mt-0">
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

      <div
        class="container max-w-screen-lg md:px-10 px-5 m-auto text-center md:mt-24 mt-12"
      >
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

    <!-- footer -->
    <footer class="bg-neutral md:py-24 py-12">
      <div
        class="container max-w-screen-xl m-auto flex lg:flex-row flex-col md:px-10 px-5"
      >
        <div class="lg:w-2/3 w-full lg:pr-32">
          <ul
            class="flex md:flex-row flex-col space-y-10 md:space-y-0 md:space-x-10"
          >
            <li v-for="item in 3" :key="item" class="flex-1">
              <h4
                class="text-neutral-content pb-10 border-b border-neutral-content/20 mb-5 uppercase"
              >
                {{ $MockTitle(1)[lang] }}
              </h4>
              <p
                v-for="p in 4"
                :key="p"
                class="text-neutral-content/50 text-sm"
              >
                {{ $MockTitle(1, 2)[lang] }}
              </p>
            </li>
          </ul>
        </div>

        <div class="flex-1 mt-12 lg:mt-0">
          <h4
            class="text-neutral-content inline-block pb-10 border-b border-neutral-content/20 mb-5 uppercase"
          >
            {{ $MockTitle(1)[lang] }}
          </h4>

          <p class="line-clamp-3 text-sm leading-6 text-neutral-content/50">
            {{ $MockContent()[lang] }}
          </p>

          <div
            class="mt-10 w-full overflow-hidden flex border-none justify-between pr-0 pl-4 input bg-transparent items-center bg-neutral-focus"
          >
            <span class="material-symbols-outlined text-base-100"> mail </span>
            <input
              type="text"
              placeholder="email"
              class="bg-transparent flex-1 h-full pl-4 focus:border-none outline-none text-neutral-content"
            />
            <button class="btn btn-primary rounded-l-none">
              {{ $MockKeywords()[lang].submit }}
            </button>
          </div>
        </div>
      </div>
      <p class="text-neutral-content/50 mt-20 md:px-10 px-5 text-center">
        © Copyright css.ist 2022
      </p>
    </footer>
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
