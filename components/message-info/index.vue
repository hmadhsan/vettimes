<template>
    <div id="messages-info">
      <div class="message-wrapper" v-if="updateSuccess">
        <div class="message message_success icon-before" data-icon="✔" v-html="updateSuccess"></div>
      </div>

      <div class="message-wrapper" v-if="updateError && !!http">
        <div
          class="message message_error icon-before"
          data-icon="x"
        >{{ updateError }}</div>
      </div>
      <div class="message-wrapper" v-else-if="updateError">
        <div
            class="message message_error icon-before"
            data-icon="x"
            v-for="(key, index) in updateError"
            :key="key.id"
        >{{ index }}: {{ key[0] }}</div>
      </div>

    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>