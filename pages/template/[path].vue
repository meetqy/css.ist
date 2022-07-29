<template>
  <div>
    <component :is="templates[path]"></component>
  </div>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;
console.log(path);

// const { full, lang } = route.query;
// route.meta.layout = full ? "full" : "template";

definePageMeta({
  middleware: ["use-layout"],
});

const templates = {
  1: resolveComponent("Template1"),
  2: resolveComponent("Template2"),
  8: resolveComponent("Template8"),
};
</script>
