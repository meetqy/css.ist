<template>
  <div>
    <div v-show="!show" class="h-[200vh] w-full">
      <div class="home-header-sticky-container">
        <div
          class="home-header_text-wrapper"
          style="will-change: opacity"
          :style="{
            opacity:
              scrollTop >= 0 && scrollTop < temp
                ? Math.abs((scrollTop - temp) / temp)
                : 0,
          }"
        >
          <div class="margin-top is-home-header">
            <h1 class="home-header_h1">
              wcao, it's <br />
              praise, surprise
            </h1>
          </div>
          <div class="home-header_arrow-wrapper">
            <div class="scroll-to-continue">Scroll to continue</div>
            <div class="home-header_lottie-arrow-wrapper">
              <div
                data-w-id="6c182e9f-7fbd-e1c6-49ea-0c0076d46f90"
                data-animation-type="lottie"
                data-src="https://uploads-ssl.webflow.com/628a8bd4afeee681662cdf4b/628a8bd4afeee621e02cdf93_lf30_editor_kkiaa7zz.json"
                data-loop="1"
                data-direction="1"
                data-autoplay="1"
                data-is-ix2-target="0"
                data-renderer="svg"
                data-default-duration="2"
                data-duration="3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1080 1080"
                  width="1080"
                  height="1080"
                  preserveAspectRatio="xMidYMid meet"
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                >
                  <defs>
                    <clipPath id="__lottie_element_234">
                      <rect width="1080" height="1080" x="0" y="0"></rect>
                    </clipPath>
                    <clipPath id="__lottie_element_236">
                      <path d="M0,0 L1080,0 L1080,1080 L0,1080z"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#__lottie_element_234)">
                    <g
                      clip-path="url(#__lottie_element_236)"
                      transform="matrix(0,1,-1,0,1080,61.75433349609375)"
                      opacity="1"
                      style="display: block"
                    >
                      <g
                        transform="matrix(1,0,0,1,540,540)"
                        opacity="1"
                        style="display: block"
                      >
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            fill="rgb(251,247,245)"
                            fill-opacity="1"
                            d=" M200,0 C200,0 200,0 200,0 C200,5.519000053405762 195.5189971923828,10 190,10 C190,10 -190,10 -190,10 C-195.5189971923828,10 -200,5.519000053405762 -200,0 C-200,0 -200,0 -200,0 C-200,-5.519000053405762 -195.5189971923828,-10 -190,-10 C-190,-10 190,-10 190,-10 C195.5189971923828,-10 200,-5.519000053405762 200,0z"
                          ></path>
                          <path
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            fill-opacity="0"
                            stroke-miterlimit="4"
                            stroke="rgb(0,0,0)"
                            stroke-opacity="1"
                            stroke-width="0"
                            d=" M200,0 C200,0 200,0 200,0 C200,5.519000053405762 195.5189971923828,10 190,10 C190,10 -190,10 -190,10 C-195.5189971923828,10 -200,5.519000053405762 -200,0 C-200,0 -200,0 -200,0 C-200,-5.519000053405762 -195.5189971923828,-10 -190,-10 C-190,-10 190,-10 190,-10 C195.5189971923828,-10 200,-5.519000053405762 200,0z"
                          ></path>
                        </g>
                      </g>
                      <g
                        transform="matrix(1,0,0,1,750,402)"
                        opacity="1"
                        style="display: block"
                      >
                        <g
                          opacity="1"
                          transform="matrix(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,-80,74.5)"
                        >
                          <path
                            fill="rgb(251,247,245)"
                            fill-opacity="1"
                            d=" M100,0 C100,0 100,0 100,0 C100,5.519000053405762 95.51899719238281,10 90,10 C90,10 -90,10 -90,10 C-95.51899719238281,10 -100,5.519000053405762 -100,0 C-100,0 -100,0 -100,0 C-100,-5.519000053405762 -95.51899719238281,-10 -90,-10 C-90,-10 90,-10 90,-10 C95.51899719238281,-10 100,-5.519000053405762 100,0z"
                          ></path>
                          <path
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            fill-opacity="0"
                            stroke-miterlimit="4"
                            stroke="rgb(0,0,0)"
                            stroke-opacity="1"
                            stroke-width="0"
                            d=" M100,0 C100,0 100,0 100,0 C100,5.519000053405762 95.51899719238281,10 90,10 C90,10 -90,10 -90,10 C-95.51899719238281,10 -100,5.519000053405762 -100,0 C-100,0 -100,0 -100,0 C-100,-5.519000053405762 -95.51899719238281,-10 -90,-10 C-90,-10 90,-10 90,-10 C95.51899719238281,-10 100,-5.519000053405762 100,0z"
                          ></path>
                        </g>
                      </g>
                      <g
                        transform="matrix(1,0,0,1,749.5,529)"
                        opacity="1"
                        style="display: block"
                      >
                        <g
                          opacity="1"
                          transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-80,74.5)"
                        >
                          <path
                            fill="rgb(251,247,245)"
                            fill-opacity="1"
                            d=" M100,0 C100,0 100,0 100,0 C100,5.519000053405762 95.51899719238281,10 90,10 C90,10 -90,10 -90,10 C-95.51899719238281,10 -100,5.519000053405762 -100,0 C-100,0 -100,0 -100,0 C-100,-5.519000053405762 -95.51899719238281,-10 -90,-10 C-90,-10 90,-10 90,-10 C95.51899719238281,-10 100,-5.519000053405762 100,0z"
                          ></path>
                          <path
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            fill-opacity="0"
                            stroke-miterlimit="4"
                            stroke="rgb(0,0,0)"
                            stroke-opacity="1"
                            stroke-width="0"
                            d=" M100,0 C100,0 100,0 100,0 C100,5.519000053405762 95.51899719238281,10 90,10 C90,10 -90,10 -90,10 C-95.51899719238281,10 -100,5.519000053405762 -100,0 C-100,0 -100,0 -100,0 C-100,-5.519000053405762 -95.51899719238281,-10 -90,-10 C-90,-10 90,-10 90,-10 C95.51899719238281,-10 100,-5.519000053405762 100,0z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          class="home-header_introducing-glaredb-component !z-[99999]"
          style="will-change: opacity"
          :style="{
            opacity:
              scrollTop > temp ? (scrollTop - temp) / (clientHeight - temp) : 0,
          }"
        >
          <div class="introducing-glaredb_component">
            <div class="margin-bottom margin-small !cursor-pointer">
              <div
                class="text-style-overline-1 text-align-center underline"
                @click="show = true"
              >
                Ready go. 🚀
              </div>
            </div>
            <div class="introducing-glaredb_glaredb-text-wrapper">
              <div class="margin-bottom is-introducing-glaredb">
                <div
                  class="introducing-glaredb_glaredb-text outline-heading"
                  style="color: #faf8e2"
                >
                  wcao.cc
                </div>
              </div>
              <div class="max-width-medium">
                <p class="text-size-large">
                  Share reactive, multi-theme templates and components based on
                  TailwindCSS, DaisyUI.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="home-header-desktop_sky-gradient"
          style="
            will-change: transform;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
        ></div>

        <div
          class="home-header-desktop_stars"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              -temp + scrollTop / 1.5
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          data-w-id="ca18017e-7248-3e65-80e6-bb4d94d80f40"
          class="home-header-desktop_far-planets"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              scrollTop / 3
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_close-planets"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${
              scrollTop / 3
            }px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_sun-glow absolute-center"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${scrollTop / 8}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_far-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, ${scrollTop / 15}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_close-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, -${scrollTop / 10}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div
          class="home-header-desktop_server-buildings"
          style="will-change: transform; transform-style: preserve-3d"
          :style="{
            transform: `translate3d(0px, -${scrollTop / 5.5}px, 0px) scale3d(${
              1 + scrollTop / 1000
            }, ${1 + scrollTop / 1000}, ${
              1 + scrollTop / 1000
            }) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
          }"
        ></div>

        <div class="home-header-mobile_illustration"></div>
      </div>
    </div>

    <main v-show="show" class="font-mono wcao">
      <NuxtLoadingBar ref="loadingRef" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<script setup>
const router = useRouter();
const show = ref(false);
const clientHeight = ref(0);

const scrollTop = ref(0);
const temp = ref(0);

onMounted(() => {
  const el = document.documentElement;
  clientHeight.value = el.clientHeight;
  temp.value = clientHeight.value / 2.5;
  document.body.style = "overflow:hidden";
  setTimeout(() => {
    const T = setInterval(() => {
      scrollTop.value += 3;
      if (scrollTop.value >= clientHeight.value) {
        document.body.style = "overflow:auto";
        window.addEventListener("scroll", () => {
          scrollTop.value = document.documentElement.scrollTop;
        });
        clearInterval(T);
      }
    }, 10);
  }, 500);
});

const loadingRef = ref(null);

router.beforeEach((_to, _from, next) => {
  loadingRef.value.start();
  setTimeout(next, 500);
});
</script>

<style lang="postcss">
img[lazy="loading"] {
  @apply opacity-50;
}
</style>
