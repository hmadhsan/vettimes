<template>
  <el-dialog
    class="custom-footer"
    title="Add an additional date"
    :visible.sync="!!$parent.dialog"
    :before-close="() => $parent.dialog = false"
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
      <MessageInfo
          :updateSuccess="dataUpdateSuccess"
          :updateError="dataUpdateError"
          :http="true"
      ></MessageInfo>

      <el-form-item label="Start date" class="el-formitem_required" prop="start_if">
        <div>
          <el-radio v-model="$parent.dialog.start_if" :label="true">Fixed date</el-radio>
          <span class="date-editor-container" v-if="$parent.dialog.start_if">
            <el-date-picker v-model="$parent.dialog.start"
                            :editable="false" format="dd/MM/yyyy" value-format="yyyy-MM-dd" value="2010-10-01"/>
            <i class="date-picker__icon icon-before" data-icon=""></i>
          </span>

        </div>
        <div>
          <el-radio v-model="$parent.dialog.start_if" :label="false">No fixed date</el-radio>
        </div>
      </el-form-item>

      <el-form-item label="Delivery" class="el-form-itemrequired" prop="method">
        <div>
          <el-radio checked v-if="deliveryMethod">Specific location</el-radio>
          <el-radio v-else v-model="$parent.dialog.method" label="">Specific location</el-radio>
          <el-input v-model="$parent.dialog.method" v-if="deliveryMethod" />
        </div>
        <div>
          <el-radio v-model="$parent.dialog.method" label="Online">Online</el-radio>
        </div>
        <div>
          <el-radio v-model="$parent.dialog.method" label="Distance">Distance (Other)</el-radio>
        </div>
      </el-form-item>

      <el-form-item label="Booking url">
        <el-input @change="validateUrl($parent.dialog.booking_url)" v-model="$parent.dialog.booking_url" />
      </el-form-item>

    </el-form>

    <span slot="footer">
      <button class="button button_secondary mr-5" @click="$parent.dialog = false">Cancel</button>
      <button class="button button_brand" @click="submitForm('ruleForm')">Save</button>
    </span>

  </el-dialog>
</template>

<script>
import MessageInfo from "../../../../../components/message-info";

export default {
  components: {
    MessageInfo
  },
  data() {
    return {
      dataUpdateError: false,
      dataUpdateSuccess: false,
      rules: {
        start_if: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        method: [
          { required: true, message: 'Please input specific location', trigger: 'change' }
        ],
      }
    }
  },
  watch: {
    'dataUpdateError': '$scrollToTop',
  },
  computed: {
    deliveryMethod () {
      return !(["Online","Distance"].indexOf(this.$parent.dialog.method) > -1);
    }
  },
  methods: {
    submit: function() {


      this.dataUpdateError = false;
      if(this.$parent.dialog.start_if === undefined) {
        this.dataUpdateError = 'Please choose start date';
      } else if( this.$parent.dialog.start_if && !this.$parent.dialog.start ) {
        this.dataUpdateError = 'Please choose correct start date';
      }

      if (!this.dataUpdateError) {

        if( !this.$parent.dialog.start_if && !!this.$parent.dialog.start ) {
          this.$parent.dialog.start = '';
        }
        this.$parent.update()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    validateUrl(url) {
      if( url ){ 
        url = url.replace('www.', '');
        if( !(url.substring(0, 8) == 'https://') && !(url.substring(0, 7) == 'http://') ) {
          url = 'https://' + url;
        }
        
        this.$parent.dialog.booking_url = url;
      }
    }
  }
}
</script>
