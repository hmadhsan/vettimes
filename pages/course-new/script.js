import store from "../../config/store"

export default {
  store,
  data() {
    return {
      form: {
        title: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.$post("/rest/course", { title: this.form.title }).then( r => {
            if (r) {
              this.$router.push(`/courseproviders/courses/${r.id}/details/`);
            }
          })
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
