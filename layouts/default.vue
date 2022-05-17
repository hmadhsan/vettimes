<template>
  <div id="app">
   

    <main>
      <transition name="fade" mode="out-in">
      <Nuxt />
      </transition>
    </main>

<Home />

<Footer /> 

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "./style";</style>
