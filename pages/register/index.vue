<template>
  <div id="register-provider">
    <div class="content">
      <div class="site-title-wrapper">
        <div class="row">
          <h1 class="site-title">Create Account</h1>
        </div>
      </div>
      <div class="row">
        <p>To post your courses on our CPD site you need to be an approved CPD Provider, please fill in the form below and we will call you back as soon as possible.</p>
        <p>Alternatively, please call us on <a href="tel:01733383534">(0)1733 383534</a> or email us at <a href="mailto:cpd@vettimes.co.uk">cpd@vettimes.co.uk</a></p>
        <el-form
          class="form-validate"
          :model="userData"
          :rules="rules"
          ref="userData"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Your name" prop="name">
                <el-input v-model="userData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Your telephone number" prop="phone">
                <el-input v-model.number="userData.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Your email address" prop="email">
                <el-input v-model="userData.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Your company" prop="company">
                <el-input v-model="userData.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Message" prop="message">
                <el-input type="textarea" v-model="userData.message"></el-input>
              </el-form-item>
            </el-col>
            <div class="cf">
              <button type="button" class="button button_brand float-r" @click="submitForm('userData')">Request call back</button>
            </div>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
