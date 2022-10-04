<template>
  <div
    ref="drawerContent"
    class="drawer-content flex flex-col items-center justify-center"
  >
    <CoreHeader />

    <main
      class="prose p-12 m-auto max-w-screen-lg prose-p:mt-0 prose-img:mr-1 prose-img:my-0 prose-a:no-underline prose-h2:border-b prose-h2:pb-2 prose-a:text-info"
    >
      <ContentDoc path="/introduce/about" />
    </main>

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
