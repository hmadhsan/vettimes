<template>
  <div id="edit-alert">
    <div class="content">
      <div class="row">
        <div class="site-title-wrapper">
          <h1 class="site-title">Edit your alert</h1>
        </div>
        <p><router-link :to="`/your-courses`">←Back to your course alerts</router-link></p>
        <div class="content__inner">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form ref="form" :model="form" :rules="rules">

                <el-form-item label="Keywords" prop="value">
                  <el-select
                      v-model="form.value"
                      autocomplete="on"
                      multiple
                      filterable
                      clearable
                      allow-create
                      default-first-option
                      remote
                      reserve-keyword
                      loading-text="Loading..."
                      no-data-text="No data"
                      no-match-text="No matching data"
                      placeholder="Start typing a course or subject"
                      :remote-method="remoteMethod"
                      :loading="loading">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-row :gutter="20">
                  <el-col :span="12" :xs="24">
                    <el-form-item label="Frequency" prop="frequency">
                      <el-select v-model="form.frequency">
                        <el-option label="Weekly" value="Weekly"></el-option>
                        <el-option label="Daily" value="Daily"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24">
                    <el-form-item label="Received on" prop="received" v-if="form.frequency === 'Weekly'">
                      <el-select v-model="form.received">
                        <el-option label="Monday" value="1"></el-option>
                        <el-option label="Tuesday" value="2"></el-option>
                        <el-option label="Wednesday" value="3"></el-option>
                        <el-option label="Thursday" value="4"></el-option>
                        <el-option label="Friday" value="5"></el-option>
                        <el-option label="Saturday" value="6"></el-option>
                        <el-option label="Sunday" value="7"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="cf">
                  <el-button class="button button_brand float-r" @click="submitForm('form')">Save</el-button>
                </div>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
