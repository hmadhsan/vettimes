<template>
  <div id="course-advertise">
    <div class="content">
      <div class="row">
        <el-row :gutter="10">
          <el-col :span="16" :xs="24">
            <h1 class="site-title">Course {{ info.id }}: {{ info.title }}</h1>

            <div class="course-description" v-if="![0,2].indexOf(info.status) > -1">
              <p>Product: <strong>{{ products[info.product_id] }}</strong></p>
              <p>
                <span class="pipe">{{ info.with_cbes_count }} CBEs</span>
                <span class="pipe">{{ info.with_views_count }} views</span>
                <span class="pipe">{{ info.with_leads_count }} leads</span>
                <span>
                  <router-link
                      class="preview-link"
                      :to="getPreviewLink().link"
                      target="_blank"
                  >
                    {{ getPreviewLink().title }}
                  </router-link>
                </span>
              </p>
            </div>
            
          </el-col>
          <el-col :span="8" :xs="24">
            <h2 class="course-status text-r">Status: {{ info.statusName }} <span class="course-status__info" v-if="statusDescription().status">{{statusDescription().desc}}</span></h2>
            <ul class="course-buttons" v-if="!onEnhancementsTab">
              <!-- <li class="course-buttons__item">
                <button class="button button_secondary" @click="doCopy">Copy</button>
              </li>
              <li class="course-buttons__item" v-if="([0,2].indexOf(info.status) > -1) && showPublishButton">                
                <button class="button button_secondary" @click="setStatus(1)">Publish</button>
              </li> -->
              <li class="course-buttons__item" v-if="info.status === 1">
                <button class="button button_secondary" @click="setStatus(4)">Expire</button>
              </li>
<!--              <li class="course-buttons__item" v-if="[3,4].indexOf(info.status) > -1">-->
<!--                <button class="button button_secondary" @click="setStatus(0)">Archive</button>-->
<!--              </li>-->
              <!-- <li class="course-buttons__item" v-if="info.status === 2" @click="doDelete">
                <button class="button button_secondary">Delete</button>
              </li> -->
            </ul>
          </el-col>
        </el-row>

        <div class="content__inner cf">
          <Sidebar v-if="!isEmptyObj(tab)" />
          <transition name="fade" mode="out-in">
            <component v-if="tab" class="with-sb main-advertise" :is="tab.replace(' ','')" :key="`course`+Date.now()" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
