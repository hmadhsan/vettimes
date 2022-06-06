<template>

  <div id="provider-single">

    <div class="content">
      <div class="row">

        <Loader v-if="loader" />
        <div class="inner cf" v-else-if="!loader && !noProvider">
          <div class="inner__sidebar">
            <div class="logo" v-if="provider.logo_data">
              <img :src="provider.logo_data.url">
            </div>
            <dl class="details">
              <template  v-if="provider.contact">
                <dt>Name</dt>
                <dd>{{ provider.contact }}</dd>
              </template>
              <template v-if="provider.phone">
                <dt>Telephone</dt>
                <dd>
                  <a class="icon-before" data-icon="☎" :href="`tel:${provider.phone}`">
                    <span class="phone">{{ provider.phone }}<span class="overlay" @click="showPhoneNumber">Reveal</span></span>
                  </a>
                </dd>
              </template>
              <template v-if="provider.site">
                <dt>Website</dt>
                <dd><a target="_blank" href="#" @click.stop.prevent="toRedirect(provider.site, web_form)">{{ provider.site }}</a></dd>
              </template>

            </dl>
            <a
                href="#"
                class="email icon-before"
                data-icon="✉"
                target="_blank"
                @click="openEnquireEmailPopup"
            >Enquire by email</a>
          </div>
          <div class="inner__content">
            <h1 class="site-title">{{ provider.name }}</h1>
            <div class="info" v-html="provider.description"></div>
            <div class="email">
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
                    class="icon-before">Email me courses from this provider</el-button>
              </el-popover>
              </transition>
            </div>
            <div class="courses" v-if="courses.total > 0 && courses">
              <h2 class="courses_provider-name">Latest courses from {{ provider.name }}</h2>
              <CoursePreview
                v-for="course in courses.array"
                :key="course.id"
                :course="course"
                type="provider"
                :logo="provider.logo_data || ''"
              ></CoursePreview>
              <div class="more">
                <router-link
                  :to="`/courses/?kw=Provider: ${provider.name}&so=Date&pid=${provider.id}`"
                >
                  More courses from this provider
                </router-link>
              </div>
            </div>
            <div v-else>
              <p>No Courses</p>
            </div>
          </div>
        </div>
        <div class="inner cf" v-else>
          <p>{{ noProvider }}</p>
        </div>
      </div>
    </div>

    <EnquireEmail v-if="dialog" :course_id="null" :provider_id="provider.id" />

  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
