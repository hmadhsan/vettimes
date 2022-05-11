export default {
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
      this.http.get(`user?_path=${this.$route.path}`).then( r => {
        if ( this.$error(r.data) ) {
          this.userData = r.data.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.put(`user?_path=${this.$route.path}`, this.userData).then( r => {
            this.$error(r.data);
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
