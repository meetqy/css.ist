<template>
  <component :is="templates[path]" />
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

definePageMeta({
  layout: "template",
});

const templates = {
  1: resolveComponent("Template1"),
  3: resolveComponent("Template3"),
  4: resolveComponent("Template4"),
  5: resolveComponent("Template5"),
};
</script>
