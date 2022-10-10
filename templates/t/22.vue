<template>
  <div class="w-screen h-screen">
    <div
      class="bg-primary absolute top-0 left-0 bg-gradient-to-b from-neutral via-neutral-focus to-primary bottom-0 leading-5 h-full w-full overflow-hidden"
    ></div>
    <div
      class="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl"
    >
      <div
        class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10"
      >
        <div class="self-start hidden lg:flex flex-col text-neutral-content">
          <h1 class="my-3 font-semibold text-4xl">
            {{ baseInfo[lang].title }}
          </h1>
          <p class="pr-3 text-sm opacity-75">
            {{ baseInfo[lang].subtitle }}
          </p>
        </div>
      </div>
      <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-base-100 mx-auto rounded-3xl w-96">
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-base-content capitalize">
              {{ $MockKeywords()[lang].signIn }}
            </h3>
            <p class="text-base-content/30 text-sm mt-2">
              {{ $MockKeywords()[lang].noAccount }}
              <a
                href="javascript:;"
                class="text-sm text-primary hover:text-primary-focus capitalize"
              >
                {{ $MockKeywords()[lang].signUp }}
              </a>
            </p>
          </div>
          <div class="space-y-6">
            <div class="">
              <input
                class="w-full text-base-content text-sm px-4 py-3 bg-base-200 focus:bg-base-100 border border-base-200 rounded-lg focus:outline-none focus:border-primary"
                type="text"
                :placeholder="$MockKeywords()[lang].email"
              />
            </div>

            <div class="relative">
              <input
                :placeholder="$MockKeywords()[lang].pwd"
                type="password"
                class="group text-base-content focus:bg-base-100 focus:outline-none focus:border-primary text-sm px-4 py-3 rounded-lg w-full bg-base-200 border border-base-200"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="text-sm ml-auto">
                <a
                  href="javascript:;"
                  class="text-primary hover:text-primary-focus"
                >
                  {{ $MockKeywords()[lang].forgetPwd }}
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="capitalize btn btn-primary btn-block"
              >
                {{ $MockKeywords()[lang].signIn }}
              </button>
            </div>
            <div class="flex items-center justify-center space-x-2 my-5">
              <span class="h-px w-16 bg-base-300"></span>
              <span class="text-base-content/20 font-normal">or</span>
              <span class="h-px w-16 bg-base-300"></span>
            </div>
            <div class="flex justify-center gap-5 w-full">
              <button
                type="submit"
                class="btn btn-outline capitalize flex-1 border-base-300"
              >
                <svg
                  class="w-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  ></path>
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  ></path>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="submit"
                class="btn btn-outline capitalize flex-1 border-base-300"
              >
                <svg
                  class="w-4 mr-2"
                  viewBox="0 0 100 100"
                  style="enable-background: new 0 0 100 100"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_1"></g>
                  <g id="Layer_2">
                    <path
                      d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z"
                      style="fill: #1877f2"
                    ></path>
                    <path
                      d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92V64.104z"
                      style="fill: #f1f1f1"
                    ></path>
                  </g>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
          <div class="mt-7 text-center text-base-content/40 text-xs">
            <span> Copyright © 2021-2023 </span>
          </div>
        </div>
      </div>
    </div>

    <svg
      class="absolute bottom-0 left-0 fill-current text-base-100"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>
<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
