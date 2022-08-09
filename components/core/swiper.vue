<template>
  <Swiper
    :allow-touch-move="props.allowTouchMove"
    :modules="modules"
    :navigation="{
      nextEl: '.cu-swiper-button-next',
      prevEl: '.cu-swiper-button-prev',
    }"
    :breakpoints="props.breakpoints"
    :loop="props.loop"
    class="!pt-16"
    @swiper="onSwiper"
    @click="onClick"
  >
    <h3
      class="capitalize text-xl font-semibold tracking-widest absolute left-0 top-0 w-full h-8"
    >
      {{ title }}
    </h3>

    <div class="absolute right-0 top-0 flex justify-center items-center h-8">
      <div v-if="cat" class="btn btn-xs normal-case btn-link pt-1 pr-0">
        <NuxtLink :to="cat.to">{{ cat.name }}</NuxtLink>
      </div>
      <div class="btn-group">
        <div class="cu-swiper-button-prev">
          <span class="material-symbols-outlined !text-base text-center">
            arrow_back_ios_new
          </span>
        </div>

        <div class="cu-swiper-button-next">
          <span class="material-symbols-outlined !text-base">
            arrow_forward_ios
          </span>
        </div>
      </div>
    </div>

    <SwiperSlide v-for="item in props.data" :key="item._id">
      <div class="group overflow-hidden rounded-box">
        <NuxtLink :to="item._path">
          <img
            v-lazy="
              vLazy(
                useAsset(item.previews[0], item._path, {
                  format: 'webp',
                  w: 960,
                })
              )
            "
            class="aspect-square transition-transform cursor-zoom-in rounded-box border bg-base-200/20 md:group-hover:scale-125"
            :class="[
              'rounded-box w-full max-w-screen-md  aspect-video  object-contain border-base-300 ',
            ]"
          />
          <div
            class="w-full h-24 bottom-0 transition-colors duration-300 left-0 z-40 px-4 absolute bg-base-100/20 md:group-hover:bg-base-100/80"
          >
            <p class="text-lg mt-4 mb-2 font-medium capitalize">
              {{ item.title }}
            </p>
            <p>
              <NuxtLink
                v-for="tag in item.tags.slice(0, 3)"
                :key="tag"
                :to="`/tag/${tag}`"
                class="btn btn-xs mr-2 font-normal btn-primary relative z-50"
              >
                {{ tag }}
              </NuxtLink>
            </p>
          </div>
          <!-- </div> -->
        </NuxtLink>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, SwiperOptions, Swiper as SwiperType } from "swiper";

const modules = [Navigation];

const props = defineProps<{
  data: ParsedContent[] | null;
  title: string;
  breakpoints:
    | {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
      }
    | undefined;
  cat?: {
    name: string;
    to: string;
  };
  loop?: boolean;
  allowTouchMove?: boolean;
}>();

const onSwiper = (swiper: SwiperType) => {
  setTimeout(() => {
    swiper.navigation.init();
    swiper.navigation.update();
  }, 100);
};

const onClick = (_swiper: SwiperType) => {
  // console.log(swiper);
};
</script>

<style lang="postcss" scoped>
.cu-swiper-button-next,
.cu-swiper-button-prev {
  &.swiper-button-disabled {
    @apply text-base-300;
  }
  @apply btn btn-xs btn-ghost hover:bg-transparent;
}
</style>
