<template>
  <main>
    <ContentList path="/introduce" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <img :src="article.light" />
      </div>
    </ContentList>
  </main>
</template>
