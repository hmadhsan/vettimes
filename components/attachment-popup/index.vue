<template>
  <el-dialog
    class="custom-footer"
    title="Upload File"
    :visible.sync="!!$parent.dialogOpen"
    :before-close="() => $parent.dialogOpen = false"
  >

    <el-form
      class="form-validate"
      v-model="$parent.dialog"
      label-position="right"
      label-width="100px"
      :model="$parent.dialog"
      :rules="rules"
      ref="ruleForm"
    >

      <el-form-item label="Description" prop="description">
        <el-input v-model="$parent.dialog.description" />
      </el-form-item>

      <el-form-item label="File">
        <el-upload
            name="file"
            ref="upload"
            :with-credentials="true"
            :accept="$parent.accept[$parent.dialog.type]"
            :auto-upload="false"
            :headers="{ 'X-CSRF-TOKEN': this.$csrfToken() }"
            :action="$store.state.mystore.base+`rest/media`"
            :data="$parent.dialog"
            :limit="1"
            :file-list="list"
            :on-success="done"
            :on-error="error"
            :on-remove="() => used = true"
            :on-change="() => used = false"
        >
          <div class="el-upload__tip" slot="tip">Your file must be no larger than 1000Kb, and be one of: doc, docx, pdf, pages, png, jpg, jpeg, gif.</div>
          <el-button type="secondary" size="small" v-if="used">Select</el-button>
        </el-upload>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <button class="button button_secondary mr-5" @click="resetForm('ruleForm')">Cancel</button>
      <button class="button button_brand" @click="submitForm('ruleForm')">Upload File</button>
    </span>

  </el-dialog>
</template>

<style lang="scss">@import "./style";</style>
<script src="./script.js"></script>
