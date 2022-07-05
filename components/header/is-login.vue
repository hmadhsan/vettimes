<template>
  <div class="row">
    <div class="desktop-hide">
      <nuxt-link to="/your-courses/" class="sign-in top__item">Your courses</nuxt-link>
      <!--<a class="top__item" href="/cpd-plus/user/subscriptions">Your subscriptions</a>-->
      <nuxt-link to="/your-account/" class="sign-in top__item">Your account</nuxt-link>
      <a href="#" class="sign-in top__item" @click.stop.prevent="$parent.logOut">Sign out</a>
    </div>


    <div class="user-menu">
      <img class="mini-logo guest mobile-hide" src="../../img/vet-times-cpd_logo.svg">

      <div class="sign-in top__item  mobile-hide">
        <el-dropdown trigger="click">
          <a href="#" title="User Menu" data-icon="☺" class="icon-before el-dropdown-link">{{$truncate($store.state.mystore.auth.email,19)}}<i class="el-icon-arrow-down el-icon--right"></i></a>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <nuxt-link
                  to="/your-courses/"
              >
                Your courses
              </nuxt-link>
            </el-dropdown-item>
            <!--<el-dropdown-item>
              <a class="top__item" href="/cpd-plus/user/subscriptions">Your subscriptions</a>
            </el-dropdown-item>-->
            <el-dropdown-item>
              <nuxt-link
                  to="/your-account/"
              >
                Your account
              </nuxt-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="create-acc top__item  mobile-hide">
        <nuxt-link to="/your-courses">
          <span aria-hidden="true" class="icon-after" data-icon="★" title="Your shortlist">{{ this.$store.state.mystore.stars.length }}</span>
          <span class="hidden">Your shortlist (<span>{{ this.$store.state.mystore.stars.length }}</span>)</span>
        </nuxt-link>

      </div>

      <div class="course">
        <button class="sign-out" @click="$parent.logOut">Sign out</button>
        <nuxt-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course button button_brand icon-after icon-white" data-icon="▶">Are you a CPD provider?</nuxt-link>
        <nuxt-link v-else to="/" class="course button button_brand">Course Seekers</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  

  export default {

    data() {
      return {

      }
    },
    methods:{
    // truncate(text, max) {
    //     return (typeof text === 'string' && text.length > max ? text.substring(0,max)+'...' : text);
    // }
    }
  }
</script>
