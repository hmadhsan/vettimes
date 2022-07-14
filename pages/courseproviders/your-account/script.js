import { error } from "~/config/globalFunctions";

export default {
  head() {
    return {
      title: "Your Account"
    }
  },
  data() {
    return {
      userData: {
        first_name: '',
        last_name: '',
        sent_directly: '',
        third_parties: ''
      },
      rules: {
        first_name: [
          { required: true, message: 'Please input first name', trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: 'Please input last name', trigger: 'blur' }
        ],
      }
    }
  },
  created: function () {
    this.get();
  },
  methods: {
    get() {
      this.$axios.$get(`/rest/user?_path=${this.$route.path}`).then( r => {
        if ( error(r) ) {
          this.userData = r.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.$put(`/rest/user?_path=${this.$route.path}`, this.userData).then( r => {
            error(r);
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
