<template>
  <div class="w-screen h-screen overflow-y-auto">
    <div
      class="relative xl:h-[700px] z-10 bg-cover flex flex-col xl:bg-fixed"
      :style="{ backgroundImage: `url(${usePicsum('/1920/1080')})` }"
    >
      <!-- 颜色遮罩 -->
      <div class="h-full bg-primary/50 absolute top-0 left-0 w-full"></div>

      <!-- header -->
      <header
        class="h-[103px] relative bg-neutral/50 text-neutral-content px-10 z-20 hidden xl:block"
      >
        <div class="navbar h-full">
          <div class="navbar-start">
            <img class="w-12 h-12" :src="baseInfo[lang].logo" />
            <ul class="menu menu-horizontal ml-10 uppercase">
              <li
                v-for="(item, i) in $MockKeywords()[lang].menu.slice(0, 3)"
                :key="i"
              >
                <a href="javascript:;">{{ item.text }}</a>
              </li>
            </ul>
          </div>

          <div class="navbar-end">
            <ul class="menu menu-horizontal ml-10 uppercase">
              <li
                v-for="(item, i) in $MockKeywords()[lang].menu.slice(3, 5)"
                :key="i"
              >
                <a href="javascript:;">{{ item.text }}</a>
              </li>
            </ul>

            <div class="space-x-4 flex items-center">
              <span class="ml-10">
                ${{ $Mock.Random.natural(0.0, 100) }}.00
              </span>
              <span class="material-symbols-outlined"> local_mall </span>
              <span class="material-symbols-outlined"> person </span>
            </div>
          </div>
        </div>
      </header>

      <header
        class="h-[70px] relative bg-base-100 flex justify-between px-5 items-center lg:hidden"
      >
        <img class="w-12 h-12" :src="baseInfo[lang].logo" />

        <div class="flex items-center space-x-2">
          <span class="ml-10"> ${{ $Mock.Random.natural(0.0, 100) }}.00 </span>
          <div class="btn btn-ghost btn-square">
            <span class="material-symbols-outlined"> local_mall </span>
          </div>
          <div class="btn btn-square">
            <span class="material-symbols-outlined"> menu </span>
          </div>
        </div>
      </header>

      <!-- banner -->
      <div
        class="relative z-20 text-neutral-content flex items-center flex-1 container m-auto lg:p-10 px-4 py-20"
      >
        <div class="lg:w-1/2 lg:text-left w-full text-center m-auto lg:m-0">
          <h1 class="lg:text-7xl text-xl line-clamp-2 font-black">
            {{ $MockTitle()[lang] }}
          </h1>
          <p class="lg:my-10 my-5 lg:text-4xl text-lg">
            {{ $MockJob()[lang] }}
          </p>
          <div class="flex lg:flex-row flex-col lg:space-x-4">
            <button class="custom-btn">
              {{ $MockKeywords()[lang].readMore }}
            </button>
            <button class="custom-btn-outline mt-4 lg:mt-0">
              {{ $MockKeywords()[lang].welcome }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- section2 -->
    <section class="bg-base-100 lg:py-20 py-10 container m-auto xl:px-10 px-4">
      <!-- logos -->
      <div class="flex justify-between flex-wrap h-12 overflow-hidden">
        <div
          v-for="item in 4"
          :key="item"
          class="flex w-full lg:w-auto items-center justify-center"
        >
          <span class="material-symbols-outlined" style="font-size: 56px">
            search
          </span>
          {{ $MockName()[lang] }}
        </div>
      </div>

      <!-- items -->
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-20 mt-10">
        <div
          v-for="item in $MockList(3)[lang]"
          :key="item"
          class="lg:h-[480px] h-[300px] w-full relative flex items-end bg-cover"
          :style="{ backgroundImage: `url(${item.image})` }"
        >
          <!-- 遮罩 -->
          <div
            class="bg-neutral/50 absolute left-0 top-0 z-10 w-full h-full"
          ></div>

          <div
            class="text-neutral-content relative z-20 xl:p-10 space-y-4 w-full p-4"
          >
            <h2 class="text-xl line-clamp-1 font-bold">
              {{ item.title }}
            </h2>
            <p class="line-clamp-2">{{ item.desc }}</p>
            <button class="custom-btn w-full lg:w-auto">
              {{ item.author }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- section3  -->
    <section class="bg-base-200 lg:py-20 py-10">
      <div class="container m-auto lg:px-10 px-4">
        <h2 class="text-3xl text-center font-bold">
          {{ $MockTitle(2, 4)[lang] }}
        </h2>
        <!-- drivider -->
        <div class="flex justify-center mt-6">
          <div class="h-[2px] w-24 bg-primary"></div>
        </div>

        <div class="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 mt-12 gap-4">
          <div
            v-for="(item, i) in $MockList(10)[lang]"
            :key="i"
            class="space-y-2 text-sm"
          >
            <img :src="item.image" class="object-cover" />
            <h4 class="lg:text-xl text-lg line-clamp-1">{{ item.title }}</h4>
            <p class="text-base-content/40">{{ item.author }}</p>
            <p>{{ item.price }}</p>
            <div class="rating rating-xs">
              <input
                v-for="rating in 5"
                :key="rating"
                type="radio"
                name="rating-1"
                class="mask mask-star bg-secondary"
              />
            </div>
          </div>
        </div>

        <div
          class="py-20 bg-cover lg:mt-20 mt-10 xl:bg-fixed relative flex items-center"
          :style="{ backgroundImage: `url(${usePicsum('/1920/1080')})` }"
        >
          <div class="absolute w-full h-full bg-primary/30"></div>
          <div
            class="text-primary-content relative z-10 xl:w-1/2 lg:w-2/3 space-y-8 xl:px-20 lg:px-10 px-4"
          >
            <p class="lg:text-2xl text-lg">{{ $MockJob()[lang] }}</p>
            <h3 class="lg:text-4xl text-xl font-bold">
              {{ $MockTitle(1, 4)[lang] }}
            </h3>
            <p class="line-clamp-2 text-sm">{{ $MockContent()[lang] }}</p>
            <p class="lg:text-2xl text-lg">{{ $MockJob()[lang] }}</p>
            <div class="custom-btn w-full lg:w-auto">
              {{ $MockKeywords()[lang].readMore }}
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 grid-flow-row lg:mt-20 mt-10 gap-12"
        >
          <div v-for="item in 4" :key="item" class="space-y-4 text-center">
            <span class="material-symbols-outlined" style="font-size: 64px">
              star_half
            </span>
            <h4 class="text-xl font-bold">{{ $MockTitle(2)[lang] }}</h4>
            <p class="line-clamp-2 text-sm">{{ $MockContent()[lang] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 分隔 -->
    <div class="w-full border-y border-base-300 lg:p-10 p-4 text-2xl font-bold">
      <div class="container m-auto text-center">
        {{ $MockTitle()[lang] }}
      </div>
    </div>

    <!-- footer -->
    <footer class="footer lg:p-10 p-4 text-base-content container m-auto">
      <div>
        <img class="w-24 h-24" :src="baseInfo[lang].logo" />
        <p class="text-2xl font-bold">{{ baseInfo[lang].title }}</p>
      </div>

      <div v-for="item in 2" :key="item">
        <span class="footer-title">Services</span>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </div>

      <div>
        <span class="footer-title">Newsletter</span>
        <div class="form-control w-80">
          <label class="label">
            <span class="label-text">Enter your email address</span>
          </label>
          <div class="relative">
            <input
              type="text"
              placeholder="username@site.com"
              class="input input-bordered w-full pr-16"
            />
            <button
              class="btn btn-primary absolute top-0 right-0 rounded-l-none"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>

    <div class="p-10 border-t border-base-300">
      <div class="container m-auto flex justify-between flex-col lg:flex-row">
        <span class="text-center">
          Copyright © 2022 {{ baseInfo[lang].title }}. Powered by
          {{ baseInfo[lang].title }}.
        </span>

        <div class="flex space-x-4 justify-center lg:mt-0 mt-4">
          <span
            v-for="(item, i) in templateContacts"
            :key="i"
            class="fill-current"
            v-html="item"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>

<style lang="postcss" scoped>
.custom-btn {
  @apply btn bg-neutral-content border-neutral-content text-neutral hover:text-neutral-content;

  &-outline {
    @apply btn btn-outline border-neutral-content text-neutral-content hover:bg-neutral-content hover:text-neutral;
  }
}
</style>
