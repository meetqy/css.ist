<template>
  <div class="w-screen h-screen overflow-y-auto bg-base-200 pb-10">
    <div>
      <img :src="usePicsum('/1920/1080')" class="w-full lg:h-[70vh]" />

      <div class="container mx-auto mt-8 px-4">
        <!-- rating -->
        <div class="rating">
          <input
            v-for="item in 5"
            :key="item"
            type="radio"
            name="rating-1"
            class="mask mask-star bg-secondary"
          />
        </div>

        <!-- title -->
        <div
          class="flex lg:flex-row flex-col lg:justify-between lg:items-center items-start"
        >
          <h1 class="text-xl font-bold line-clamp-1">
            {{ $MockTitle()[lang] }}
          </h1>
          <div class="lg:w-1/3 flex justify-end items-center mt-4 lg:mt-0">
            <button class="btn btn-secondary btn-square">
              {{ $Mock.Random.natural(1, 9) }}
            </button>
            <span class="ml-4 font-bold">
              {{ $MockName()[lang] }}
            </span>
          </div>
        </div>

        <div class="divider border-base-200"></div>

        <!-- nav -->
        <div class="space-x-4 space-y-4">
          <button
            v-for="(item, i) in $MockKeywords()[lang].menu"
            :key="i"
            class="btn btn-sm lg:btn-md lg:px-8 capitalize"
            :class="activeIndex === i ? 'btn-active' : 'btn-outline'"
            @click="activeIndex = i"
          >
            {{ item.text }}
          </button>
        </div>

        <!-- content -->
        <main
          class="flex lg:flex-row flex-col justify-between mt-10 lg:space-x-10"
        >
          <div class="flex-1 space-y-10">
            <!-- section1 -->
            <section class="bg-base-100 py-8 px-4 rounded-box shadow">
              <p class="line-clamp-5 font-mono capitalize text-base">
                {{ $MockContent()[lang] }}
              </p>
              <button
                class="btn flex justify-center items-center btn-sm mt-4 btn-primary"
              >
                <span class="material-symbols-outlined !text-lg">
                  ios_share
                </span>

                <span class="capitalize ml-2">
                  {{ $MockKeywords()[lang].readMore }}
                </span>
              </button>
            </section>

            <!-- section2 -->
            <section class="bg-base-100 py-8 px-4 rounded-box shadow">
              <h2 class="line-clamp-1 text-lg font-semibold">
                {{ $MockTitle()[lang] }}
              </h2>

              <div class="divider border-base-200/20"></div>

              <!-- album -->
              <div
                class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4"
              >
                <div v-for="item in 4" :key="item">
                  <img
                    :src="usePicsum('/300/300')"
                    class="rounded-box w-full"
                  />

                  <div class="px-2">
                    <h3 class="font-semibold text-lg mt-2">
                      {{ $MockTitle(1)[lang] }}
                    </h3>
                    <p class="inline-flex items-center text-sm">
                      {{ $Mock.Random.natural(1910, 2050) }}
                      <span class="material-symbols-outlined !text-lg mx-1">
                        adjust
                      </span>
                      {{ $MockWord()[lang] }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- section3 -->
            <section class="bg-base-100 py-8 px-4 rounded-box shadow">
              <h2
                class="line-clamp-1 text-lg font-semibold border-b border-base-200 pb-4"
              >
                {{ $MockTitle()[lang] }}
              </h2>
              <p class="mt-4 line-clamp-5">{{ $MockContent()[lang] }}</p>
            </section>

            <!-- form -->
            <section class="bg-base-100 py-8 px-4 rounded-box shadow">
              <h2
                class="line-clamp-1 text-lg font-semibold border-b border-base-200 pb-4"
              >
                {{ $MockTitle()[lang] }}
              </h2>
              <div class="rating mt-4">
                <input
                  v-for="item in 5"
                  :key="item"
                  type="radio"
                  name="rating-1"
                  class="mask mask-star bg-secondary"
                />
              </div>

              <h4 class="text-sm font-bold mt-4">{{ $MockTitle()[lang] }}</h4>
              <input
                class="input w-full mt-2 input-bordered focus:outline-none"
                :placeholder="$MockTitle()[lang]"
              />
              <h4 class="text-sm font-bold mt-4">{{ $MockTitle()[lang] }}</h4>
              <textarea
                class="textarea w-full textarea-bordered focus:outline-none mt-2"
                :placeholder="$MockTitle()[lang]"
              ></textarea>
              <h4 class="text-sm font-bold mt-4 uppercase">
                {{ $MockKeywords()[lang].name }}
              </h4>
              <input
                class="input w-full textarea-bordered focus:outline-none mt-2"
                :placeholder="$MockKeywords()[lang].name"
              />
              <h4 class="text-sm font-bold mt-4 uppercase">
                {{ $MockKeywords()[lang].email }}
              </h4>
              <input
                class="input w-full textarea-bordered focus:outline-none mt-2"
                :placeholder="$MockKeywords()[lang].email"
              />

              <div class="mt-4 flex items-center">
                <input type="checkbox" class="toggle toggle-sm mr-4" checked />
                <span class="text-sm">{{ $MockTitle()[lang] }}</span>
              </div>

              <div class="mt-4">
                <button class="btn px-8 btn-primary">
                  {{ $MockKeywords()[lang].submit }}
                </button>
              </div>
            </section>
          </div>

          <!-- aside -->
          <aside class="lg:w-1/3 space-y-10 mt-10 lg:mt-0">
            <div class="bg-base-100 shadow rounded-box px-4 py-8">
              <h3
                class="text-lg font-bold capitalize line-clamp-1 border-b border-base-200 pb-4"
              >
                {{ $MockTitle(1, 4)[lang] }}
              </h3>
              <ul class="px-2 mt-4 space-y-8">
                <li
                  v-for="item in 4"
                  :key="item"
                  class="flex justify-between items-center"
                >
                  <span class="font-bold">{{ $MockJob()[lang] }}</span>
                  <span class="text-xs">{{ $MockName()[lang] }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-base-100 shadow rounded-box px-4 py-8">
              <h3
                class="text-lg font-bold capitalize line-clamp-1 border-b border-base-200 pb-4"
              >
                {{ $MockTitle(1, 4)[lang] }}
              </h3>
              <p class="text-base line-clamp-5 mt-4">
                {{ $MockContent()[lang] }}
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
const activeIndex = ref(0);
</script>
