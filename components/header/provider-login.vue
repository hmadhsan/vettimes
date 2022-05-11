<template>
  <div class="row">
    <div class="desktop-hide">
      <router-link :to="'/courseproviders/company-management'" class="sign-in top__item icon-before" data-icon="✱" v-if="$store.state.auth.role === 2">
        <span title="Provider">{{ $parent.provider.name }}</span>
      </router-link>
      <div class="sign-in top__item provider-user" v-else>
        <span title="Provider">{{ $parent.provider.name }}</span>
      </div>
      <div class="sign-in top__item"><i>{{ truncate($store.state.auth.email, 19) }}</i></div>
      <router-link class="sign-in top__item " to="/courseproviders/courses/">Your Courses</router-link>
      <router-link class="sign-in top__item" to="/courseproviders/your-account/">Your Account</router-link>
      <a href="#" class="create-acc top__item" @click.stop.prevent="$parent.logOut">Sign out</a>
      <router-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="create-acc top__item" data-icon="▶">Are you a CPD provider?</router-link>
      <router-link v-else to="/" class="create-acc top__item">Course Seekers</router-link>
    </div>

    <div class="provider-menu">
      <img class="mini-logo guest mobile-hide" src="">

      <router-link :to="'/courseproviders/company-management'" class="sign-in top__item icon-before provider-admin mobile-hide" data-icon="✱" v-if="$store.state.auth.role === 2">
        <span title="Provider">{{ $parent.provider.name }}</span>
      </router-link>
      <div class="sign-in top__item provider-user mobile-hide" v-else>
        <span title="Provider">{{ $parent.provider.name }}</span>
      </div>
      <div class="create-acc top__item mobile-hide">
        <el-dropdown trigger="click">
          <a href="#" title="User Menu" data-icon="☺" class="icon-before el-dropdown-link">{{ truncate($store.state.auth.email, 19) }} <i class="el-icon-arrow-down el-icon--right"></i></a>
          <el-dropdown-menu slot="dropdown" class="user-dropdown user-dropdown_provider">
            <el-dropdown-item>
              <router-link
                  to="/courseproviders/courses/"
              >
                Your Courses
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link
                  to="/courseproviders/your-account/"
              >
                Your Account
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item><a href="#" @click.stop.prevent="$parent.logOut">Sign Out</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <router-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course button button_brand icon-after icon-white" data-icon="▶">Are you a CPD provider?</router-link>
      <router-link v-else to="/" class="course button button_brand">Course Seekers</router-link>
    </div>
  </div>
</template>

<script>
  import store from "../../config/store"

  export default {
    store,
    data() {
      return {
        credits: {}
      }
    }
  }
</script>
