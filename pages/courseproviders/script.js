import store from "../../store"
import { cpdBaseUrl } from "~/config/constants";
export default {
  
  data() {
    return {
      store,
      cpdBaseUrl,
      loginTo: 'https://my.vettimes.co.uk/login',
      registerTo: 'https://my.vettimes.co.uk/register',
      redirectTo: process.browser ? window.location.href : '',
      registerHere:
        ( this.$store.state.auth ) 
        ? '/courseproviders/company-management'
        : 'https://my.vettimes.co.uk/register?redirectTo=' + process.env.LOCAL_HOST + '&fromCPD=true',
      buyTo: 
        (this.$store.state.auth && this.$store.state.auth === 2 )
        ? '/courseproviders/courses/new'
        : ( this.$store.state.auth ) ? '/courseproviders/company-management' 
        : 'https://my.vettimes.co.uk/register?redirectTo=' + process.env.LOCAL_HOST + '&fromCPD=true',
      dialogFormVisible: false,
      page: [],
      ruleForm: {
        name: '',
        email: '',
        phone: '',
        company: '',
        cpd_certify: '',
        message: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input your name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input your email', trigger: 'blur' }
        ],
        cpd_certify: [
          { required: true, message: 'Please check certify checkbox', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please input your phone number', trigger: 'blur' },
          { type: 'number', message: 'Phone must be a number'}
        ]
      }
    }
  },
  mounted: function () {

    

    this.$nextTick(function () {
      this.getCoursesHomeContent();      
    });
    if( (['#why-choose-us', '#packages'].indexOf( this.$route.hash ) >= 0 ) ) {
      let section = this.$route.hash.replace('#', ''); window.scroll( section );
    }
  },
  methods: {
    goto() {
      const element = process.browser ? document.getElementById('why-choose-us') : ''
      console.log(element);
      element.scrollTop = element.offsetHeight + element.scrollHeight
    },
    getCoursesHomeContent: function() {
      this.$axios.$get("/rest/pages?slug=providers&_path=" + this.$route.path).then( r => {
        if(r.status) {
          this.page = r.block || [];
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.$post(`/rest/email`, this.ruleForm).then( r => {
            this.$error(r);
          });
          this.dialogFormVisible = false;
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

