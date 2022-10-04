<template>
  <div ref="drawerContent" class="drawer-content">
    <CoreHeader />
    <main
      class="container px-4 prose prose-p:mt-0 prose-img:mr-1 prose-img:my-0 prose-a:no-underline prose-h2:border-b prose-h2:pb-2 prose-a:text-info"
    >
      <ContentDoc path="/introduce/about" />
    </main>
    <CoreFooter />
  </div>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
const drawerContent = ref(null);

watch(drawerContent, (e) => !isMobile() && new SimpleBar(e));
</script>
