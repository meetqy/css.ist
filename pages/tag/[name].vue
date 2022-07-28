<template>
  <main class="p-12">
    <h1
      class="capitalize text-xl font-semibold tracking-widest border-b border-base-200 pb-4"
    >
      {{ name }}
    </h1>

    <div class="columns-3 gap-8 mt-8">
      <div
        class="mb-8 w-full overflow-hidden"
        v-for="item in list"
        :key="item._id"
      >
        <NuxtLink :to="item._path">
          <img
            class="object-cover max-h-96 object-top w-full h-full rounded-box cursor-zoom-in"
            :src="item.light"
          />
        </NuxtLink>

        <div class="px-2">
          <h3 class="text-lg mt-4 mb-2 font-medium capitalize">
            {{ item.title }}
          </h3>
          <p>
            <NuxtLink
              :to="`/tag/${tag}`"
              v-for="tag in item.tags"
              :key="tag"
              class="btn btn-xs mr-2 font-normal btn-primary"
            >
              {{ tag }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-24">
      <div class="flex-1 border-t border-dotted"></div>
      <span class="px-12 text-base-300 font-thin font-sans">end</span>
      <div class="flex-1 border-t border-dotted"></div>
    </div>
  </main>
</template>

<script setup>
const { params } = useRoute();
const { name } = params;

const pageIndex = ref(1);
const end = ref(false);
const list = ref([]);

const getData = async () =>
  await getContentByTag(name, {
    pageIndex: pageIndex.value,
    pageSize: 15,
  });
list.value = await getData();

watch(drawerContentPullUpEnd, async (val) => {
  pageIndex.value++;
  const res = await getData();

  if (res.length > 0) {
    list.value = list.value.concat(res);
  } else {
    end.value = true;
  }
});
</script>
