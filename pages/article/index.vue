<template>
  <div id="articles" class="single">

    <NF v-if="page === false" />

    <el-row :gutter="30" v-else-if="page">

      <el-col :span="6">
        <h3>Search articles</h3>
        <form @submit.prevent="key()">
          <el-select
              v-model="search"
              autocomplete="on"
              filterable
              clearable
              allow-create
              default-first-option
              remote
              reserve-keyword
              loading-text="Loading..."
              no-data-text="No data"
              no-match-text="No matching data"
              placeholder="Enter some text"
              :remote-method="remoteMethod"
              :loading="loading">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <input type="submit" value="Search" @click="key()">
        </form>
      </el-col>


      <el-col :span="13">

        <h1>{{ page.title }}</h1>

        <img v-if="page.image_data" :src="page.image_data.url" />

        <div class="margin" v-html="page.description"></div>

        <br>
        <div class="posted">
          <div v-if="page.author">By {{ page.author }} <span v-if="page.provider_data">• <router-link :to="`/provider-details/${page.provider_data.id}/${page.provider_data.slug}`">{{ page.provider_data.name }}</router-link></span></div>
          <div v-if="page.postFrom">Published: {{ page.postFrom }}</div>
        </div>

      </el-col>


      <el-col :span="5">

      </el-col>

    </el-row>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
