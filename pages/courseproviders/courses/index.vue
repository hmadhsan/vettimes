<template>
    <div id="your-courses">
        <div class="content">
          <Loader v-if="!showCourses && !notAuth" />
          <template v-else-if="showCourses">
            <div class="site-title-wrapper" id="courses-table">
                <h1 class="site-title">Your courses</h1>
                <form @submit="handlerSubmitSearchCourse">
                  <div class="row">
                    <el-row :gutter="20">
                      <el-col :span="9" :xs="24" :lg="10">
                        <div class="grid-content">
                          <span class="input-label d-block">Keywords</span>
                          <el-input
                              v-model="searchKeywords"
                              clearable>
                          </el-input>
                        </div>
                      </el-col>
                      <el-col :span="9" :xs="24" :lg="10">
                        <div class="grid-content">
                          <span class="input-label d-block">Status</span>
                          <el-select v-model="providerStatus" placeholder="Select Status" class="d-block">
                            <el-option label="All" value="-1" />
                            <el-option label="Live" value="1" />
                            <el-option label="Draft" value="2" />
                            <el-option label="Awaiting Release" value="3" />
                            <el-option label="Expired" value="4" />
                            <el-option label="Archived" value="0" />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span="6" :xs="24" :lg="4">
                        <div class="grid-content">
                          <span class="input-label d-block faked-label"></span>
                          <button type="submit" class="button button_brand button_block">Filter</button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </form>
            </div>
            <div class="row">
                <div class="inner">
                  <el-row>
                    <el-col :span="16">
                      <div class="grid-content">
                        <ul class="list-inline list-inline_pipe">
                          <li>Courses found: {{ data.total }}</li>
                          <li>Views: {{ leads.withViews }}</li>
                          <li>Leads: {{ leads.withLeads }}</li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content text-r">
                        <button class="button button_brand" @click="advertise=true">Advertise a course</button>
                      </div>
                    </el-col>
                  </el-row>
                    <Table v-if="data.total > 0"></Table>
                    <p v-else>No matching courses found</p>
                </div>
            </div>
          </template>
          <ProvidersOnly v-if="notAuth && !showCourses"/>
        </div>
        <Popup v-if="advertise"></Popup>
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>