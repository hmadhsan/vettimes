<template>
    <header
        class="header"
        id="header"
    >
    
        <div class="mobile-top">
            <a
                href="#primary-nav"
                title="Main menu"
                class="menu-toggle"
                @click="mainMenuHandler"
                :class="{ 'menu-toggle_active': menuOpen }"
            >
                <i class="burger" aria-hidden="true"></i>
            </a>
              <img class="mini-logo guest mobile-show" src="../../img/vet-times-cpd_logo.svg">
            <a
                href="#secondary-nav"
                title="User menu"
                class="user-btn"
                @click="userMenuHandler"
                :class="{ 'user-btn_active': userMenuOpen }"
            >
                <i class="icon-after" data-icon="☺" aria-hidden="true"></i>
            </a>
        </div>
        <div class="top" id="top-bar" :class="{ 'top_active': userMenuOpen, 'user-login': $store.state.auth && $store.state.auth.userStatus !== 'expired' }">
            <IsLogin v-if="$store.state.mystore.auth && [1,4].indexOf($store.state.mystore.auth.role) >= 0 && $store.state.mystore.auth.userStatus !== 'expired'" />
            <ProviderLogin v-else-if="$store.state.mystore.auth && [2,3].indexOf($store.state.mystore.auth.role) >= 0 && $store.state.mystore.auth.userStatus !== 'expired'"/>
            <IsLogout v-else/>
        </div>

        <div class="row cf" v-if="$store.state.mystore.auth && [2,3].indexOf($store.state.mystore.auth.role) >= 0 && $store.state.mystore.auth.userStatus !== 'expired'">
          <div class="credit-balance float-r" v-if="$store.state.mystore.credits.length > 0">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Credit balance <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown" class="provider-credits-menu">
                <el-dropdown-item v-for="(credit, index) in $store.state.mystore.credits" :key="index">{{ credit }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>


        <!-- <div class="logo" :class="{ 'logo_courseproviders': $route.path.indexOf('courseproviders') >= 0 }">
            <div class="row cf">
                <nuxt-link v-if="$route.path.indexOf('courseproviders') >= 0" :to="`/courseproviders`">
                  <img src="../../img/logo-providers.png">
                </nuxt-link>
                <nuxt-link v-else :to="`/`">
                  <img  src="../../img/header-logo.png">
                </nuxt-link>

            </div>
        </div> -->
        <div
            class="menu"
            id="primary-nav"
            :class="{ menu_active: menuOpen }"
        >
            <div class="row cf">
                <ul id="header-menu">
                  <li class="header-menu__item" v-for="item in filteredMenuList" :key="item.id">
                    <a  v-scroll-to="item.title==='Packages'? '#packages': item.title==='Why choose us?'? '#why-choose-us' : ''"  v-if="(item.title === 'Why choose us?' || item.title === 'Packages') && $route.path.indexOf('courseproviders')>= 0"  @click="scrollToElement(item.scrollTo)">{{item.title}}</a>
                    
                    <nuxt-link v-else-if="item.url.indexOf('http') !== 0" :to="item.url" :exact="item.exact">
                      <span>{{ item.title }}</span>
                    </nuxt-link>
                    
                    <a v-else :href="item.url">{{item.title}}</a>

                  </li>
                </ul>
                <ul id="header-second-menu" v-if="this.$route.path.indexOf('courseproviders') === -1">
                    <li class="header-menu__item" v-for="item in secondMenuItems" :key="item.id">
                      <a :href="item.url"><span>{{ item.title }}</span></a>
                    </li>
                    <div class="desktop-hide header-menu__item">
                        <nuxt-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course">Are you a CPD provider?</nuxt-link>
                        <nuxt-link v-else to="/" class="course">Course Seekers</nuxt-link>
                    </div>
                </ul>
                <ul id="header-second-menu" v-if="this.$route.path.indexOf('courseproviders') >= 0 ">
                    <li class="header-menu__item" v-for="item in providerMenuItems" :key="item.id">
                    
                      <a class="upload-course-btn" :href="item.url"><span>{{ item.title }}</span></a>
                    </li>
                    <div class="desktop-hide header-menu__item">
                        <nuxt-link v-if="$route.path.indexOf('courseproviders') === -1" to="/courseproviders" class="course">Are you a CPD provider?</nuxt-link>
                        <nuxt-link v-else to="/" class="course">Course Seekers</nuxt-link>
                    </div>
                </ul>

            </div>
        </div>
    </header>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "./style";</style>
