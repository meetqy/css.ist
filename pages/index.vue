<template>
  <div>
    <section class="w-12/12 m-auto px-16 py-4">
      <h3 class="capitalize text-xl font-semibold tracking-widest mt-4">
        blog
      </h3>
      <swiper
        :slidesPerView="2"
        :space-between="40"
        :loop="true"
        class="w-full mx-auto mt-4"
      >
        <swiper-slide v-for="item in blogContent" class="w-1/2">
          <div>
            <NuxtLink :to="item._path">
              <img :src="item.light" class="h-[380px] w-full rounded-box" />
            </NuxtLink>
            <p class="text-lg mt-4 mb-2 px-2 font-medium capitalize">
              {{ item.title }}
            </p>
            <p>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="btn btn-xs mr-2 font-normal btn-primary"
              >
                {{ tag }}
              </span>
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const blogContent = await queryContent("introduce")
  .where({
    tags: { $contains: "blog" },
  })
  .find();
console.log(blogContent);
</script>
