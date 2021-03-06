import CourseEmail from "./index";
import mixins from "../../config/mixins";
import store from "../../config/store";

export default {
  store,
  components: { CourseEmail },
  props: ['course_id', 'provider_id', 'keywords', 'url'],  
  mixins: [ mixins.helpers ],
  data() {
    return {
      loadData: true,
      form: {
        course_id: this.$props.course_id,
        provider_id: this.$props.provider_id,
        type: 'email',
        // value: this.$props.keywords,
        value: '',
        frequency: 'Daily',
        received: '1',
        email: '',
        slug: '',
        concern_box: ''
      },
    }
  },
  computed: {

  },
  created: function () {
    window.addEventListener('keyup', this.closePopupByKeyboard)
  },
  methods: {
    closeCourseEmailPopup: function(redirectWebsite = false) {
      // if(redirectWebsite) window.location.href = store.state.url;
      store.commit({
        type: 'changeCourseEmailDialog',
        dialog: false
      });
      document.body.style.overflow = '';      
    },
    closePopup: function(e) {
      if(e.target.parentNode.classList.contains('ce-wrap')) {
        this.closeCourseEmailPopup();
      }
    },
    closePopupByKeyboard: function(e) {
      if(e.keyCode == 27) {
        this.closeCourseEmailPopup();
      }
    },
    submitForm: function (e) {
      e.preventDefault();               
      this.form.course_id = this.$route.params.id;
      this.form.slug = this.$route.params.slug;
      this.form.value = this.$route.query.porder ? this.$route.query.porder.split('|') : '';

      this.http.put("leads/booknow" + this.$toQuery(this.form)).then( r => {
        if(r.data.error !== undefined) return this.$ntf(r.data.error);
        window.location.href = store.state.url;
        this.closeCourseEmailPopup();
      });
    }
  }
}
