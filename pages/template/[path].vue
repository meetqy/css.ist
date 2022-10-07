<template>
  <main v-if="$Mock">
    <component :is="templates[path]" />
  </main>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

const { title, tags } = await queryContent("introduce", path).findOne();

useHead({
  title: `${title} › template`,
  meta: [
    {
      name: "description",
      content: `${title} are ${tags}, based on tailwindcss,daisyui. › template`,
    },
    {
      name: "keywords",
      content: `${tags.join(",")},tailwindcss,daisyui`,
    },
  ],
});

definePageMeta({
  layout: "template",
});

const templates = {
  1: resolveComponent("T1"),
  2: resolveComponent("T2"),
  3: resolveComponent("T3"),
  4: resolveComponent("T4"),
  5: resolveComponent("T5"),
  6: resolveComponent("T6"),
  7: resolveComponent("T7"),
  8: resolveComponent("T8"),
  9: resolveComponent("T9"),
  10: resolveComponent("T10"),
  11: resolveComponent("T11"),
  12: resolveComponent("T12"),
  13: resolveComponent("T13"),
  14: resolveComponent("T14"),
  15: resolveComponent("T15"),
  16: resolveComponent("T16"),
  17: resolveComponent("T17"),
  18: resolveComponent("T18"),
  19: resolveComponent("T19"),
  20: resolveComponent("T20"),
  21: resolveComponent("T21"),
};
</script>
