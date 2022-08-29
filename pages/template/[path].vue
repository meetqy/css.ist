<template>
  <component :is="templates[path]" />
</template>

<script setup>
const route = useRoute();
const { path } = route.params;
const { title, tags } = route.query;

useHead({
  title: `【TEMPLATE】${title},${tags} - wcao.cc`,
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
};
</script>
