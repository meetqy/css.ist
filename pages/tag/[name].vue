<template>
  <NuxtLayout>
    <main class="p-12 min-h-screen" v-if="list">
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
              v-lazy="vLazy(item.light)"
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
  </NuxtLayout>
</template>

<script setup>
import { useStorage } from "@vueuse/core";
import { onBeforeRouteLeave } from "vue-router";

const route = useRoute();
const { params } = route;

const { name } = params;
const storage = useStorage("tag-list-data", []);
const scrollStorage = useStorage("tag-scroll", 0);
const pageSize = 15;

const pageIndex = ref(1);
if (storage.value.length > 0) {
  pageIndex.value = Math.ceil(storage.value.length / pageSize);
}

const end = ref(false);
const list = ref([]);

onBeforeRouteLeave((a) => {
  if (a.name === "slug") {
    scrollStorage.value = drawerContentScroll.value.y;
  } else {
    storage.value = [];
    scrollStorage.value = 0;
  }

  console.log(scrollStorage.value, "leave");
});

const getData = async () =>
  await getContentByTag(name, {
    pageIndex: pageIndex.value,
    pageSize,
  });

onMounted(async () => {
  if (storage.value.length > 0) {
    list.value = storage.value;

    if (scrollStorage.value > 0) {
      await nextTick();
      setTimeout(() => {
        console.log(scrollStorage.value, "mounted");
        document.querySelector("#drawer-content").scrollTop =
          scrollStorage.value;
      });
    }

    return;
  }

  list.value = await getData();
  storage.value = list.value;
});

watch(drawerContentPullUpEnd, async (val) => {
  if (end.value) return;
  pageIndex.value++;
  const res = await getData();

  if (res.length > 0) {
    list.value = list.value.concat(res);
    storage.value = list.value;
  } else {
    end.value = true;
  }
});
</script>
