<template>
  <main class="w-screen overflow-hidden">
    <div
      class="template-10 w-[140%] relative -left-[20%] h-screen overflow-y-scroll flex flex-wrap justify-center bg-base-100"
    >
      <div v-for="item in 12" :key="item" style="flex: 0 0 auto; padding: 0.5%">
        <img
          v-lazy="vLazy(`https://source.unsplash.com/random/0x500?${item}`)"
          class="transition-transform duration-500"
        />
      </div>
    </div>
  </main>
</template>
<style lang="postcss">
.template-10 {
  img {
    &:hover {
      @apply shadow-md;
      transform: translate(0, -2%);
    }
  }
}
</style>
