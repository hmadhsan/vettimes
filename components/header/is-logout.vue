<template>
  <div class="row">
      <img class="mini-logo guest mobile-hide" src="../../img/vet-times-cpd_logo.svg">
    <a :href="loginTo+`?redirectTo=${cpdBaseUrl}`" class="sign-in top__item">Sign in</a>
    <a :href="registerTo+`?redirectTo=${redirectTo}`" class="create-acc top__item">Create account</a>
    <nuxt-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course icon-after icon-white" data-icon="▶">Are you a CPD provider?</nuxt-link>
    <nuxt-link v-else to="/" class="course button button_brand">Course Seekers</nuxt-link>
  </div>
</template>


<script>
  import store from "../../config/store"
  import { cpdBaseUrl } from "~/config/constants"

  export default {
    store,
    data() {
      return {
        loginTo: 'https://my.vettimes.co.uk/login',
        registerTo: 'https://my.vettimes.co.uk/register',
        redirectTo: process.browser ? window.location.href : ''
      }
    },
  }
</script>
