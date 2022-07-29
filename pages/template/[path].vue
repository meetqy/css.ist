<template>
  <component :is="templates[path]" v-if="full"></component>
  <NuxtLayout name="template" v-else>
    <component :is="templates[path]"></component>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

const { full, lang } = route.query;

const templates = {
  1: resolveComponent("Template1"),
  2: resolveComponent("Template2"),
  8: resolveComponent("Template8"),
};
</script>
