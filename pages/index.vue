<template>
  <div class="pb-12">
    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="firstStage"
        :data="firstStage"
        :loop="true"
        :breakpoints="{
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1536: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }"
      />
    </section>

    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="Blog"
        :data="blog"
        :cat="{
          name: 'see all',
          to: '/tag/blog',
        }"
        :breakpoints="{
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }"
      />
    </section>

    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="fashion"
        :data="card"
        :content-on-image="true"
        :image-scale="true"
        :cat="{
          name: 'see all',
          to: '/tag/fashion',
        }"
        :breakpoints="{
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }"
      />
    </section>

    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="page"
        :data="page"
        :image-circle="true"
        :cat="{
          name: 'see all',
          to: '/tag/page',
        }"
        :breakpoints="{
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }"
      />
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const { data: firstStage } = useAsyncData("firstStage", () =>
  getContentByTag("firstStage")
);

const { data: blog } = useAsyncData("blog", () => getContentByTag("blog"));
const { data: card } = useAsyncData("card", () => getContentByTag("card"));
const { data: page } = useAsyncData("page", () => getContentByTag("page"));
</script>
