export default {
  data() {
    return {
      id: this.$route.params.id,
      dataUpdateSuccess: false,
      dataUpdateError: false,
      form: {},
      vars: {},
      rules: {
        speciality: [
          { type: 'array', required: true, message: 'Please select at least one speciality', trigger: 'blur' }
        ],
        course_type: [
          { required: true, message: 'Please select course type', trigger: 'blur' }
        ],
        audience: [
          { type: 'array', required: true, message: 'Please select at least one audience', trigger: 'blur' }
        ],
        skill_level: [
          { type: 'array', required: true, message: 'Please select at least one skill level', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please select price', trigger: 'blur' }
        ],
        cpd_hours: [
          { required: true, message: 'Please select CPD hours', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    get() {
      this.$axios.$get("/rest/course/category?id="+this.id + "&_path=/courseproviders/courses" ).then( r => {
        if ( this.$error(r.data) ) {
          this.vars = r.data.vars;
          this.form = Object.assign({
            speciality: [],
            audience: [],
            skill_level: [],
          }, r.data.data);
        }
      });
    },
    update(next = false) {
      this.form.course_id = this.id;
      this.$axios.$post("/rest/course/category", this.form).then( r => {
        if ( this.$error(r.data) && true === next ) {
          // window.location.href = this.$router.currentRoute.fullPath.replace('/categorisation', '/venues');
          this.$parent.activeTab('categorisation', 'venues'); this.$parent.activeTabAdditionalDates = true;
        }
      }).catch(e => {
        console.log(e);
      });
    },
    submitForm(form, next = false) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.update(next);
        } else {
          return false;
        }
      });
    },
  },
  created() {
    // this.$scrollToTop();
    this.get();
  }
}
