<template>
  <router-link :to="`/provider-details/${provider.id}/${provider.slug}/`" class="providers__item">
    <h4>{{ provider.name }}</h4>
    <div class="cf">
      <p>{{ provider.overview }}</p>
      <img
          v-if="provider.logo_data"
          :src="provider.logo_data.url"
      >
    </div>
  </router-link>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>