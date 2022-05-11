<template>
  <div class="row">
      <img class="mini-logo guest mobile-hide" src="">
    <a :href="loginTo+`?redirectTo=`+redirectTo" class="sign-in top__item">Sign in</a>
    <a :href="registerTo+`?redirectTo=${redirectTo}`" class="create-acc top__item">Create account</a>
    <router-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course icon-after icon-white" data-icon="▶">Are you a CPD provider?</router-link>
    <router-link v-else to="/" class="course button button_brand">Course Seekers</router-link>
  </div>
</template>


<script>
  import store from "../../config/store"

  export default {
    store,
    data() {
      return {
        loginTo: 'https://my.vettimes.co.uk/login',
        registerTo: 'https://my.vettimes.co.uk/register',
        // redirectTo: window.location.href
      }
    },
  }
</script>
