<template>
  <div id="app">
    
    <TopAd/>
    <Header />

    <main>
      <transition name="fade" mode="out-in">
      <Nuxt />
      </transition>
    </main>
    <Footer /> 


  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "./style";</style>
