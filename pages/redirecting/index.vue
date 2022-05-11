<template>

  <div id="redirecting" class="info-page">

    <div class="content">
      <div class="row">
        <div>
          <h1 class="site-title">Redirecting…</h1>
          <div class="info-page__content">
            <p>Enquire about {{ title }}{{ provider }}</p>

            <p>You will be automatically redirected from this page.</p>

            <p>If this page does not refresh after 3 seconds please follow this link to <a :href="url" target="_blank">enquire about {{ title }}{{ provider }}</a>.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
