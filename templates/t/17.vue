<template>
  <div class="w-screen h-screen overflow-y-auto">
    <!-- header -->
    <header
      class="w-full border-b border-base-200/70 bg-base-100 sticky top-0 z-50"
    >
      <div class="container max-w-screen-xl mx-auto">
        <div class="navbar bg-base-100">
          <div class="navbar-start w-2/3">
            <!-- mobile -->
            <div class="dropdown">
              <label tabindex="0" class="btn btn-ghost lg:hidden">
                <span class="material-symbols-outlined"> menu </span>
              </label>
              <ul
                tabindex="0"
                class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li v-for="(item, i) in $MockKeywords()[lang].menu" :key="i">
                  <a>{{ item.text }}</a>
                </li>
              </ul>
            </div>
            <!-- pc -->
            <a
              class="btn btn-ghost normal-case text-xl mr-4 hover:bg-transparent hidden lg:flex"
            >
              <img
                :src="useCF('css.ist-logo', 'sm')"
                alt="css.ist logo"
                class="w-10 mr-2"
              />
              {{ baseInfo[lang].title }}
            </a>
            <ul class="menu menu-horizontal p-0 capitalize lg:flex hidden">
              <li v-for="(item, i) in $MockKeywords()[lang].menu" :key="i">
                <a>{{ item.text }}</a>
              </li>
            </ul>
          </div>

          <div class="navbar-end lg:pr-8">
            <div class="btn btn-ghost normal-case lg:hidden">
              {{ baseInfo[lang].title }}
            </div>
            <input
              type="text"
              class="input input-bordered focus:outline-none hidden lg:block"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="w-full bg-base-100">
      <!-- section1 -->
      <section class="container max-w-screen-xl m-auto lg:py-16 py-8">
        <div
          class="flex items-center lg:flex-row flex-col space-y-8 lg:space-y-0 px-8"
        >
          <div class="flex-1 lg:pr-16">
            <h3 class="text-2xl">
              <s>{{ $MockWord(2, 5)[lang] }}</s>
            </h3>
            <p class="my-2">
              <s>{{ $MockJob()[lang] }}</s>
            </p>
            <h2 class="text-3xl text-primary mt-4">{{ $MockTitle()[lang] }}</h2>
            <p class="mt-4 line-clamp-4">
              {{ $MockContent()[lang] }}
            </p>
            <div class="flex mt-8">
              <a class="btn px-8 btn-primary mr-8"> 免费使用 </a>
              <a class="btn px-8"> 独立设计 </a>
            </div>
          </div>

          <div class="w-full flex-1">
            <img
              :src="usePicsum('/500/300')"
              alt="picsum"
              class="shadow-md rounded w-full"
            />
          </div>
        </div>
      </section>

      <!-- section2 -->
      <section class="bg-base-200/70 py-16">
        <div
          class="container max-w-screen-xl grid lg:grid-cols-3 grid-cols-1 m-auto lg:space-x-8 space-y-8 lg:space-y-0 px-8 lg:px-0"
        >
          <div v-for="item in 3" :key="item" class="flex justify-center">
            <div
              class="w-14 align-top text-center"
              v-html="
                templateIcons(item, '', 'fill-current text-primary  !text-3xl')
              "
            ></div>

            <div class="flex-1 flex flex-col">
              <h2 class="flex items-center text-primary text-2xl line-clamp-1">
                {{ $MockJob()[lang] }}
              </h2>
              <p class="line-clamp-2 mt-4">
                {{ $MockContent()[lang] }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- section3 -->
      <section class="container max-w-screen-xl m-auto py-8">
        <h2 class="text-3xl text-primary text-center line-clamp-1 uppercase">
          {{ $MockJob()[lang] }}
        </h2>
        <p class="line-clamp-1 text-base-content/70 mt-4 text-center">
          {{ $MockTitle()[lang] }}
        </p>
        <div class="flex justify-center mt-4">
          <div class="w-16 h-1 bg-secondary/60 rounded-full"></div>
        </div>

        <!-- grid -->
        <div
          class="grid grid-flow-row-dense lg:grid-cols-4 grid-col-2 px-8 lg:px-0 grid-rows-2 mt-8 gap-4"
        >
          <div class="col-span-2 row-span-1 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/600/300')" class="w-full h-full" />
          </div>
          <div class="col-span-1 row-span-2 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/300/600')" class="w-full h-full" />
          </div>
          <div class="col-span-1 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/300/300')" class="w-full h-full" />
          </div>
          <div class="col-span-1 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/300/300')" class="w-full h-full" />
          </div>
          <div class="col-span-1 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/300/300')" class="w-full h-full" />
          </div>
          <div class="col-span-1 rounded overflow-hidden shadow-md">
            <img :src="usePicsum('/300/300')" class="w-full h-full" />
          </div>
        </div>
      </section>

      <!-- section4 -->
      <section class="py-8 bg-base-200/70">
        <h2 class="text-3xl text-primary text-center line-clamp-1 uppercase">
          {{ $MockJob()[lang] }}
        </h2>
        <p class="line-clamp-1 text-base-content/70 mt-4 text-center">
          {{ $MockTitle()[lang] }}
        </p>
        <div class="flex justify-center mt-4">
          <div class="w-16 h-1 bg-secondary/60 rounded-full"></div>
        </div>

        <div
          class="container max-w-screen-lg grid lg:grid-cols-3 grid-cols-1 space-y-8 lg:space-y-0 lg:px-4 px-8 gap-x-4 mx-auto mt-8"
        >
          <div v-for="item in 3" :key="item" class="card bg-base-100 py-8 px-4">
            <h3
              class="text-xl font-bold text-center text-base-content uppercase"
            >
              {{ $MockWord()[lang] }}
            </h3>
            <img
              :src="usePicsum('/800/400')"
              class="lg:w-64 w-full h-48 rounded-box my-8 m-auto shadow"
            />
            <p class="text-center text-primary">
              ￥<span class="text-2xl">
                {{ $Mock.Random.natural(0, 9999) }}
              </span>
            </p>
            <p class="text-center text-neutral/50 uppercase my-2">
              {{ $MockWord()[lang] }}
            </p>
            <p class="text-center line-clamp-3">
              {{ $MockContent()[lang] }}
            </p>
            <div class="flex justify-center mt-8">
              <button class="btn px-8 btn-primary font-normal">
                {{ $MockKeywords()[lang].detail }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- section5 -->
      <section class="py-8">
        <h2 class="text-3xl text-primary text-center line-clamp-1 uppercase">
          {{ $MockJob()[lang] }}
        </h2>
        <p class="line-clamp-1 text-base-content/70 mt-4 text-center">
          {{ $MockTitle()[lang] }}
        </p>
        <div class="flex justify-center mt-4">
          <div class="w-16 h-1 bg-secondary/60 rounded-full"></div>
        </div>

        <div
          class="grid lg:grid-cols-4 grid-cols-1 container max-w-screen-xl m-auto px-8 lg:px-0 space-y-8 lg:space-y-0 lg:space-x-8 mt-8"
        >
          <div
            v-for="item in 4"
            :key="item"
            class="rounded-box overflow-hidden"
          >
            <img :src="usePicsum('/500/400')" class="h-64 w-full" />
            <div class="bg-base-200/70 p-4">
              <h2 class="text-primary text-xl line-clamp-1 capitalize">
                {{ $MockJob()[lang] }}
              </h2>
              <p class="text-neutral/50">
                {{ $Mock.mock("@date(yyyy-MM-dd)") }}
              </p>
              <p class="line-clamp-2 mt-2">
                {{ $MockContent()[lang] }}
              </p>
              <div class="border-t border-base-300 pt-4 mt-4">
                <span class="uppercase text-primary">{{
                  $MockKeywords()[lang].readMore
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex justify-center items-center py-12 uppercase text-primary"
        >
          <button class="btn btn-ghost font-normal">
            <span class="material-symbols-outlined mr-1">
              arrow_right_alt
            </span>
            {{ $MockKeywords()[lang].readMore }}
          </button>
        </div>
      </section>
    </div>

    <!-- footer -->
    <div class="bg-neutral text-neutral-content">
      <footer class="footer p-10 container max-w-screen-xl m-auto">
        <div v-for="item in 3" :key="item">
          <span class="footer-title">{{ $MockJob()[lang] }}</span>
          <a class="link link-hover">{{ $MockJob()[lang] }}</a>
          <a class="link link-hover">{{ $MockJob()[lang] }}</a>
          <a class="link link-hover">{{ $MockJob()[lang] }}</a>
          <a class="link link-hover">{{ $MockJob()[lang] }}</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
