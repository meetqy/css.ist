<template>
  <div class="space-x-2 btn btn-ghost">
    <button
      class="btn-xs btn-circle btn-sm text-xs font-normal"
      @click="prev()"
    >
      <span class="material-symbols-outlined !text-sm"> arrow_back_ios </span>
    </button>
    <button class="btn btn-xs font-normal normal-case">
      {{ mode }}
    </button>
    <button class="btn-xs btn-circle btn-sm" @click="next()">
      <span class="material-symbols-outlined !text-sm">
        arrow_forward_ios
      </span>
    </button>
  </div>
</template>

<script setup>
import { useColorMode, useCycleList } from "@vueuse/core";
const mode = useColorMode({
  attribute: "data-theme",
  emitAuto: true,
});
const { next, prev } = useCycleList(
  [
    "auto",
    "dark",
    "light",
    "synthwave",
    "cupcake",
    "halloween",
    "wireframe",
    "aqua",
    "luxury",
    "coffee",
  ],
  {
    initialValue: mode,
  }
);
</script>
