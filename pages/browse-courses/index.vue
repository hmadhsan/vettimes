<template>

  <div id="browse-courses">

    <div class="content">
      <div class="search">
        <div class="row">
          <RemoteSearch
              v-if="listLoad"
              :keywords="keywords"
              :catList="$store.state.searchList"
              :categoriesObj="$store.state.categories"
              :catsSlugsName="$store.state.categoriesSlugsName"
              pagePosition="home"
          ></RemoteSearch>
        </div>
      </div>
      <div class="row">
        <h1 class="site-title">Find a course</h1>
        <Loader v-if="!listLoad"></Loader>
        <div v-else class="inner cf">
          <div class="block"
            v-for="(cats, key) in $store.state.categories" :key="cats.id"
          >
            <h3>Browse by {{ keys[key] }}</h3>
            <ul>
              <li v-for="(cat, index) in filterEmptyCats(cats, key)" :key="cat.id">
                <nuxt-link
                    :key="`${cat.slug}-link-${index}`"
                    :to="`/courses/${cat.slug}/`"
                    :data-cat="cat.name"
                    :data-key="key"
                >
                  {{cat.name}}<span> {{ categoriesNumbers[cat.name] }}</span>
                </nuxt-link>
              </li>
            </ul>
            <div class="select-cat">
              <el-select v-model="category" :placeholder="`select ${keys[key]}`" :change="goToLink">
                <el-option
                    v-for="(cat, index) in filterEmptyCats(cats, key)" :key="cat.id"
                    :label="`${cat.name} ${categoriesNumbers[cat.name]}`"
                    :data-cat="cat.name"
                    :data-key="key"
                    :value="`/courses/${cat.slug}/`">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
