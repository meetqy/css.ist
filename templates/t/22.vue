<template>
  <div class="w-screen h-screen">
    <div
      class="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 text-center text-white bg-gray-800"
    >
      This a Tailwind CSS Login Page by aji.
      <a
        class="text-gray-200 underline"
        href="https://tailwindcomponents.com/component/login-9"
        >Component details</a
      >
    </div>
    <div
      class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"
    ></div>
    <div
      class="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl"
    >
      <div
        class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10"
      >
        <div class="self-start hidden lg:flex flex-col text-gray-300">
          <h1 class="my-3 font-semibold text-4xl">Welcome back</h1>
          <p class="pr-3 text-sm opacity-75">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups
          </p>
        </div>
      </div>
      <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
            <p class="text-gray-400">
              Don'thave an account?
              <a href="#" class="text-sm text-purple-700 hover:text-purple-700"
                >Sign Up</a
              >
            </p>
          </div>
          <div class="space-y-6">
            <div class="">
              <input
                class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                type=""
                placeholder="Email"
              />
            </div>

            <div class="relative" x-data="{ show: true }">
              <input
                placeholder="Password"
                :type="show ? 'password' : 'text'"
                class="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
              />
              <div
                class="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5"
              >
                <svg
                  :class="{ hidden: !show, block: show }"
                  class="h-4 text-purple-700 block"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>

                <svg
                  :class="{ block: !show, hidden: show }"
                  class="h-4 text-purple-700 hidden"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-sm ml-auto">
                <a href="#" class="text-purple-700 hover:text-purple-600">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
              >
                Sign in
              </button>
            </div>
            <div class="flex items-center justify-center space-x-2 my-5">
              <span class="h-px w-16 bg-gray-100"></span>
              <span class="text-gray-300 font-normal">or</span>
              <span class="h-px w-16 bg-gray-100"></span>
            </div>
            <div class="flex justify-center gap-5 w-full">
              <button
                type="submit"
                class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
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
                <!-- <svg class="w-4" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05 0 5.71-3.83 9.77-9.6 9.77-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51v-.01Z"></path></svg> -->
                <span>Google</span>
              </button>

              <button
                type="submit"
                class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500 px-"
              ></button>
            </div>
          </div>
          <div class="mt-7 text-center text-gray-300 text-xs">
            <span>
              Copyright © 2021-2023
              <a
                href="https://codepen.io/uidesignhub"
                rel=""
                target="_blank"
                title="Codepen aji"
                class="text-purple-500 hover:text-purple-600"
                >AJI</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-transparent absolute w-full bottom-0 left-0 z-30">
      <div class="container p-5 mx-auto flex items-center justify-between">
        <div class="flex mr-auto">
          <a
            href="https://codepen.io/uidesignhub"
            target="_blank"
            title="codepen aji"
            class="text-center text-gray-700 focus:outline-none"
            ><img
              src="/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
              alt="aji"
              class="object-cover mx-auto w-8 h-8 rounded-full w-10 h-10"
            />
            <p class="text-xl">aji<strong>mon</strong></p>
          </a>
        </div>
      </div>
    </footer>

    <svg
      class="absolute bottom-0 left-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="#fff"
        fill-opacity="1"
        d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>
<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
