<template>
  <!-- 
    注：只注重整体结构、风格。一些可有可无的交互不会去实现
    颜色会统一使用 daisyui 中的变量，以便主题切换。
  -->
  <div class="w-screen h-screen bg-base-200 overflow-y-auto">
    <div class="bg-neutral text-neutral-content sticky top-0 z-50">
      <header class="navbar h-16 container max-w-screen-lg mx-auto lg:px-10">
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
        <div class="navbar-center hidden lg:block">
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

    <main class="conatiner max-w-screen-lg m-auto md:px-10 px-5">
      <!-- logo/title -->
      <section class="py-12">
        <h1 class="text-center text-3xl italic font-bold">
          {{ baseInfo[lang].title }}
        </h1>
        <p class="text-sm text-base-content/50 text-center mt-4">
          {{ baseInfo[lang].subtitle.split(".")[1] }}
        </p>
      </section>

      <!-- grid image -->
      <section class="grid grid-cols-4 gap-2">
        <div
          class="lg:col-span-2 lg:row-span-2 col-span-4 row-span-1 bg-primary relative max-h-96 lg:max-h-max overflow-hidden"
        >
          <img
            :src="usePicsum('/500/400')"
            class="w-full object-cover h-full"
          />

          <div
            class="absolute left-0 top-0 w-full h-full bg-neutral/40 flex justify-center items-center flex-col"
          >
            <div
              class="title bg-base-100 after:border-base-100 before:border-base-100 text-base-content"
            >
              {{ $MockTitle(1)[lang] }}
            </div>
            <div class="p-10">
              <h2
                class="text-center cursor-pointer transition-transform line-clamp-2 text-2xl text-neutral-content hover:scale-125"
              >
                {{ $MockTitle()[lang] }}
              </h2>
            </div>
            <button
              class="btn btn-outline border-base-100 text-base-100 hover:border-base-100 hover:bg-base-100 hover:text-base-content font-light"
            >
              {{ $MockKeywords()[lang].readMore }}
            </button>
          </div>
        </div>
        <div v-for="item in 4" :key="item" class="relative">
          <img :src="usePicsum('/300/300')" class="w-full" />
          <div
            class="absolute w-full h-full left-0 top-0 bg-neutral/40 text-neutral-content uppercase italic font-serif flex justify-center items-center lg:text-2xl text-xs"
          >
            {{ $MockTitle(1)[lang] }}
          </div>
        </div>
      </section>

      <!-- content -->
      <div class="mt-20 flex lg:flex-row flex-col">
        <div class="lg:w-2/3 w-full md:pr-10 space-y-20">
          <!-- item -->
          <div
            v-for="item in 6"
            :key="item"
            class="flex"
            :class="item % 2 === 0 ? 'group-reverse' : 'group '"
          >
            <!-- image -->
            <div class="md:w-1/2 w-1/3 relative overflow-hidden">
              <img
                :src="usePicsum('/300/300')"
                class="absolute transition-all cursor-pointer rounded-full w-full"
              />
            </div>

            <div class="md:w-1/2 w-2/3 md:pl-10">
              <h2 class="line-clamp-2 md:text-2xl text-lg">
                {{ $MockTitle()[lang] }}
              </h2>

              <!-- date -->
              <div
                class="md:text-sm text-xs mt-4 text-base-content/80 flex flex-wrap items-center msg"
              >
                <div>
                  <span class="underline">{{ $MockName()[lang] }}</span>
                  ,
                  <span>{{ $Mock.Random.datetime("yyyy-MM-dd") }}</span>
                </div>

                <div class="md:mt-4">
                  <span
                    class="uppercase inline-flex items-center justify-center ml-2 md:ml-0"
                  >
                    <span class="material-symbols-outlined !text-base mr-2">
                      share
                    </span>
                    share
                  </span>

                  <span class="ml-4 inline-flex items-center">
                    <span class="material-symbols-outlined !text-base mr-2">
                      favorite
                    </span>
                    999
                  </span>
                </div>
              </div>

              <p
                class="text-sm text-end hidden md:line-clamp-6 mt-8 text-base-content/80"
              >
                {{ $MockContent()[lang] }}
              </p>

              <p class="mt-8">
                <button class="btn btn-outline font-light">
                  {{ $MockKeywords()[lang].readMore }}
                </button>
              </p>
            </div>
          </div>

          <!-- older post -->
          <button class="btn btn-ghost font-light">
            <span class="material-symbols-outlined rotate-180 mr-2">
              trending_flat
            </span>
            {{ $MockKeywords()[lang].previous }}
          </button>
        </div>

        <aside class="content-aside flex-1">
          <section>
            <h3 class="text-lg font-light text-center uppercase">
              <span class="title">{{ $MockJob()[lang] }}</span>
            </h3>

            <!-- avatar -->
            <div class="flex justify-center my-8">
              <img :src="usePicsum('/200/200')" class="rounded-full" />
            </div>
            <p class="line-clamp-4 text-sm text-base-content/80 text-center">
              {{ $MockContent()[lang] }}
            </p>
          </section>

          <section class="mt-16">
            <h3 class="text-lg font-light text-center uppercase">
              <span class="title">{{ $MockTitle(1)[lang] }}</span>
            </h3>
            <ul
              class="text-center capitalize text-base-content/80 space-y-2 mt-8"
            >
              <li v-for="item in 5" :key="item">{{ $MockName()[lang] }}</li>
            </ul>
          </section>

          <section class="form mt-16">
            <div class="p-5 bg-base-200">
              <p
                class="text-sm text-center px-5 line-clamp-3 text-base-content/80 uppercase"
              >
                {{ $MockContent()[lang] }}
              </p>

              <p class="text-center my-8">
                <input class="input input-bordered focus:outline-none" />
              </p>

              <p class="text-center">
                <button class="btn btn-outline font-light">
                  {{ $MockKeywords()[lang].signUp }}
                </button>
              </p>
            </div>
          </section>

          <section class="mt-16">
            <h3 class="text-lg font-light text-center uppercase">
              <span class="title">{{ $MockTitle(1)[lang] }}</span>
            </h3>

            <div class="space-y-2 mt-8">
              <div v-for="item in 4" :key="item" class="flex">
                <img class="w-24 h-24" :src="usePicsum('/200/200')" />
                <div
                  class="text-center pl-4 flex-1 flex flex-col justify-center max-w-xs"
                >
                  <p class="text-lg line-clamp-2">
                    {{ $MockTitle(1, 5)[lang] }}
                  </p>
                  <p class="text-xs text-base-content/60">
                    <span class="uppercase">{{ $MockName()[lang] }}</span
                    >,
                    <span>
                      {{ $Mock.Random.date("MM-dd") }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-16">
            <img :src="usePicsum('/500/500')" class="m-auto" />
          </section>

          <section class="mt-16">
            <h3 class="text-lg font-light text-center uppercase">
              <span class="title">{{ $MockTitle(1)[lang] }}</span>
            </h3>
            <ul
              class="text-center capitalize text-base-content/80 space-y-2 mt-8"
            >
              <li v-for="item in 5" :key="item">{{ $MockName()[lang] }}</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>

    <footer class="py-20 bg-base-300 text-base-content text-center mt-20">
      <p class="text-5xl">{{ baseInfo[lang].title }}</p>
      <p class="mt-10 text-base-content/50">
        {{ baseInfo[lang].subtitle }}
      </p>
      <div class="mt-5">
        <input class="input input-bordered bg-base-100/20" />
        <button class="btn btn-outline ml-4">
          {{ $MockKeywords()[lang].submit }}
        </button>
      </div>
    </footer>

    <p class="bg-neutral text-neutral-content py-5 text-center">
      by {{ baseInfo[lang].title }} -
      <a
        href="https://github.com/meetqy/css.ist"
        target="_blank"
        class="capitalize"
        >github</a
      >
    </p>
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

.group {
  img {
    @apply scale-110 -left-[15%] -top-[15%];
  }

  &:hover {
    img {
      @apply scale-100 left-0 top-0;
    }
  }

  p,
  h2,
  .msg {
    @apply text-end justify-end;
  }
}

.group-reverse {
  @apply flex-row-reverse;

  img {
    @apply scale-110 -right-[15%] -top-[15%];
  }

  &:hover {
    img {
      @apply scale-100 right-0 top-0;
    }
  }

  p,
  h2,
  .msg {
    @apply text-start justify-start;
  }
}

.title {
  @apply relative px-8 py-1;

  &::after {
    @apply border-[13px] !border-r-transparent;
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    right: -1.2em;
  }

  &::before {
    @apply border-[13px] !border-l-transparent;
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    left: -1.2em;
    border-right-width: 14px;
  }
}

.content-aside {
  h3 .title {
    @apply bg-primary text-primary-content after:border-primary before:border-primary;
  }

  .form {
    padding: 4px;
    background-image: repeating-linear-gradient(
      135deg,
      #ff6969,
      #ff6969 10px,
      #fff 0px,
      #fff 20px,
      #85adff 0px,
      #85adff 30px,
      #fff 0px,
      #fff 40px
    );
  }
}
</style>
