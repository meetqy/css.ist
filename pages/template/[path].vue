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
  3: resolveComponent("Template3"),
  4: resolveComponent("Template4"),
  2: resolveComponent("Template2"),
  8: resolveComponent("Template8"),
};
</script>
