<template>
  <div class="pb-12">
    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="firstStage"
        :data="data.firstStage"
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
        :data="data.blogContent"
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
        :data="data.cardContent"
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
        :data="data.pageContent"
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

const data = reactive({
  blogContent: null,
  cardContent: null,
  pageContent: null,
  firstStage: null,
});

getContentByTag("blog", {
  pageIndex: 1,
  pageSize: 12,
}).then((res) => {
  data.blogContent = res;
});

getContentByTag("card", {
  pageIndex: 1,
  pageSize: 12,
}).then((res) => {
  data.cardContent = res;
});

getContentByTag("page", {
  pageIndex: 1,
  pageSize: 12,
}).then((res) => {
  data.pageContent = res;
});

getContentByTag("firstStage").then((res) => {
  data.firstStage = res;
});
</script>
