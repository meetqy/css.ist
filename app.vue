<template>
  <div>
    <ul>
      <li v-for="item in routes" :key="item.path">
        <NuxtLink :to="item.path">{{ item.name }} - {{ item.path }}</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>

<script setup>
const { routes } = useRouter().options;
</script>
