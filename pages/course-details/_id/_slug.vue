<template>

  <div id="course">

    <div class="content">
      <div class="row">
        <RemoteSearch
            v-if="listLoad"
            :keywords="keywords"
            :catList="$store.state.searchList"
            :categoriesObj="$store.state.categories"
            :catsSlugsName="$store.state.categoriesSlugsName"
            pagePosition="home"
        ></RemoteSearch>
        <div class="inner cf" v-if="course">
          <CoursesList
            :provider_id="course.provider_id"
          ></CoursesList>
          <div v-if="load">
            <Loader />
          </div>
          <div class="inner__content" :key="$route.params.id" v-else-if="!load">
            <div class="message-wrapper" v-if="([2,3,4].indexOf(course.status) > -1) && course.preview">
              <p class="message message_warning icon-before" data-icon="!" role="alert">
                {{ course.preview }}
              </p>
            </div>
            <div class="cf">
              <div class="info">
                <h1 class="site-title">{{ course.title }}</h1>
                <p
                  v-if="course.provider"
                >Provided by
                  <nuxt-link
                    :to="`/provider-details/${course.provider.id}/${course.provider.slug}`"
                  >
                    {{ course.provider.name }}
                  </nuxt-link>
                </p>
              </div>
              <div class="logo" v-if="course.provider.logo_data">
                <img v-if="course.provider.logo_data.url" :src="course.provider.logo_data.url" :alt="course.provider.logo_data.name">
              </div>
            </div>
            <ul class="metainfo">
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.speciality && course.tab_category.speciality.length > 0">
                  <strong >Speciality</strong>
                    <nuxt-link
                      :key="cat.id"
                      v-for="(cat,key) in course.tab_category.speciality"
                      :to="`/courses/${cat.toLowerCase().replace(/\s/g, '-')}`"
                    >
                      {{ cat }}<span v-if="key != Object.keys(course.tab_category.speciality).length-1">, </span>
                    </nuxt-link>
                </div>
              </li>
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.location">
                  <strong>Location</strong>
                  <nuxt-link
                    :to="`/courses/${course.tab_category.location.toLowerCase().replace(/\s/g, '-')}`"
                  >
                    {{ course.tab_category.location }}
                  </nuxt-link>
                </div>
              </li>
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.course_type">
                  <strong>Course type</strong>
                  <nuxt-link
                      :to="`/courses/${course.tab_category.course_type.toLowerCase().replace(/\s/g, '-')}`"
                  >
                    {{ course.tab_category.course_type }}
                  </nuxt-link>
                </div>
              </li>
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.audience && course.tab_category.audience.length > 0">
                  <strong>Job Role/Target Audience</strong>
                  <nuxt-link
                      v-for="(item,key) in course.tab_category.audience"
                      :key="item.id"
                      :to="`/courses/${item.toLowerCase().replace(/\s/g, '-')}`"
                  >
                    {{ item }}<span v-if="key != Object.keys(course.tab_category.audience).length-1">, </span>
                  </nuxt-link>
                </div>
              </li>
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.skill_level && course.tab_category.skill_level.length > 0">
                  <strong>Skill level</strong>
                  <span
                      v-for="(item,key) in course.tab_category.skill_level"
                      :key="item.id"
                  >
                    {{ item }}<span v-if="key != Object.keys(course.tab_category.skill_level).length-1">, </span>
                  </span>
                </div>
              </li>
              <li v-if="course.tab_category">
                <div v-if="course.tab_category.cpd_hours">
                  <strong>CPD Hours</strong>{{ course.tab_category.cpd_hours }}
                </div>
              </li>
              <li v-if="course.duration">
                <strong>Duration</strong>{{ course.duration }}
              </li>
              <li v-if="course.course_ref">
                <strong>Ref</strong>{{ course.course_ref }}
              </li>
              <li v-if="course.price">
                <strong>Price</strong>{{ course.price }}
              </li>
            </ul>
            <div class="enquire">
              <a href="javascript:void(0);" v-scroll-to="'#enquireBlock'" >Enquire about this course</a>
            </div>
            <div class="additional-info" v-if="course.tab_additional">
              <dl class="additional-info__list">
                <div v-for="info in course.tab_additional" :key="info.id">
                  <dt class="additional-info__list-key">{{ info.title }}</dt>
                  <dd class="additional-info__list-value">{{ info.text }}</dd>
                </div>
              </dl>
            </div>
            <div class="description">
              <h2>About the course</h2>
              <div class="description__image" v-if="course.image_data">
                <img :src="course.image_data.url" :alt="course.title">
              </div>
              <div class="description__inner" v-html="course.description"></div>
              <div class="description__video" v-if="videoUrl">
                <div style="padding:55.88% 0 0 0;position:relative;">
                  <iframe :src="videoUrl" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
              </div>
            </div>
            <div class="book-now" id="enquireBlock">
              <h2>Enquire</h2>
              <table class="table-adaptive">
                <thead>
                <tr v-if="isEnquireAdditional || isBookNow">
                  <th v-if="isEnquireAdditional || isBookNow">Start date</th>
                  <th v-if="isEnquireAdditional || isBookNow">Location / delivery</th>
                  <th v-if="isEnquireAdditional || isBookNow"></th>
                </tr>
                </thead>
                <tbody>
                <!-- <tr v-if="isEnquire">
                  <td v-if="course.delivery_start">
                    {{ course.deliveryFrom }}
                  </td>
                  <td v-if="course.delivery_method" class="text-l">
                    {{ course.delivery_method }}
                  </td>
                  <td v-if="course.booking_url" class="text-r td-booking">                    
                    <a href="#" v-if="store.auth()" @click.stop.prevent="toRedirect(course.booking_url, book_form)" >Enquire/Book</a>
                    <a href="#" v-else @click.stop.prevent="openCourseEmailPopup(course.booking_url)" >Enquire/Book</a>
                  </td>
                </tr> -->
                <tr v-if="isBookNow">
                  <td>
                    {{ course.delivery_start ? course.deliveryFrom : '-' }}
                  </td>
                  <td>
                    {{ course.delivery_method ? course.delivery_method : '-' }}
                  </td>
                  <td v-if="course.booking_url" class="text-r td-booking">
                    <a href="#" v-if="$store.state.auth" @click.stop.prevent="openCourseAlertPopup(course.booking_url)" >Enquire/Book</a>
                    <a href="#" v-else @click.stop.prevent="openCourseEmailPopup(course.booking_url)" >Enquire/Book</a>
                  </td>
                </tr>
                <template v-if="isEnquireAdditional">
                  <tr v-for="date in course.tab_dates" :key="date.id">
                    <template v-if="date.booking_url">
                      <td>
                        {{ date.startDate ? date.startDate : '-' }}
                      </td>
                      <td>
                        {{ date.method ? date.method : '-' }}
                      </td>
                      <!-- @click.stop.prevent="toRedirect(date.booking_url, book_form)" -->
                      <td class="text-r td-booking">
                        <a href="#" v-if="$store.state.auth" @click.stop.prevent="openCourseAlertPopup(date.booking_url)" >Enquire/Book</a>
                        <a href="#" v-else target="_blank" @click.stop.prevent="openCourseEmailPopup(date.booking_url)" >Enquire/Book</a>
                      </td>
                    </template>
                  </tr>
                </template>
                  <tr v-if="!isEnquireAdditional && !isBookNow">
                    <td colspan="3">
                      <p>There are currently no new dates advertised for this course</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="details">
                <div v-if="course.phone" class="phone-wrapper">
                  <a
                    data-icon="☎"
                    :href="`tel:${course.phone}`"
                    class="icon-before"
                  >
                    <span class="phone">{{ course.phone }}<span class="overlay" @click="showPhoneNumber">Reveal</span></span>
                  </a>
                </div>
                <!-- <a href="#"
                  data-icon="✉"
                  class="email icon-before"
                  target="_blank"
                  @click="openEnquireEmailPopup"
                >
                    Enquire by email
                </a> -->
                <a class="website icon-before" v-if="course.site" :href="fullPath" @click.stop.prevent="toRedirect(course.site, web_form)" data-icon="">Visit website</a>
              </div>
            </div>
            <div class="course-downloads" v-if="course.tab_attachments.length > 0">
              <h2 class="course-downloads__title">Downloads</h2>
              <ul>
                <li v-for="attach in course.tab_attachments" :key="attach.id">
                  <a
                    :href="attach.media.url"
                    class="icon-before"
                    :data-icon="checkTypeDocument(attach.media.name)"
                    target="_blank"
                    download
                  >{{ attach.media.description }}<span v-if="attach.media.size"> ({{ attach.media.size }})</span></a>
                </li>
              </ul>
            </div>
            <div class="related-article" v-if="article.length > 0">
              <div class="header">
                <h2 class="header_title">Related Articles</h2>
                <img class="header_image" src="../../../img/vet-times-cpd-plus-logo.png" alt="vettimes-cpd-plus">
              </div>
              <div class="item cf" v-for="item in article" :key="item.id">
                <div class="image">
                  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name">
                </div>
                <div class="content">
                  <h4 v-if="item.name">                    
                    <nuxt-link :to="`/cpd-plus/article/${item.articleNumber}/${item.slug}?${relatedArticleUtmSource}`" target="_blank"><b>{{ item.name }}</b></nuxt-link>
                    <!-- <a :href="item.articleUrl" target="_blank"><b>{{ item.name }}</b></a> -->
                  </h4>
                  <p>{{item.subTitle}}</p>
                  <h5 class="author" v-if="item.author">{{ item.author }}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="inner__content" v-else="noCourse">{{ noCourse }}</div>
          <!-- <div class="inner__articles">
            <h1 class="site-title">RELATED ARTICLES</h1>
          </div> -->
        </div>
      </div>
    </div>

    <EnquireEmail v-if="dialog" :course_id="course.id" :provider_id="null" />
    <CourseEmail v-if="courseDialog" :provider_id="null" />
    <CourseAlert v-if="courseAlertDialog" :provider_id="null" />

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
