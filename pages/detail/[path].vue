<template>
  <div>
    <component :is="templates[path]"></component>
  </div>
</template>

<script setup>
const route = useRoute();
const { path } = route.params;

const { full, lang } = route.query;

if (full) {
  definePageMeta({
    layout: "full",
  });
}

// console.log(full, lang);

const templates = {
  "blog-1": resolveComponent("TemplateBlog1"),
  "blog-2": resolveComponent("TemplateBlog2"),
};
</script>
