<template>
  <div id="delete-account">
    <div class="content">
      <div class="row">
        <div class="site-title-wrapper">
          <h1 class="site-title">Delete your account</h1>
        </div>
        <div v-if="!sendEmail">
          <p><strong>Deleting your account is permanent and irreversible</strong></p>
          <p>All your information will be removed from vet times CPD and you will no longer receive emails from us.</p>
          <p>Click the delete button and we'll send you an email containing details of how to delete your account.</p>
          <el-form>
            <div class="cf">
              <button type="button" class="button button_brand button_compact float-r" @click="deleteAccount">Delete</button>
            </div>
          </el-form>
        </div>
        <div v-else>
          <p>We have sent you an email that will tell you how to delete your vet times CPD account.</p>
          <p>You may need to check your junk-mail folder. If you still cannot find the email, please <router-link :to="'/info/contact-us/'">contact us</router-link>.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
