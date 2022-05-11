<template>
  <div id="unsubscribe-alert">
    <div class="content">
      <div class="row">

        <Loader v-if="isLoading" />
        <MessageInfo
            :updateSuccess="dataUpdateSuccess"
            :updateError="dataUpdateError"
            :http="true"
        ></MessageInfo>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
