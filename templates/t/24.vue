<template>
  <div class="w-screen h-screen">24</div>
</template>
<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
