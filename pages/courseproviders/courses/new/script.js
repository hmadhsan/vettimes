import { error } from "~/config/globalFunctions";


export default {
  head(){
    return {
      title:'Course New'
    }
  },
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
  mounted(){
    // this.$axios.get("/rest/auth").then(res => {
    //   this.$store.commit( "mystore/auth", ( !res.data || !res.data || !res.data.id ) ? false : res.data );
    //   this.access(this.$route);
    // }).catch( () => {
    //   this.$store.commit("mystore/auth");
    //   this.access(this.$route);
    // });
  },
  methods: {
    access(to) {
      let auth = this.$store.state.mystore.auth;
      if (auth === null) return false;
    
      const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
      if(!!to.meta.auth) {
        if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0) {
          return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
        }
      }
      document.title = to.name;
      return true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.$post("/rest/course", { title: this.form.title }).then( r => {
            if (error(r)) {
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
