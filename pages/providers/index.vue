<template>

  <div id="providers">

    <div class="content">
      <div class="row">
        <h1 class="site-title">Providers</h1>
        <div class="inner cf">
          <div class="inner__sidebar">
            <div class="search">
              <h3>Search providers</h3>
              <form @submit="searchProvider">
                <el-select
                    v-model="value"
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
                    placeholder="Type a provider name"
                    :remote-method="remoteMethod"
                    :loading="loading">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <input type="submit" value="Search">
              </form>
            </div>
          </div>
          <div class="inner__content">
            <div v-if="loadingProviders">
              <Loader />
            </div>
            <div class="providers__items" v-else-if="!noData">
              <div class="providers__item-container" v-for="provider in providers.array" :key="provider.id">
                <Provider :provider="provider"></Provider>
              </div>
              <div class="paginator pagination cf" v-if="providers.total/20 > 1">
                <el-pagination
                  class="pagination__items"
                  layout="prev, pager, next"
                  :total="providers.total"
                  :current-page="page"
                  @current-change="goToPage"
                  :page-size="20">
                </el-pagination>
              </div>
            </div>
            <div v-else>
                <p>No results</p>
            </div>

<!--            <div class="pagination">-->
<!--              <a rel="alternate" type="application/rss+xml" href="#" class="icon-before" data-icon="☲">Subscribe</a>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
