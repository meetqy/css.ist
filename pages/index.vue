<template>
  <div class="pb-12">
    <section class="w-full lg:px-12 px-6 mt-12">
      <CoreSwiper
        title="firstStage"
        :data="firstStage"
        :allow-touch-move="true"
        :cat="{ to: '/tag/firstStage', name: 'see all' }"
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
  </div>
</template>

<script setup>
const { data } = await useAsyncData("firstStage", () => {
  return Promise.all([getContentByTag("firstStage")]);
});

const [firstStage] = data.value;
</script>
