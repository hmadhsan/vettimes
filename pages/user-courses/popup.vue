<template>
  <el-dialog
    title="Create course"
    :visible.sync="!!$parent.advertise"
    :before-close="() => $parent.advertise = false"
    width="500px"
  >
    <el-form>
      <el-row :gutter="10">
        <el-col :span="18">
          <el-form-item label="Title">
            <el-input v-model="title" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <span class="faked-label d-block"></span>
          <button class="button button_brand button_block" type="success" @click="submit">Save</button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import store from "../../store";

export default {
  store,
  data() {
    return {
      title: ""
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.http.post("course", { title: this.title }).then( r => {
        if ( this.$error(r.data) ) {
          this.$router.push(`/courseproviders/courses/${r.data.id}/details/`);
        }
      })
    }
  }
}
</script>
