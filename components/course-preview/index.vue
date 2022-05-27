<template>
  <div class="course-item-container">
    <nuxt-link
       :to="`/course-details/${course.id}/${course.slug}/${generateQuery()}`"
       class="course-item"
       v-bind:class="[
        {
          'course-item_bronze' : course.product_id === 1,
          'course-item_silver' : course.product_id === 2,
          'course-item_gold'    : course.product_id === 8,
          'course-item_sponsorship' :  $parent.findSponsorship(course.sponsorship) && $parent.keywords.length > 0 && course.sponsoredTop
        }
       ]"
     >
        <h4 class="title">{{ course.title }} <span v-if="course.newest" class="new-course" title="This course was posted within the last 7 days">New</span></h4>
        <div class="cf">
          <div class="information">
            <p v-if="course.provider.name">Provided by {{ course.provider.name }}</p>
            <p v-if="course.overview">{{ course.overview }}</p>
          </div>
          <div class="image" v-if="logo" :style="{ backgroundImage: 'url(' + logo.url + ')' }">
          </div>
        </div>
        <ul class="metainfo cf">
            <li class="cf" v-if="getMetaInfo(course, 'speciality')">
              <div class="cf" v-if="getMetaInfo(course, 'speciality')">
                <strong >Speciality</strong>
                <span
                    :key="cat.id"
                    v-for="(cat,key) in getMetaInfo(course, 'speciality')"
                >
                  {{ cat }}<span v-if="key != Object.keys(getMetaInfo(course, 'speciality')).length-1">, </span>
                </span>
              </div>
            </li>
            <li class="cf" v-if="getMetaInfo(course, 'audience')">
              <div class="cf" v-if="getMetaInfo(course, 'audience')">
                <strong>Job Role/Target Audience</strong>
                <span
                    v-for="(item,key) in getMetaInfo(course, 'audience')"
                    :key="item.id"
                >
                  {{ item }}<span v-if="key != Object.keys(getMetaInfo(course, 'audience')).length-1">, </span>
                </span>
              </div>
            </li>
            <li class="cf" v-if="getMetaInfo(course, 'cpd_hours')">
              <div class="cf" v-if="getMetaInfo(course, 'cpd_hours')">
                <strong>CPD Hours</strong>{{ getMetaInfo(course, 'cpd_hours') }}
              </div>
            </li>
            <li class="cf" v-if="course.delivery_method">
                <strong>Location / delivery</strong>{{ course.delivery_method }}
            </li>
            <li class="cf" v-if="course.deliveryFrom && (course.tab_dates.length === 0)">
                <strong>Start date</strong>{{ course.deliveryFrom }}
            </li>
            <li class="cf" v-if="course.deliveryFrom && (course.tab_dates.length > 0)">
              <strong>Start date</strong>Multiple Dates Available
            </li>
            <li class="cf" v-if="course.duration">
                <strong>Duration</strong>{{ course.duration }}
            </li>
            <li class="cf" v-if="course.price">
                <strong>Price</strong>{{ course.price }}
            </li>
        </ul>
    </nuxt-link>
    <el-popover v-if="checkAuth()"
        placement="top"
        width="170"
        trigger="click">
      <div class="popover-content">
        <p>You need to <a :href="'https://my.vettimes.co.uk/login?redirectTo='+location">sign in as user</a> to save a course.</p>
      </div>
      <span class="save-course 1" slot="reference">
                      <i data-icon="☆" class="icon-after" title="Save course"></i>
                    </span>
    </el-popover>
    <span v-else class="save-course 2" @click="courseProcess(course.id, !isStar(course.id))">
      <i v-if="!isStar(course.id)" data-icon="☆" class="icon-after" title="Save course"></i>
      <i v-else data-icon="★" class="icon-after" title="Remove saved course"></i>
    </span>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
