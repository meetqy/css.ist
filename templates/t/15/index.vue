<template>
  <main class="w-screen h-screen overflow-y-auto bg-base-100 relative">
    <div
      class="absolute w-full h-3/4 bg-gradient-to-b from-neutral to-base-100"
    ></div>
    <div
      class="lg:max-w-screen-lg w-11/12 mb-10 relative m-auto text-base-content lg:text-xs"
    >
      <div class="w-full h-16 justify-center md:flex hidden">
        <ul class="inline-flex">
          <li
            v-for="(item, i) in $MockKeywords()[lang].menu"
            :key="item.text"
            class="h-16 px-5 relative flex items-center justify-center"
          >
            <a
              class="text-base capitalize inline-block active:bg-transparent p-0 font-serif"
              href="javascript:;"
              :class="
                i === menuActive
                  ? ' text-neutral-content/80'
                  : 'text-neutral-content/50'
              "
              @click="menuActive = i"
            >
              {{ item.text }}
            </a>
            <span
              v-show="i === menuActive"
              class="material-symbols-outlined text-neutral-content/80 absolute -bottom-5 !text-4xl !m-0 !p-0"
            >
              arrow_drop_up
            </span>
          </li>
        </ul>
      </div>

      <div class="flex md:hidden h-16 items-center relative">
        <div class="btn btn-ghost btn-circle text-neutral-content/70">
          <span class="material-symbols-outlined"> widgets </span>
        </div>

        <span
          class="material-symbols-outlined text-neutral-content/80 absolute left-1.5 -bottom-5 !text-4xl !m-0 !p-0"
        >
          arrow_drop_up
        </span>
      </div>

      <div class="m-auto max-w-screen-lg relative bg-base-100 pb-9 shadow-md">
        <div
          class="w-full bg-cover bg-gradient-to-b from-base-300 to-base-100"
          style="font-family: 'Great Vibes', cursive; height: 190px"
        >
          <div
            class="italic text-center pt-14 lg:text-7xl text-4xl font-normal"
          >
            <a href="javascript:;">{{ baseInfo[lang].title }}</a>
          </div>
          <div
            class="m-auto text-2xl font-normal flex justify-center mt-4 text-secondary italic"
          >
            <span class="swirl_left">
              <span class="swirl_right">{{ baseInfo[lang].time }}</span>
            </span>
          </div>
        </div>
        <!-- End of Header-->

        <div
          class="w-11/12 mx-auto md:h-[500px] h-[300px] md:my-12 shadow-md relative"
        >
          <img
            :src="usePicsum('/1000/500')"
            class="border-8 border-base-200 h-full w-full bg-contain"
          />
          <div
            class="h-24 md:max-w-md w-full bg-neutral/70 text-neutral-content absolute bottom-0 md:right-2 md:bottom-5 p-4 font-serif"
          >
            <h2 class="text-xl line-clamp-1">{{ $MockTitle()[lang] }}</h2>
            <p class="mt-1 line-clamp-2">
              {{ $MockContent()[lang] }}
            </p>
          </div>
        </div>

        <div
          class="w-11/12 pb-10 mx-auto mt-12 md:mt-0 flex md:flex-row flex-col justify-between items-center"
        >
          <h2 class="md:text-2xl text-lg font-serif capitalize">
            {{ $MockKeywords()[lang].welcome }}
            <span class="text-primary italic normal-case">{{
              baseInfo[lang].title
            }}</span>
          </h2>
          <ul class="flex mt-6 md:mt-0">
            <li v-for="(item, k) in templateContacts" :key="k">
              <a
                class="btn btn-square btn-circle btn-sm ml-2 bg-neutral/70 border-neutral/50"
                href="javascript:;"
                v-html="item"
              >
              </a>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-col px-10 lg:flex-row pt-20 lg:space-x-14 bg-gradient-to-b from-base-200 to-base-100"
        >
          <div
            v-for="item in $MockList(2)[lang]"
            :key="item"
            class="flex flex-1 items-center lg:flex-row flex-col mb-10 lg:mb-0"
          >
            <img
              class="rounded-full w-32 h-32 my-1 shadow-xl"
              :src="item.authorAvatar"
            />
            <div class="pl-5 text-center lg:text-left">
              <h2
                class="text-primary text-2xl font-serif lg:mb-2 lg:mt-0 my-5 line-clamp-1"
              >
                {{ item.title }}
              </h2>
              <p class="line-clamp-3">
                {{ item.content }}
              </p>
              <p class="text-right mt-4">
                <a
                  href="javascript:;"
                  class="btn rounded-full shadow-md btn-sm font-normal normal-case font-serif"
                >
                  {{ $MockKeywords()[lang].readMore }}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="flex pr-10 lg:mt-20 lg:flex-row flex-col">
          <div
            v-for="item in $MockList(3)[lang]"
            :key="item"
            class="ml-10 flex-1 mt-10 lg:mt-0 flex lg:flex-row flex-col flex-wrap justify-center"
          >
            <h2
              class="line-clamp-1 text-center text-neutral/90 italic border-double border-b-4 border-neutral/20 text-2xl mb-4 mx-auto"
            >
              {{ item.title }}
            </h2>
            <a href="javascript:;" class="m-auto">
              <img
                :src="item.image"
                class="w-[260px] h-[130px] border-4 border-base-300"
              />
            </a>
            <p
              class="px-3 my-3 lg:my-0 lg:w-full m-auto text-center line-clamp-4"
            >
              {{ item.content }}
            </p>
            <p class="flex justify-center mt-4">
              <a href="javascript;">
                <span class="swirl_left">
                  <span class="swirl_right text-secondary text-sm font-serif">
                    {{ $MockKeywords()[lang].readMore }}
                  </span>
                </span>
              </a>
            </p>
          </div>
        </div>

        <div class="w-11/12 m-auto my-20">
          <div class="divider mt-10">
            <button
              class="btn opacity-90 btn-square btn-circle btn-sm normal-case font-normal text-xs font-serif shadow-md"
            >
              ms
            </button>
          </div>
        </div>

        <div class="w-11/12 m-auto flex flex-col lg:flex-row pb-10">
          <div
            class="pr-5 flex-1 lg:border-r border-b lg:border-b-0 pb-10 lg:pb-0 border-base-200 text-center"
          >
            <h2
              class="text-2xl font-serif !font-normal capitalize line-clamp-1"
            >
              {{ $MockWord(1, 3)[lang] }}
              <span class="text-primary">{{ $MockWord(1, 3)[lang] }}!</span>
            </h2>

            <div
              class="bg-base-300/30 text-base-content/90 p-3 rounded-md my-5 w-2/3 line-clamp-1 lg:w-full m-auto"
            >
              <p>{{ $MockWord(2, 10)[lang] }}...</p>
            </div>
            <div class="flex justify-center">
              <div
                v-for="(item, i) in templateContacts"
                :key="i"
                class="mr-4"
                v-html="item"
              ></div>
            </div>
          </div>

          <div
            class="flex-1 px-5 lg:py-0 py-10 lg:border-r lg:border-b-0 border-b border-base-200"
          >
            <h2
              class="text-2xl font-serif !font-normal mb-4 capitalize line-clamp-1"
            >
              {{ $MockKeywords()[lang].welcome }}
              <span class="text-primary normal-case">{{
                baseInfo[lang].title
              }}</span>
            </h2>
            <div
              class="text-sm border-dashed border-base-300 lg:border-b line-clamp-2 my-2"
            >
              <p>
                {{ $MockContent()[lang] }}
              </p>
            </div>
            <div
              class="text-sm border-dashed border-base-300 lg:border-b line-clamp-2 my-4"
            >
              {{ $MockContent()[lang] }}
            </div>
            <div
              class="text-sm border-dashed border-base-300 lg:border-b line-clamp-2 my-2"
            >
              <p>
                {{ $MockContent()[lang] }}
              </p>
            </div>
          </div>

          <div class="pl-5 flex-1 pt-10 lg:pt-0">
            <h2
              class="text-2xl font-serif !font-normal capitalize line-clamp-1"
            >
              {{ $MockWord(1, 3)[lang] }}
              <span class="text-primary">{{ $MockWord(1, 3)[lang] }}!</span>
            </h2>
            <p class="text-sm mt-5">
              <strong>Email:</strong> wedding@email.com <br />
              <strong>Phone:</strong> 234 324 234 / 0678 <br />
              <br />
            </p>
            <p class="line-clamp-4">{{ $MockContent()[lang] }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="mb-10 px-10">
      <p class="text-center">
        Copyright © 2022 - All right reserved by
        <span class="font-bold">css.ist</span>
      </p>
    </footer>
  </main>
</template>

<script setup>
const menuActive = ref(0);
const lang = computed(() => useRoute().query.lang || "en");
</script>

<style scoped lang="postcss">
.swirl_left {
  background: url(./swirl_left.png) no-repeat left;
  @apply pl-12;
}

.swirl_right {
  background: url(./swirl_right.png) no-repeat right;
  @apply pr-12;
}
</style>
