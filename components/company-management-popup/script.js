
import axios from 'axios' 
import { error, load, ntf } from '~/config/globalFunctions';
import { cpdBaseUrl } from '~/config/constants';
export default {
  data() {
    return {
      cpdBaseUrl,
      http:null,
      used: true,
      list: []
    }
  },
  computed:{
    cpdUrl(){
      return `${cpdBaseUrl}/`+`rest/media`
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
      
      this.http = axios.create({
        baseURL: `${cpdBaseUrl}/` + "rest/",
        headers: { 'X-CSRF-TOKEN': this.$csrfToken() },
        transformRequest: (data, headers) => {
          load(1);
          return axios.defaults.transformRequest[0](data, headers);
        },
        transformResponse: (data, headers) => {
          load();
          if(!!headers.title && headers.title !== '' && !!headers.path) {
            // document.title = headers.title;
            setTimeout(() =>{
              process.browser ? document.title = headers.title : null;
            }, 100);
          }
          try {
            return JSON.parse(data);
          } catch (e) {
            error({});
          }
        }
      });
     
    this.http.post("media", this.$parent.dialog).then( r => {
      this.done(r);
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
      ntf();
    },
    done(data) {      
      this.list = [];
      if ( error(data) ) {
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
