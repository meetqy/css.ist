<template>
  <main class="relative container px-4 m-auto lg:mt-12 mt-4 lg:mb-24 mb-12">
    <h1
      class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4 flex items-center"
    >
      <span class="material-symbols-outlined mr-2 text-error">
        local_fire_department
      </span>
      news
    </h1>
    <div
      class="grid 2xl:grid-cols-3 lg:grid-cols-2 lg:gap-8 grid-cols-1 gap-2 mt-8"
    >
      <div
        v-for="(item, i) in list"
        :key="item._id"
        class="w-full overflow-hidden mb-8"
      >
        <NuxtLink :to="item._path">
          <nuxt-img
            :src="useCFContentVLazy(item._path, item.previews[0], 'sm').src"
            class="md:w-full m-auto bg-base-200/20 min-h-[300px] border border-base-300 object-contain object-center rounded-box cursor-zoom-in"
            width="473"
            height="298"
            sizes="sm:100vw md:473"
            :preload="i < 6"
            loading="lazy"
            :alt="
              useImgAltContent(
                item.title,
                item.tags,
                item.previews[0],
                `index › ${item.title} › sm`
              )
            "
          />
        </NuxtLink>

        <div class="px-2 md:py-4">
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
          :to="pageIndex <= 1 ? 'javascript:;' : `/page/${pageIndex - 1}`"
          class="ml-2 font-serif capitalize btn btn-sm btn-ghost"
        >
          prev
        </nuxt-link>

        <span class="px-6 text-neutral-focus/70 text-sm capitalize">
          {{ pageIndex }}
        </span>

        <nuxt-link
          :class="{ 'btn-disabled bg-transparent': nextList.length < 1 }"
          :to="nextList.length < 1 ? 'javascript:;' : `/page/${pageIndex + 1}`"
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

const pageIndex = computed(() => +route.params.pageIndex || 1);
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

const { data: list } = await useAsyncData(`page/${pageIndex.value}`, () =>
  getData(pageIndex.value)
);

if (list.value.length < 1) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const nextList = ref([]);
nextList.value = await getData(pageIndex.value + 1);

useHead({
  title: `css.ist › news › ${pageIndex.value}`,
  meta: [
    {
      name: "description",
      content: getWebConfig().subtitle,
    },
  ],
});
</script>
