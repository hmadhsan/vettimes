<template>
    <footer class="footer" id="footer">
        <div class="menu">
            <div class="row">
                <ul class="footer-menu" id="footer-menu cf">
                  <li v-for="item in footerMenu()" :key="item.id">
                      <nuxt-link v-if="item.url.indexOf('http') !== 0" :to="item.url">
                          <span>{{ item.title }}</span>
                      </nuxt-link>
                      <a v-else :href="item.url" target="_blank">{{item.title}}</a>
                  </li>
                </ul>

                <SocialButtons />

                <div class="back-to-top">
                    <button
                        class="block-level"
                        @click="scrollToTopPage"
                    >
                        <span class="hidden">Back to top</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="row">
                <div class="image">
                    <img src="../../img/IPA-innovation.png">
                </div>
                <ul class="cf" v-if="$route.path.indexOf('courseproviders') === -1">
                    <li v-for="item in footerBotMenuItems" :key="item.id">
                        <a :href="item.url"><span>{{ item.title }}</span></a>
                    </li>
                </ul>
                <p class="copyright">© 2019 - 2021 Veterinary Business Development</p>
            </div>
        </div>
    </footer>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "./style";</style>