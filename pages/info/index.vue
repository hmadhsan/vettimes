<template>
  <div id="info">

    <NF v-if="page === false" />

    <div v-else-if="page !== null" class="row">
      <h1 class="title">{{ page.title }}</h1>
      <div class="content" v-html="page.content" />

      <template v-if="extra">
        <div class="typeform-widget" data-url="https://vettimes2.typeform.com/to/ONnQs0" style="width: 100%; height: 500px;"></div>
        <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;"> powered by <a href="https://admin.typeform.com/signup?utm_campaign=ONnQs0&utm_source=typeform.com-14414595-ProPlus3&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN" style="color: #999" target="_blank">Typeform</a></div>
      </template>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
