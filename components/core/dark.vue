<template>
  <button class="btn btn-square btn-ghost" @click="toggleDark()">
    <label class="swap swap-rotate" :class="{ 'swap-active': isDark }">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" disabled />
      <!-- sun icon -->
      <span class="material-symbols-outlined swap-off"> light_mode </span>
      <!-- moon icon -->
      <span class="material-symbols-outlined swap-on"> dark_mode </span>
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
