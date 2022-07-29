<template>
  <NuxtLayout>
    <div class="pb-12">
      <section class="w-full lg:px-12 px-6 mt-12">
        <CoreSwiper
          title="recommend"
          :data="recommendContent"
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
          :data="blogContent"
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
          :data="cardContent"
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
          :data="pageContent"
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
  </NuxtLayout>
</template>

<script setup>
const blogContent = await getContentByTag("blog", {
  pageIndex: 1,
  pageSize: 12,
});

const cardContent = await getContentByTag("card", {
  pageIndex: 1,
  pageSize: 12,
});

const pageContent = await getContentByTag("page", {
  pageIndex: 1,
  pageSize: 12,
});

const recommendContent = await queryContent("introduce")
  .where({
    recommend: true,
  })
  .limit(8)
  .find();
</script>
