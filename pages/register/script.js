export default {
  data() {
    return {
      userData: {
        name: '',
        phone: '',
        email: '',
        company: '',
        message: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input your name', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please input your phone number', trigger: 'blur' },
          { type: 'number', message: 'Phone must be a number'}
        ],
        email: [
          { type: 'email', required: true, message: 'Please input your email', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post(`email?_path=${this.$route.path}`, this.userData).then( r => {
            this.$error(r.data);
          });
        } else {
          alert('error');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
