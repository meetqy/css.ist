<template>
  <div ref="drawerContent" class="drawer-content">
    <Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9977752727673793"
        crossorigin="anonymous"
      ></Script>
    </Head>
    <Introduce />
    <CoreFooter />
  </div>
</template>

<script setup>
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
const drawerContent = ref(null);

watch(drawerContent, (e) => !isMobile() && new SimpleBar(e));
</script>
