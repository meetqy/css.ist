<template>
  <div class="w-screen h-screen">21</div>
</template>
<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
