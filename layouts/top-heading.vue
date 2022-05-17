<template>
  <div class="top-heading__inner">
    <div class="top-heading__image" v-if="data.image_data">
      <img :src="data.image_data.url" :alt="data.position">
    </div>
    <h3 class="top-heading__title" v-if="data.heading">{{ data.heading }}</h3>
    <div class="top-heading__content" v-if="data.body" v-html="data.body"></div>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>