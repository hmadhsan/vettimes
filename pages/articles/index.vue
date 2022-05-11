<template>

  <div id="articles">

    <h1>Our latest articles</h1>

    <el-row :gutter="30">

      <el-col :span="6" :xs="24">
        <h3>Search articles</h3>
        <form class="search-article" @submit.prevent="key()">
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
          <input type="submit" value="Search" @click="get()">
        </form>
      </el-col>

      <el-col :span="13" :xs="24">
        <Loader v-if="!loadArticles" />
        <template v-else-if="array.length > 0 && loadArticles">
          <div class="item" v-for="item in array" :key="item.id">
            <div class="img" :style="{ backgroundImage: img(item.image_data) }"></div>
            <div class="data">
              <router-link :to="`/article-details/${item.id}/${item.slug}`">{{ item.title }}</router-link>
              <div>{{ item.overview }}</div>
            </div>
            <div class="clr"></div>
          </div>

          <div class="pagination">
            <a :href="$store.state.base+`rss/articles?keyword=`+search" class="icon-before pagination__subscriber" data-icon="☲">Subscribe</a>
            <el-pagination
                class="pagination__items"
                v-if="total > 10"
                layout="prev, pager, next"
                :total="total"
                :current-page="page"
                @current-change="goToPage"
                :pager-count="5"
                :page-size="10">
            </el-pagination>
          </div>
        </template>
        <p v-else>No articles found</p>
      </el-col>

      <el-col :span="5">

      </el-col>

    </el-row>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
