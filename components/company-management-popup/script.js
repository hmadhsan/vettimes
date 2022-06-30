export default {
  data() {
    return {
      used: true,
      list: []
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
      this.$parent.dialogBox.allowAllRole = true;
      this.$axios.$post("/rest/media", this.$parent.dialogBox).then( r => {
        this.done(r.data);
      });
    },
    cancel() {
      this.list = [];
      this.$parent.dialogBox = {};
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
        if(data.logo_data) this.$parent.content.logo_data = data.logo_data; 
        else this.$parent.get();
        this.$parent.dialogBox = {};
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
