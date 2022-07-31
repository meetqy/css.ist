<template>
  <component :is="templates[path]"></component>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

definePageMeta({
  layout: "template",
});

const { lang } = route.query;

const templates = {
  4: resolveComponent("Template4"),
  2: resolveComponent("Template2"),
  8: resolveComponent("Template8"),
};
</script>
