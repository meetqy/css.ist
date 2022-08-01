<template>
  <button class="btn btn-square btn-ghost">
    <label class="swap swap-rotate">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" :checked="isDark" @click="toggleDark()" />
      <!-- sun icon -->
      <span class="material-symbols-outlined swap-on"> light_mode </span>
      <!-- moon icon -->
      <span class="material-symbols-outlined swap-off"> dark_mode </span>
    </label>
  </button>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "data-theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>
