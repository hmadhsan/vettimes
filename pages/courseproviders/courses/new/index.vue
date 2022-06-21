<template>
  <div id="new-course">
    <div class="content">
      <div class="row">
        <div class="site-title-wrapper">
          <h1 class="site-title">Advertise a new course</h1>
        </div>
        <el-form
          class="form-validate"
          :model="form"
          :rules="rules"
          ref="title"
        >
          <el-row :gutter="20">
            <el-col :span="18" :xs="24">
              <el-form-item label="Title" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="24">
              <button type="button" class="button button_brand button_block button_compact" @click="submitForm('title')">Save</button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
