<template>
  <div id="sidebar">

    <ul class="list-nav">
      <!-- :class="{ 'list-nav__item_active': item === $parent.tab }" -->
      <li 
        class="list-nav__item"
        v-for="(item,index) in filterParentTabs()"
        :key="item"
        :class="getClass(item)"
      >
        <nuxt-link
          class="list-nav__link"
          :to="`/courseproviders/courses/${$parent.info.id}/${index}`"
          @click.native="change(item)"
        >
          {{ item }}
        </nuxt-link>
      </li>
    </ul>

  </div>
</template>

<style lang="scss">@import "./style";</style>
<script src="./script.js"></script>
