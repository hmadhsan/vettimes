import EnquireEmail from "../../components/enquire-email"
import CourseEmail from "../../components/course-email"
import CourseAlert from "../../components/course-alert"
import mixins from "../../config/mixins"
import CoursesList from "../../components/courses-list"
import Loader from "../../components/loader"
import store from "../../config/store";
import RemoteSearch from "../../components/remoteSearch";
import MessageInfo from "../../components/message-info";

export default {
  store,
  mixins: [ mixins.helpers ],
  components: {
    EnquireEmail,
    CourseEmail,
    CourseAlert,
    CoursesList,
    Loader,
    RemoteSearch,
    MessageInfo
  },
  data() {
    return {
      id: this.$route.params.id,
      slug: this.$route.params.slug,
      course: [],
      article: [],
      video: null,
      videoUrl: false,
      noCourse: false,
      load: true,
      showPhone: false,
      listLoad: false,
      keywords: [],
      dataUpdateSuccess: false,
      dataUpdateError: false,
      form: {
        course_id: '',
        type: 'phone'
      },
      web_form: {
        course_id: '',
        type: 'web'
      },
      book_form: {
        course_id: '',
        type: 'book'
      },
      view_form: {
        course_id: '',
        type: 'view'
      },
      isEnquire: true,
      isEnquireAdditional: false,
      isBookNow: false,
      relatedArticleUtmSource: 'utm_source=CPD%20listings&utm_medium=Widget&utm_campaign=CPDlaunch'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.get();
      if(store.state.searchList || store.state.categories || store.state.categoriesSlugsName) {
        this.getCategories();
      } else {
        this.listLoad = true;
      }
      // this.getArticle();
      this.getArticleBySpeciality();
      this.$scrollToTop();
    })
  },
  watch: {
    'video': 'getEmbed'
  },
  methods: {
    getCategories: function() {
      this.$axios.$get(`/rest/course/categories?count=false&list=true`).then( r => {
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(this.$error(r.data)) {
          for (let key in r.data.vars) {
            if(key !== 'cpd_hours') {
              r.data.vars[key].forEach(item => {
                categoriesSlugsName[item.slug] = item.name;
                categoriesNameSlugs[item.name] = item.slug;
                arr.push({
                  'value': item.name,
                  'label': item.name
                });
              })
            }
          }
          this.listLoad = true;
          store.commit('setCategories', r.data.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r.data['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r.data['categories_names']);
          store.commit('setSearchList', arr);
        }
      });
    },
    get: function () {
      let query = '';
      if(this.$route.query.preview) {
        query = `&preview=${this.$route.query.preview}`
      }
      this.$axios.$get(`/rest/course?id=${this.id}${query}&_path=${this.$route.path}`).then( r => {
        console.log('rrr', r)
        if (r.data)  {

          this.course = r.data;
          this.form.course_id = this.course.id;
          this.web_form.course_id = this.course.id;
          this.book_form.course_id = this.course.id;
          this.view_form.course_id = this.course.id;
          this.$axios.$put("/rest/leads"+this.$toQuery(this.view_form)).then( r => {});
          this.noCourse = true;
          if(r.data.video) {
            this.video = r.data.video
          }

          if(this.course.status === 2) {
            this.dataUpdateSuccess = 'Preview only, this course is not active';
          }

          if(this.course.slug.indexOf(this.slug) < 0) {
            this.$router.push(`/rest/course-details/${this.id}/${this.course.slug}`);
          }

          //this.checkEnquire();
        } else {
          this.course = false;
          this.noCourse = r.data.error;
        }
        this.load = false;
      });
    },
    getEmbed: function () {
      this.$axios.$get(`/rest/course/embed?url=${this.video}`).then( r => {
        if(r.data.url) {
          this.videoUrl = r.data.url;
        }
      });
    },
    checkTypeDocument: function (name) {
      if(name.indexOf('doc') >= 0) {
        return 'W'
      } else if(name.indexOf('pdf') >= 0) {
        return 'P'
      }
      return '';
    },
    showPhoneNumber: function (e) {
      if(!this.showPhone) {
        e.preventDefault();
        this.$axios.$put("/rest/leads"+this.$toQuery(this.form)).then( r => {});
        e.target.style.display = 'none';
        this.showPhone = true;
      }
    },
    getArticle: function () {
      this.$axios.$get("/rest/articles?number=3").then( r => {
        if(this.$error(r.data)) {
          this.article = r.data.data.array;
        }
      })
    },
    getArticleBySpeciality: function () {
      this.$axios.$get(`/rest/articles/speciality?course_id=${this.id}&number=3`).then( r => {
        if(this.$error(r.data)) {
          this.article = r.data.data;
        }
      })
    },    
    toRedirect: function(url, form) {      
      this.$axios.$put("/rest/leads"+this.$toQuery(form)).then( r => {});
      let params = {
        url: this.checkUrl(url),
        title: '',
        provider: ''
      };
      if(!!this.course.title) {
        params.title = this.course.title
      }
      if(!!this.course.provider) {
        params.provider =  ' | from ' + this.course.provider.name
      }
      this.$router.push({
        name: "Redirecting",
        params: params
      })
    },
    checkEnquire: function() {
      // this.isEnquire = this.course.deliveryShow;
      if(this.course.booking_url) this.isBookNow = true;
      
      for(let i = 0; i < this.course.tab_dates.length; i++ ) {
        if(this.course.tab_dates[i].startShow || this.course.tab_dates[i].booking_url) {
          this.isEnquireAdditional = true;
          break;
        }
      }
    },
  }
}