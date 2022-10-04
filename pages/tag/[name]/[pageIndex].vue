<template>
  <div
    ref="drawerContent"
    class="drawer-content flex flex-col items-center justify-center"
  >
    <CoreHeader />

    <TagList />

    <CoreFooter />
  </div>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
const drawerContent = ref(null);

watch(drawerContent, (e) => {
  new SimpleBar(e);
});
</script>
