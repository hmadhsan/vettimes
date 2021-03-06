import store from "../../config/store"
export default {
  store,
  data() {
    return {   
      loginTo: 'https://my.vettimes.co.uk/login',
      registerTo: 'https://my.vettimes.co.uk/register',
     // redirectTo: window.location.href,
      registerHere:
        ( store.auth ) 
        ? '/courseproviders/company-management'
        : 'https://my.vettimes.co.uk/register?redirectTo=' + process.env.LOCAL_HOST + '&fromCPD=true',
      buyTo: 
        (store.auth && store.auth === 2 )
        ? '/courseproviders/courses/new'
        : ( store.auth ) ? '/courseproviders/company-management' 
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
      let section = this.$route.hash.replace('#', ''); this.$scrollToElement( section );
    }
  },
  methods: {
    getCoursesHomeContent: function() {
      this.http.get("pages?slug=providers&_path=" + this.$route.path).then( r => {
        if(r.data.status) {
          this.page = r.data.block || [];
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post(`email`, this.ruleForm).then( r => {
            this.$error(r.data);
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

