<template>
  <div>
    <component :is="templates[path]"></component>
  </div>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

const { full, lang } = route.query;

// route.meta.layout = full ? "full" : "template";

definePageMeta({
  middleware: ["use-layout"],
});

const templates = {
  "blog-1": resolveComponent("TemplateBlog1"),
  "blog-2": resolveComponent("TemplateBlog2"),
};
</script>
