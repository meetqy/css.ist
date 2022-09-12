<template>
  <main class="lg:p-12 p-4 min-h-screen relative">
    <h1
      class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4 flex items-center"
    >
      <span class="material-symbols-outlined mr-2 text-error">
        local_fire_department
      </span>
      news
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
          :to="`/page/${pageIndex - 1}`"
          class="ml-2 font-serif capitalize btn btn-sm btn-ghost"
        >
          prev
        </nuxt-link>

        <span class="px-6 text-primary/50 text-sm capitalize">
          {{ pageIndex }}
        </span>

        <nuxt-link
          :class="{ 'btn-disabled bg-transparent': nextList.length < 1 }"
          :to="`/page/${pageIndex + 1}`"
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
const route = useRoute();

const pageIndex = computed(() => +route.params.pageIndex);
const pageSize = 12;

const getData = async (index) => {
  return await queryContent("introduce")
    .where({
      _extension: "yml",
    })
    .only(["_id", "_path", "title", "tags", "previews"])
    .sort({ _file: -1, $numeric: 1 })
    .skip((index - 1) * pageSize)
    .limit(pageSize)
    .find();
};

const { data: list } = useAsyncData(`page/${pageIndex.value}`, () =>
  getData(pageIndex.value)
);

const nextList = ref([]);
nextList.value = await getData(pageIndex.value + 1);

useHead({
  title: `【PAGE ${pageIndex.value}】 - ${getWebConfig().title}`,
  meta: [
    {
      name: "description",
      content: getWebConfig().subtitle,
    },
  ],
});
</script>
