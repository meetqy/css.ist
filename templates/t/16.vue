<template>
  <div class="w-screen h-screen overflow-y-auto bg-base-300 relative">
    <section class="lg:max-w-screen-xl mx-auto transition-all relative py-12">
      <div class="w-full relative z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="1274.991 1.615 1263 340"
          xml:space="preserve"
          class="fill-base-100 block w-full"
        >
          <path
            d="M2537.987 274.481 1698.165 1.615l-423.174 137.59.012 202.41h1262.988z"
          />
        </svg>

        <div class="flex-1 bg-base-100 w-2/3 px-8 lg:px-36">
          <h1
            class="lg:text-5xl md:text-3xl text-2xl font-bold lg:-mt-32 md:-mt-24 -mt-16 line-clamp-1"
          >
            {{ $MockTitle()[lang] }}
          </h1>
        </div>
        <div class="bg-base-100 px-8 lg:px-36">
          <p class="lg:w-4/5 w-full md:mt-8 mt-4 text-sm line-clamp-5">
            {{ $MockContent()[lang] }}
          </p>

          <div
            class="mt-8 lg:space-x-9 space-y-4 lg:space-y-0 flex flex-col lg:flex-row"
          >
            <input
              type="text"
              :placeholder="$MockKeywords()[lang].name"
              class="input lg:input-lg bg-base-300 lg:flex-1"
            />
            <input
              type="text"
              :placeholder="$MockKeywords()[lang].email"
              class="input lg:input-lg bg-base-300 lg:flex-1"
            />
            <button class="btn lg:btn-lg px-12 font-normal capitalize">
              {{ $MockKeywords()[lang].signUp }}
            </button>
          </div>

          <p
            class="text-xs mt-8 text-base-content/90 font-thin font-serif line-clamp-5"
          >
            {{ $MockContent()[lang] }}
          </p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="1274.991 1.615 1263 340"
          xml:space="preserve"
          class="fill-base-100 block w-full rotate-180"
          style="margin-top: -1px"
        >
          <path
            d="M2537.987 274.481 1698.165 1.615l-423.174 137.59.012 202.41h1262.988z"
          />
        </svg>
      </div>
    </section>

    <div class="h-1/2 w-full bg-neutral absolute bottom-0"></div>

    <div class="bg-neutral text-neutral-content relative z-10">
      <footer class="footer lg:max-w-screen-xl m-auto p-10">
        <div v-for="item in 3" :key="item">
          <span class="footer-title">{{ $MockWord(3, 8)[lang] }}</span>
          <a v-for="link in 4" :key="link" class="link link-hover capitalize">
            {{ $MockWord(3, 10)[lang] }}
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
