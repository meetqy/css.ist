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
  title: `【TEMPLATE】${title} - css.ist`,
  meta: [
    {
      name: "description",
      content: `【TEMPLATE】${title} on ${tags} - css.ist`,
    },
    {
      name: "keywords",
      content: tags.join(","),
    },
  ],
});

definePageMeta({
  layout: "template",
});

const templates = {
  1: resolveComponent("1"),
  2: resolveComponent("2"),
  3: resolveComponent("3"),
  4: resolveComponent("4"),
  5: resolveComponent("5"),
  6: resolveComponent("6"),
  7: resolveComponent("7"),
  8: resolveComponent("8"),
  9: resolveComponent("9"),
  10: resolveComponent("10"),
  11: resolveComponent("11"),
  12: resolveComponent("12"),
  13: resolveComponent("13"),
  14: resolveComponent("14"),
  15: resolveComponent("15"),
};
</script>
