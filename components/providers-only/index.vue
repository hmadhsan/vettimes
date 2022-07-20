<template>
    <div class="row" id="warning-block" v-if="show">
      <template v-if="!isExpiry">
        <p><span class="warning-text"><strong>This area is restricted to CPD course providers only.</strong></span></p>
        <p>To gain access to this area of the site please <nuxt-link :to="`/courseproviders/info/contact-us`">contact us</nuxt-link>. If you already have obtained the appropriate permissions, please log in.</p>
      </template>
      <div class="message-wrapper" v-else>
        <div class="message message_error icon-before" data-icon="!" role="alert">
          <span class="warning-text"><strong>Sorry, you do not have the correct permissions to access this area of the site.</strong></span>
          <p>To register for official CPD provider status, please <nuxt-link :to="`/courseproviders/info/contact-us`">contact us</nuxt-link>.</p>
        </div>
      </div>
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>