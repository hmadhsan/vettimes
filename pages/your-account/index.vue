<template>
  <div id="user-account">
    <div class="content">
      <div class="row">
        <div class="site-title-wrapper">
          <h1 class="site-title">Your account</h1>
        </div>
        <h3>Update your details</h3>
        <el-form
          class="form-validate"
          :model="userData"
          :rules="rules"
          ref="userData"
        >
          <el-row :gutter="20">
            <el-col :span="12" :xs="24">
              <el-form-item label="First name" prop="first_name">
                <el-input v-model="userData.first_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="Last name" prop="last_name">
                <el-input v-model="userData.last_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <hr>
          <el-form-item>
            <div>
              <el-checkbox label="I would like to receive emails sent directly from Vet Times CPD" v-model="userData.sent_directly"></el-checkbox>
            </div>
            <div>
              <el-checkbox label="I would like to receive emails from selected third parties" v-model="userData.third_parties"></el-checkbox>
            </div>
          </el-form-item>
          <div class="cf">
            <button type="button" class="button button_brand float-r" @click="submitForm('userData')">Save changes</button>
          </div>
        </el-form>
<!--        <p>-->
<!--          <router-link-->
<!--            class="el-button&#45;&#45;text delete-button"-->
<!--            :to="'/delete-account-request'"-->
<!--          >-->
<!--            Delete your account-->
<!--          </router-link>-->
<!--        </p>-->
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
