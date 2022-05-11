<template>
  <div id="privacy-dashboard">
    <div class="content">
      <div class="row">
        <div class="site-title-wrapper">
          <h1 class="site-title">Your marketing preferences</h1>
        </div>
        <div class="content__inner">
          <h3>Unsubscribe</h3>
          <div class="d-block" :gutter="20">
            <p>Please unsubscribe me from all email communications</p>
            <p>Note: This will also delete your course alerts</p>
            <div class="cf">
              <button @click="unsubscribe" class="float-r button button_brand button_compact">Unsubscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
