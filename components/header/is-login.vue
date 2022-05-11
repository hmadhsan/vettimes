<template>
  <div class="row">
    <div class="desktop-hide">
      <router-link to="/your-courses/" class="sign-in top__item">Your courses</router-link>
      <!--<a class="top__item" href="/cpd-plus/user/subscriptions">Your subscriptions</a>-->
      <router-link to="/your-account/" class="sign-in top__item">Your account</router-link>
      <a href="#" class="sign-in top__item" @click.stop.prevent="$parent.logOut">Sign out</a>
    </div>


    <div class="user-menu">
      <img class="mini-logo guest mobile-hide" src="">

      <div class="sign-in top__item  mobile-hide">
        <el-dropdown trigger="click">
          <a href="#" title="User Menu" data-icon="☺" class="icon-before el-dropdown-link">{{ truncate($store.state.auth.email, 19) }} <i class="el-icon-arrow-down el-icon--right"></i></a>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <router-link
                  to="/your-courses/"
              >
                Your courses
              </router-link>
            </el-dropdown-item>
            <!--<el-dropdown-item>
              <a class="top__item" href="/cpd-plus/user/subscriptions">Your subscriptions</a>
            </el-dropdown-item>-->
            <el-dropdown-item>
              <router-link
                  to="/your-account/"
              >
                Your account
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="create-acc top__item  mobile-hide">
        <router-link to="/your-courses">
          <span aria-hidden="true" class="icon-after" data-icon="★" title="Your shortlist">{{ $store.state.stars.length }}</span>
          <span class="hidden">Your shortlist (<span>{{ $store.state.stars.length }}</span>)</span>
        </router-link>

      </div>

      <div class="course">
        <button class="sign-out" @click="$parent.logOut">Sign out</button>
        <router-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course button button_brand icon-after icon-white" data-icon="▶">Are you a CPD provider?</router-link>
        <router-link v-else to="/" class="course button button_brand">Course Seekers</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "../../config/store"

  export default {
    store,
    data() {
      return {

      }
    },
  }
</script>
