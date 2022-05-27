<template>
  <el-dialog
      title="Create a course alert"
      :visible.sync="!!$parent.addAlert"
      :before-close="() => {$parent.addAlert = false, $parent.resetForm()}"
      width="800px"
  >
    <div id="add-alert">
        <div class="content-alert">
          <p>Set up a "courses by email" alert and you'll be notified of new courses that fit your interests.</p>
          <p>Create up to 12 alerts and be the first in queue for your next course.</p>
          <el-form ref="form" :model="$parent.form" :rules="$parent.rules">

            <el-form-item label="Keywords" prop="value">
              <el-select
                v-model="$parent.form.value"
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
                :remote-method="$parent.remoteMethod"
                :loading="$parent.loading">
                <el-option
                  v-for="item in $parent.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12" :xs="24">
                <el-form-item label="Frequency" prop="frequency">
                  <el-select v-model="$parent.form.frequency">
                    <el-option label="Weekly" value="Weekly"></el-option>
                    <el-option label="Daily" value="Daily"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" v-if="$parent.form.frequency !== 'Daily'">
                <el-form-item label="Received on" prop="received">
                  <el-select v-model="$parent.form.received">
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
            <el-form-item>
              <el-button class="button button_brand button_compact" @click="$parent.submitForm()">Save</el-button>
            </el-form-item>
          </el-form>
          </div>
    </div>
  </el-dialog>
</template>
