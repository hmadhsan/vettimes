<template>
  <div id="app" v-if="$auth() !== null">

    <TopAd />

    <Header />

    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>

    <Footer />

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "./style";</style>
