<template>
  <div ref="drawerContent" class="drawer-content">
    <CoreHeader />

    <main class="lg:mb-24 my-12">
      <ContentDoc
        path="/introduce/about"
        class="prose-about prose lg:shadow-md lg:border-t rounded-box border-base-200 max-w-screen-lg lg:p-8 p-4 pt-0 m-auto"
      />
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

<style lang="postcss">
.prose-about.prose {
  a {
    @apply text-success no-underline inline-block hover:underline;

    img {
      @apply m-0;
    }
  }

  h1,
  h2 {
    @apply border-b border-base-content/20 lg:pb-4 pb-2;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > a {
      @apply hover:no-underline text-base-content;
    }
  }

  li a {
    @apply m-0;
  }

  pre {
    &::before {
      content: ">";
      @apply text-success;
    }
  }
}
</style>
