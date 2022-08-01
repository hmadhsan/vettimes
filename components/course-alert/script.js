import CourseAlert from "./index";
import mixins from "../../config/mixins";
import { cpdBaseUrl } from "~/config/constants";

export default {
  
  components: { CourseAlert },
  props: ['course_id', 'provider_id', 'keywords', 'url'],  
  mixins: [ mixins.helpers ],
  data() {
    return {
      cpdBaseUrl,
      loadData: true,
      form: {
        course_id: this.$parent.form.course_id,
        provider_id: this.$props.provider_id,
        type: 'email',
        // value: this.$props.keywords,
        value: '',
        frequency: 'Daily',
        received: '1',
        alert: 1,
        email: '',
        slug: '',
        yes_please_box: false,
        no_thanks_box: false
      },
    }
  },
  computed: {
    infoTermsLink(){
    return `${cpdBaseUrl}/nuxt/info/terms/`
  }
  },
  created: function () {
    window.addEventListener('keyup', this.closePopupByKeyboard)
  },
  methods: {
    ntf(obj){  
      if (typeof obj === "string") obj = { type: "error", message: obj };
      if (typeof obj !== "object") obj = { type: "error", message: unknownError };
      if (!obj.type) obj.type = "error";
      if (!obj.message) obj.message = unknownError;
      if (!obj.duration) obj.duration = 5000;
      ElementUI.Message({
        duration: obj.duration,
        message: obj.message,
        showClose: true,
        type: obj.type
      });
    },
    toQuery(obj) {
      return "?"+ Object.keys(obj)
      .map(key => key + "=" + (obj[key] || ""))
      .join("&")
    },
    noThanks: function() {
      this.$axios.$put("/rest/leads/no-thanks" + this.toQuery(this.form)).then( r => {        
        if(r.error !== undefined) return this.ntf(r.error);
        // if(r.data.status) window.location.href = store.state.url;
        this.closeCourseAlertPopup();
      });
    },
    closeCourseAlertPopup: function() {
      this.$store.commit({
        type: 'mystore/changeCourseAlertDialog',
        dialog: false
      });
      document.body.style.overflow = '';      
    },
    closePopup: function(e) {
      if(e.target.parentNode.classList.contains('ce-wrap')) {
        this.closeCourseAlertPopup();
      }
    },
    closePopupByKeyboard: function(e) {
      if(e.keyCode == 27) {
        this.closeCourseAlertPopup();
      }
    },
    setCheckBox: function(checkbox_id) {
      this.resetCheckBox();
      if(checkbox_id == '1') this.form.yes_please_box = true;
      else if(checkbox_id == '2') this.form.no_thanks_box = true;
    },
    resetCheckBox: function() {
      this.form.yes_please_box = this.form.no_thanks_box = false;
    },
    submitForm: function (e) {     
      
      e.preventDefault();               
      this.form.course_id = this.$route.params.id;
      this.form.slug = this.$route.params.slug;
      this.form.value = this.$route.query.porder ? this.$route.query.porder.split('|') : '';

      this.$axios.$put("/rest/leads/course-alert" + this.toQuery(this.form)).then( r => {
        if(r.error !== undefined) return this.ntf(r.error);
        process.browser ? window.location.href = this.$store.state.mystore.url : null;
        this.closeCourseAlertPopup();
      });
    }
  }
}
