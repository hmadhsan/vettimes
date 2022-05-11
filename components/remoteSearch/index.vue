<template>
  <form class="search-block cf" id="search-block" @submit="addValueToParent">
    <el-select
        v-model="value"
        autocomplete="on"
        multiple
        filterable
        allow-create
        default-first-option
        remote
        loading-text="Loading..."
        no-data-text="No data"
        no-match-text="No matching data"
        placeholder="Start typing a course or subject"
        :remote-method="remoteMethod"
        :loading="loading">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <button type="submit">
      <span class="mobile-hide">Search</span>
      <span class="desktop-hide"><i class="icon icon-before" data-icon="⌕" aria-hidden="true"></i></span>
    </button>
  </form>

</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>