<template>
  <div class="w-screen h-screen overflow-y-auto">
    <section class="bg-base-100">
      <div class="flex justify-center min-h-screen">
        <div
          class="hidden bg-cover lg:block lg:w-2/5"
          :style="{ 'background-image': `url(${usePicsum('/715/1080')})` }"
        ></div>

        <div
          class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5"
        >
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-base-content">
              {{ baseInfo[lang].title }}
            </h1>

            <p class="mt-4 text-base-content/70">
              {{ baseInfo[lang].subtitle }}
            </p>

            <div class="mt-6">
              <h1 class="text-base-content/70">{{ $MockTitle(2, 3)[lang] }}</h1>

              <div class="mt-3 md:flex md:items-center md:-mx-2">
                <button class="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>

                  <span class="mx-2"> client </span>
                </button>

                <button class="btn btn-primary btn-outline ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>

                  <span class="mx-2"> worker </span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].firstName }}</label
                >
                <input
                  type="text"
                  placeholder="John"
                  class="input input-bordered w-full"
                />
              </div>

              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].lastName }}</label
                >
                <input
                  type="text"
                  placeholder="Snow"
                  class="block w-full input input-bordered"
                />
              </div>

              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].phone }}</label
                >
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX-XXX"
                  class="block w-full input input-bordered"
                />
              </div>

              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].email }}</label
                >
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  class="block w-full input input-bordered"
                />
              </div>

              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].pwd }}</label
                >
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="block w-full input input-bordered"
                />
              </div>

              <div>
                <label
                  class="block mb-2 text-sm text-base-content/90 capitalize"
                  >{{ $MockKeywords()[lang].confirmPwd }}</label
                >
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="block w-full input input-bordered"
                />
              </div>

              <button class="w-full btn btn-primary capitalize">
                <span>{{ $MockKeywords()[lang].signUp }} </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
