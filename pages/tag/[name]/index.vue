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
        <NuxtLink :to="item._path" @click="(e) => toIntroduce(e)">
          <img
            v-lazy="vLazy(useCF(item._path, item.previews[0], 'sm'))"
            class="bg-base-200/20 border border-base-300 min-h-[300px] object-contain object-center rounded-box cursor-zoom-in"
          />
        </NuxtLink>

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

      <div>
        <nuxt-link
          :class="{ 'btn-disabled bg-transparent': pageIndex <= 1 }"
          :to="`/tag/${name}/${pageIndex - 1}`"
          class="ml-2 font-serif capitalize btn btn-sm btn-ghost"
        >
          prev
        </nuxt-link>

        <span class="px-6 text-primary/50 text-sm capitalize">
          {{ pageIndex }}
        </span>

        <nuxt-link
          :class="{ 'btn-disabled bg-transparent': nextList.length < 1 }"
          :to="`/tag/${name}/${pageIndex + 1}`"
          class="font-serif capitalize btn btn-sm btn-ghost mr-2"
        >
          next
        </nuxt-link>
      </div>
      <div class="flex-1 border-t border-dotted border-base-content/20" />
    </div>
  </main>
</template>

<script setup>
const pageIndex = ref(1);
const name = computed(() => useRoute().params.name);

const { data: list } = useAsyncData(
  `tag/${name.value}/${pageIndex.value}`,
  () =>
    getContentByTag(name.value, {
      pageIndex: pageIndex.value,
    })
);

const nextList = ref([]);
nextList.value = await getContentByTag(name.value, {
  pageIndex: pageIndex.value + 1,
});

useHead({
  title: `【TAG ${pageIndex.value}】${name.value} - css.ist`,
  meta: [
    {
      name: "description",
      content: `【TAG】${name.value} - css.ist ${getWebConfig().subtitle}`,
    },
  ],
});
</script>
