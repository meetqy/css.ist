<template>
  <div
    ref="drawerContent"
    class="drawer-content flex flex-col items-center justify-center"
  >
    <CoreHeader />

    <Introduce />

    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>

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
