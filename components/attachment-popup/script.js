export default {
  data() {
    return {
      used: true,
      list: [],
      rules: {
        description: [
          { required: true, message: 'Please input description', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      if ( !this.used ) {
        setTimeout(() => {
          this.used = true;
        }, 1000);
        return this.$refs.upload.submit();
      }
      this.http.post("media", this.$parent.dialog).then( r => {
        this.done(r.data);
      });
    },
    cancel() {
      this.list = [];
      this.$parent.dialog = {};
      this.$parent.dialogOpen = false;
      this.used = true;
    },
    error() {
      this.list = [];
      this.used = true;
      this.$ntf();
    },
    done(data) {
      this.list = [];
      if ( this.$error(data) ) {
        this.$parent.get();
        this.$parent.dialog = {};
        this.$parent.dialogOpen = false;
      }
      this.used = true;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.cancel();
    },
  }
}
