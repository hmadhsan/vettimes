<template>

  <div id="courses">

    <div class="content">
      <div class="row">
        <RemoteSearch
          @setKeywords="setKeywords"
          :keywords="keywords"
          :catList="$store.state.mystore.searchList"
          :categoriesObj="$store.state.mystore.categories"
          :catsSlugsName="$store.state.mystore.categoriesSlugsName"
        ></RemoteSearch>


        <!-- add ons -->
        <div v-if="this.sponsorship" v-html="this.sponsorshipHtml"></div>
        <h1 v-if="courses.seo.h1_title" class="site-title">{{ courses.seo.h1_title }}</h1>
        <h1 v-else>Veterinary courses from Vet Times CPD</h1>
        <div class="inner cf">
          <div class="inner__sidebar">
            <div class="sections">
              <h3 class="icon-before head-filter-mobile" data-icon="▶"><button @click="showFilterBar" class="el-button--text">Filter your results</button></h3>
              <h3 class="head-filter-desktop">Filter your results</h3>
              <div id="filterBar">
                <div v-for="(cats, key) in $store.state.mystore.categories" :key="cats.id">
                  <h4 class="filter-title" v-if="courses.total > 0 && filterEmptyCats(cats, key).length > 0">{{ categoriesKeys[key] }}</h4>
                  <ul class="head-filter-desktop">
                    <li v-for="(cat, index) in filterEmptyCats(cats, key)" :key="cat.id">
                      <div class="link-wrapper" v-if="specialitySearchNow(key, cat.name)">
                        <a
                            :key="`${cat.slug.name}-link-${index}`"
                            href="#"
                            @click="handleNewSearchItem"
                            :data-cat="cat.name"
                            :data-key="key"
                            :class="{ isSearchNow: keywords.indexOf(cat.name) >= 0 }"
                        >
                          {{cat.name}}<span v-if="!!categoriesNumbers[cat.name] && keywords.indexOf(cat.name) === -1" > {{ categoriesNumbers[cat.name] }}</span>
                        </a>
                        <span
                            :key="`${cat.slug}-btn-${index}`"
                            v-show="keywords.indexOf(cat.name) >= 0 && !searchCoursesLoad"
                            class="clear-filter"
                            @click="handleDeleteSearchItem"
                        >
                        <i :key="`${cat.slug}-icon-${index}`" data-icon="x" class="facet-filters__remove icon-after" title="Remove filter"></i>
                      </span>
                        <Rolling
                            :key="`${cat.slug}-search-${index}`"
                            v-show="searchCoursesLoad === cat.name"
                        ></Rolling>
                      </div>
                      <el-button
                          v-if="index === 9 && searchWords[key].length === 0"
                          class="more-cats"
                          type="text"
                          @click="dialogTableVisible = true, categoryDialog = key"
                      >
                        More...
                      </el-button>
                    </li>
                  </ul>
                  <div class="select-cat head-filter-mobile" v-if="courses.total > 0 && filterEmptyCats(cats, key).length > 0">
                    <el-select v-model="modelCategories[key]" :placeholder="`select ${categoriesKeys[key]}`" @change="addNewKeyword(modelCategories[key])">
                      <el-option
                          v-for="(cat, index) in filterAllEmptyCats(cats, key)" :key="cat.id"
                          :label="`${cat.name} (${categoriesNumbers[cat.name]})`"
                          :value="cat.name">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <el-dialog
                class="category-dialog"
                :visible.sync="dialogTableVisible"
                :before-close="categoryDialogClose"
              >
                <div v-if="!categoryDialog">
                  <Loader />
                </div>
                <div v-else class="category-dialog__inner">
                  <h3 class="category-dialog__title">Filter by <span>{{ categoryDialog }}</span></h3>
                  <div class="category-dialog__filters">
                    <ul class="category-dialog__list">
                      <li
                        class="category-dialog__list-item"
                        v-for="cat in filterPopupEmptyCats($store.state.mystore.categories[categoryDialog])"
                        :key="cat.id"
                      >
                        <nuxt-link
                          class="category-dialog__list-link"
                          @click.native="handleNewSearchItem"
                          :data-cat="cat.name"
                          :to="`/courses/${cat.slug}/`"
                        >{{ cat.name }} <span>{{ categoriesNumbers[cat.name] }}</span></nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="inner__content">
            <div class="courses__tabs">
              <div class="email" v-if="!$attrs.providers && courses.total > 0">
                <transition name="fade" mode="out-in">
                  <el-popover
                      placement="bottom"
                      width="550"
                      popper-class="email-content"
                      trigger="click"
                      transition="cubic-bezier(0.3,0,0,1.5)"
                      v-model="popoverVisible"
                  >
                    <EmailMeCourses v-model="keywords"></EmailMeCourses>
                    <el-button
                        slot="reference"
                        data-icon="✉"
                        class="icon-before">Email me courses like these</el-button>
                  </el-popover>
                </transition>
              </div>
              <nuxt-link @click.native="tabListener" :to="'/courses'" class="tab" :class="[{activeTab : false}]">Courses <span>({{courses.total}})</span></nuxt-link>
              <nuxt-link @click.native="tabListener" :to="'/course-providers'" class="tab" :class="[{activeTab : true}]">Course Providers <span>({{ providers.total }})</span></nuxt-link>
            </div>
            <h2 class="popover-form__title" style="padding: 0 10px 0; margin-top:20px;">Found {{ courses.total }}
            <span class="text-capitalize">{{ findCourses.concat(searchWords.speciality, searchWords.course_type).join(', ') }}</span>
             veterinary courses
            <span v-show="searchWords.location.length > 0">in <span class="text-capitalize">{{ searchWords.location.join(', ') }}</span></span></h2>
            <p style="padding: 0 10px 0; margin-top:20px;">{{ courses.seo.intro }}</p>
            <div class="courses__inner" v-if="false">
              <div class="sort" v-if="courses.total > 1">
                <span>Sort by:</span>
                <el-select v-model="sortType" @change="sortCourses" class="courses-sort-type">
                  <el-option
                      label="Best match"
                      value="">
                  </el-option>
                  <el-option
                      label="Newest"
                      value="Date">
                  </el-option>
                  <el-option
                      label="Start date"
                      value="Start_Date">
                  </el-option>
                </el-select>

              </div>
              <div class="courses__block" v-if="!loader">
                <Loader />
              </div>
              <div class="courses__block" v-else-if="courses.total > 0 && courses">
                <template v-for="(course, index) in courses.array">
                  <h2 class="sponsor-head-block" v-if="course.sponsoredTop && index === 0 && findSponsorship(courses.array[index].sponsorship) && keywords.length > 0">Top Courses</h2>
                  <hr class="cm-hr" v-if="index > 0 && !course.sponsoredTop && findSponsorship(courses.array[index-1].sponsorship) && keywords.length > 0">
                    <CoursePreview
                      :key="course.id"
                      :course="course"
                      :porder="keywords"
                      :logo="course.provider.logo_data || ''"
                    ></CoursePreview>
                </template>
              </div>
              <div class="courses__block" v-else>
               <div class="courses__no-data">
                 <h3>To improve results we recommend you</h3>
                 <ul class="dots">
                   <li>try some different keywords</li>
                   <li>check your spelling</li>
                   <li>widen your location</li>
                   <li>add more subject areas</li>
                 </ul>
                 <hr class="cm-hr">
                 <h3>Set up an alert for this search</h3>
                 <p>Set up an email alert and we will contact you when courses become available.</p>
                 <div class="email ">
                   <transition name="fade" mode="out-in">
                     <el-popover
                         placement="bottom"
                         width="550"
                         popper-class="email-content"
                         trigger="click"
                         transition="cubic-bezier(0.3,0,0,1.5)"
                         v-model="popoverVisible"
                     >
                       <EmailMeCourses v-model="keywords"></EmailMeCourses>
                       <el-button
                           slot="reference"
                           data-icon="✉"
                           class="icon-before">Email me courses like these</el-button>
                     </el-popover>
                   </transition>
                 </div>
               </div>
              </div>
              <div class="pagination">
                <a rel="alternate" type="application/rss+xml" :href="$store.state.mystore.base+`rss/courses?keyword=${keywords.join('|')}`" class="icon-before pagination__subscriber" data-icon="☲">Subscribe</a>
                <el-pagination
                    class="pagination__items"
                    v-if="courses.total > 20"
                    layout="prev, pager, next"
                    :total="courses.total"
                    :current-page="page"
                    @current-change="goToPage"
                    :pager-count = "5"
                    :page-size="20">
                </el-pagination>
              </div>
            </div>
            <div class="course__inner courses__inner_providers" v-if="true">
              <div v-if="!loader">
                <Loader />
              </div>
              <div class="providers__items" v-else-if="providers.total > 0">
                <div class="providers__item-container" v-for="provider in providers.array" :key="provider.id">
                  <Provider :provider="provider"></Provider>
                </div>
                <div class="pagination" v-if="providers.total > 20">
                  <el-pagination
                      class="pagination__items"
                      layout="prev, pager, next"
                      :total="providers.total"
                      :current-page="providersPage"
                      @current-change="goToProvidersPage"
                      :pager-count = "5"
                      :page-size="20">
                  </el-pagination>
                </div>
              </div>
              <div v-else>
                <p>No results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
