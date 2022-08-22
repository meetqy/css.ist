<template>
  <main class="lg:p-12 p-4 min-h-screen relative">
    <h1
      class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4"
    >
      {{ name }}
    </h1>

    <div class="2xl:columns-3 lg:columns-2 lg:gap-8 columns-1 gap-2 mt-8">
      <div
        v-for="item in list"
        :key="item._id"
        class="mb-8 w-full overflow-hidden"
      >
        <!-- <NuxtLink :to="item._path"> -->
        <img
          v-lazy="vLazy(useCF(item._path, item.previews[0], 'sm'))"
          class="bg-base-200/20 border border-base-300 min-h-[300px] object-contain object-center rounded-box cursor-zoom-in"
          @click="(e) => imgClick(e, item._path)"
        />
        <!-- </NuxtLink> -->

        <div class="px-2">
          <h3 class="text-lg mt-4 mb-2 font-medium capitalize">
            {{ item.title }}
          </h3>
          <p class="line-clamp-1">
            <NuxtLink
              v-for="tag in item.tags"
              :key="tag"
              :to="`/tag/${tag}`"
              class="btn btn-xs mr-2 font-normal btn-primary"
            >
              {{ tag }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center lg:mt-24 mt-12">
      <div class="flex-1 border-t border-dotted border-base-content/20" />
      <span class="px-12 text-base-content/50 font-medium font-sans">
        end
      </span>
      <div class="flex-1 border-t border-dotted border-base-content/20" />
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const { params } = route;
const { name } = params;

const { data: list } = useAsyncData(`tag/${name}`, () => getContentByTag(name));

useHead({
  title: `wcao.cc > tag > ${name}`,
});

const imgClick = (e, _path) => {
  const { target } = e;
  navigateTo(_path);

  nextImgProps.value = {
    start: {
      left: target.offsetLeft - drawerContentElement.value.scrollLeft + "px",
      top: target.offsetTop - drawerContentElement.value.scrollTop + "px",
      width: target.clientWidth + "px",
      height: target.clientHeight + "px",
    },
    end: {
      left: 0,
      top: 0,
      width: "calc(100% - 320px)",
      height: "calc(100% - 64px)",
    },
    src: target.src,
    status: "target-to-full",
  };
};
</script>
