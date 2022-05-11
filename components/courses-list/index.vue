<template>
  <div class="inner__sidebar" id="courses-list">
    <div class="courses-list__head">
      <h3>{{ courses.total }} courses found</h3>
      <p>{{ founder.join(', ') }}</p>
    </div>
    <ol v-if="courses.total > 0">
      <li v-for="course in courses.array" :key="course.id">
        <router-link
          :to="`/course-details/${course.id}/${course.slug}/`"
          @click.native="getNewCourse"
          :class="[{ 'current': parseInt(course.id) === parseInt(id) }, '']"
        >
          <strong>{{ course.title }}</strong>  · {{ course.delivery_method }} · {{ course.price }}
        </router-link>
      </li>
    </ol>
    <div class="pagination">
      <el-pagination
          class="pagination__items"
          v-if="courses.total > 5"
          layout="prev, pager, next"
          :total="courses.total"
          :current-page="page"
          @current-change="goToPage"
          :pager-count = "5"
          :page-size="5">
      </el-pagination>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>