import EnquireEmail from "../../components/enquire-email"
import mixins from "../../config/mixins"
import CoursePreview from "../../components/course-preview"
import EmailMeCourses from "../../components/email-me-courses"
import Loader from "../../components/loader"

export default {
  mixins: [ mixins.helpers ],
  components: {
    EnquireEmail,
    CoursePreview,
    EmailMeCourses,
    Loader
  },
  data() {
    return {
      showPhone: false,
      id: this.$route.params.id,
      provider: {
        logo_data: {
          url: ''
        }
      },
      courses: {
        array: [],
        total: 0
      },
      loader: true,
      courseLoader: true,
      noProvider: false,
      phone_form: {
        provider_id: '',
        type: 'phone'
      },
      web_form: {
        provider_id: '',
        type: 'web'
      },
      view_form: {
        provider_id: '',
        type: 'view'
      },
      popoverVisible: false,
      keywords: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.get();
      this.getCourses();
    });
  },
  methods: {
    get: function () {
      this.http.get(`provider?id=${this.id}&_path=${this.$route.path}`).then( r => {
        if ( r.data.status ) {
          this.provider = r.data.data;
          this.web_form.provider_id = this.provider.id;
          this.phone_form.provider_id = this.provider.id;
          this.view_form.provider_id = this.provider.id;
          this.http.put("leads"+this.$toQuery(this.view_form)).then( r => {});
          this.keywords.push('Provider: ' + this.provider.name);
          this.loader = false;
          if(this.provider.slug.indexOf(this.slug) < 0) {
            this.$router.push(`/provider-details/${this.id}/${this.provider.slug}`);
          }

        } else {
          this.noProvider = r.data.error;
          this.loader = false
        }
      });
    },
    getCourses: function () {
      this.http.get(`courses/latest?provider=${this.id}`).then( r => {
        if ( r.data.total > 0 ) {
          this.courses = r.data;
        }
      });
    },
    setQuery: function () {
    //  ?kw=Provider: ${provider.name}&so=Date&pid=${provider.id}
    },
    showPhoneNumber: function (e) {
      if(!this.showPhone) {
        e.preventDefault();
        this.http.put("leads"+this.$toQuery(this.phone_form)).then( r => {});
        e.target.style.display = 'none';
        this.showPhone = true;
      }
    },
    toRedirect: function(url, form) {
      this.http.put("leads"+this.$toQuery(form)).then( r => {});
      let params = {
        url: this.checkUrl(url),
        title: '',
        provider: ''
      };
      if(!!this.provider.name) {
        params.title = this.provider.name;
      }
      console.log('push');
      this.$router.push({
        name: "Redirecting",
        params: params
      })
    },
    findSponsorship(word) {
      return false;
    }
  }
}