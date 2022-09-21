<template>
  <main class="lg:p-12 p-4 min-h-screen relative">
    <h1
      class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4"
    >
      {{ name }}
    </h1>

    <div
      class="grid 2xl:grid-cols-3 lg:grid-cols-2 lg:gap-8 grid-cols-1 gap-2 mt-8"
    >
      <div
        v-for="item in list"
        :key="item._id"
        class="mb-8 w-full overflow-hidden"
      >
        <NuxtLink :to="item._path" @click="(e) => toIntroduce(e)">
          <img
            v-lazy="useCFContentVLazy(item._path, item.previews[0], 'sm')"
            class="bg-base-200/20 border border-base-300 min-h-[300px] object-contain object-center rounded-box cursor-zoom-in"
            :alt="
              useImgAltContent(
                item.title,
                item.tags,
                item.previews[0],
                `tag › ${name} › sm`
              )
            "
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
          :to="
            pageIndex <= 1 ? 'javascript:;' : `/tag/${name}/${pageIndex - 1}`
          "
          class="ml-2 font-serif capitalize btn btn-sm btn-ghost"
        >
          prev
        </nuxt-link>

        <span class="px-6 text-neutral-focus/70 text-sm capitalize">
          {{ pageIndex }}
        </span>

        <nuxt-link
          :class="{ 'btn-disabled bg-transparent': nextList.length < 1 }"
          :to="
            nextList.length < 1
              ? 'javascript:;'
              : `/tag/${name}/${pageIndex + 1}`
          "
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
const pageIndex = computed(() => +useRoute().params.pageIndex || 1);
const name = computed(() => useRoute().params.name);

const { data: list } = await useAsyncData(
  `tag/${name.value}/${pageIndex.value}`,
  () =>
    getContentByTag(name.value, {
      pageIndex: pageIndex.value,
    })
);

if (list.value.length < 1) {
  navigateTo("/404", {
    replace: true,
  });
}

const nextList = ref([]);
nextList.value = await getContentByTag(name.value, {
  pageIndex: pageIndex.value + 1,
});

const allTagList = ref([]);
allTagList.value = await getContentByTag(name.value, {
  pageSize: 99999999,
});

useHead({
  title: `css.ist › ${name.value} › ${pageIndex.value}`,
  meta: [
    {
      name: "description",
      content: `${allTagList.value.length} ${name.value} templates, based on tailwindcss,daisyui.`,
    },
  ],
});
</script>
