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
  title: `【TEMPLATE】${title} css.ist`,
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
  1: resolveComponent("Template1"),
  2: resolveComponent("Template2"),
  3: resolveComponent("Template3"),
  4: resolveComponent("Template4"),
  5: resolveComponent("Template5"),
  6: resolveComponent("Template6"),
  7: resolveComponent("Template7"),
  8: resolveComponent("Template8"),
  9: resolveComponent("Template9"),
  10: resolveComponent("Template10"),
  11: resolveComponent("Template11"),
  12: resolveComponent("Template12"),
  13: resolveComponent("Template13"),
};
</script>
