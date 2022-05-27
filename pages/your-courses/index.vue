<template>
    <div id="user-courses">
        <div class="content">
          <div class="row">
            <div class="site-title-wrapper">
              <h1 class="site-title">Your courses</h1>
            </div>
            <el-row :gutter="20">
              <el-col :span="16" :xs="24">
                <el-collapse v-model="activeNames">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <h3 class="h3 icon-before">
                        Saved courses
                        <span class="float-r">
                            <span class="stars-number" v-if="getStars()">{{ getStars() }}</span>
                            <i data-icon="★" class="icon-before"></i>
                        </span>
                      </h3>
                    </template>
                    <ul v-if="isCourses" class="courses-list">
                      <li v-for="course in courses" class="courses-list__item d-table">
                        <div class="d-table-cell">
                          <router-link :to="`/course-details/${course.id}/${course.slug}/`" class="courses-list__link">{{ course.title }}</router-link>
                        </div>
                        <div class="d-table-cell">
                          <button class="courses-list__btn" @click="deleteCourse(course.id)">Delete</button>
                        </div>
                      </li>
                    </ul>
                    <div v-else class="text-c"><p>You do not currently have any saved courses</p></div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template slot="title">
                      <h3 class="h3 no-margin">
                        Course alerts
                        <span class="float-r">
                          <span class="stars-number" v-if="alerts.length > 0">{{ alerts.length }}</span>
                          <i data-icon="✉" class="icon-before"></i>
                        </span>
                      </h3>
                    </template>
                    <ul v-if="alerts.length > 0" class="courses-list courses-list_alert">
                      <li v-for="alert in alerts" class="courses-list__item d-table">
                        <div class="d-table-cell alert-cell">
                          <ul>
                            <li v-for="(item, index) in getNotNullCategories(alert.keywords)" :key="item.id">
                              <p>{{ keys[index] }}: {{ item.split('|').join(', ') }}</p>
                            </li>
                            <li><p>Sent: {{ alert.frequency }}</p></li>
                          </ul>
                        </div>
                        <div class="d-table-cell alert-cell">
                          <span class="button-wrapper">
                            <router-link :to="createPreviewLink(getNotNullCategories(alert.keywords))"><button class="courses-list__btn">Preview</button></router-link>
                          </span>
                          <span class="button-wrapper">
                            <button class="courses-list__btn" @click="deleteAlert(alert)">Delete</button>
                          </span>
                          <span class="button-wrapper">
                            <button class="courses-list__btn" @click="editAlert(alert)">Edit</button>
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div class="text-c" v-if="alerts.length < 12">
                      <p>Get the latest courses sent straight to your inbox</p>
                      <p>
                        <button class="button button_brand icon-before icon-white" data-icon="✉" @click="addAlert = true">Create a course alert</button>
                      </p>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
            </el-row>
          </div>
        </div>
      <Popup ref="alert" />
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>