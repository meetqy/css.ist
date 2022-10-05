<template>
  <div ref="drawerContent" class="drawer-content">
    <TagList />
    <CoreFooter />
  </div>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
const drawerContent = ref(null);

watch(drawerContent, (e) => !isMobile() && new SimpleBar(e));
</script>
