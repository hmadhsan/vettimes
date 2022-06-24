import EnquireEmail from "../../components/enquire-email"
import CourseEmail from "../../components/course-email"
import CourseAlert from "../../components/course-alert"
import mixins from "../../config/mixins"
import CoursesList from "../../components/courses-list"
import Loader from "../../components/loader"

import RemoteSearch from "../../components/remoteSearch";
import MessageInfo from "../../components/message-info";

export default {
  
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
      if(this.isEmptyObj(this.$store.state.mystore.searchList) || this.isEmptyObj(this.$store.state.mystore.categories) || this.isEmptyObj(this.$store.state.mystore.categoriesSlugsName)) {
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
      this.http.get(`course/categories?count=false&list=true`).then( r => {
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
          this.$store.commit('mystore/setCategories', r.data.vars);
          this.$store.commit('mystore/setCategoriesSlugsName', categoriesSlugsName);
          this.$store.commit('mystore/setCategoriesNameSlugs', categoriesNameSlugs);
          this.$store.commit('mystore/setCategoriesSlugsCatgroup', r.data['categories_slugs']);
          this.$store.commit('mystore/setCategoriesNamesCatgroup', r.data['categories_names']);
          this.$store.commit('mystore/setSearchList', arr);
        }
      });
    },
    get: function () {
      let query = '';
      if(this.$route.query.preview) {
        query = `&preview=${this.$route.query.preview}`
      }
      this.http.get(`course?id=${this.id}${query}&_path=${this.$route.path}`).then( r => {
        if ( this.$error(r.data) ) {
          this.course = r.data.data;
          this.form.course_id = this.course.id;
          this.web_form.course_id = this.course.id;
          this.book_form.course_id = this.course.id;
          this.view_form.course_id = this.course.id;
          this.http.put("leads"+this.$toQuery(this.view_form)).then( r => {});
          this.noCourse = true;
          if(r.data.data.video) {
            this.video = r.data.data.video
          }

          if(this.course.status === 2) {
            this.dataUpdateSuccess = 'Preview only, this course is not active';
          }

          if(this.course.slug.indexOf(this.slug) < 0) {
            this.$router.push(`/course-details/${this.id}/${this.course.slug}`);
          }

          this.checkEnquire();
        } else {
          this.course = false;
          this.noCourse = r.data.error;
        }
        this.load = false;
      });
    },
    getEmbed: function () {
      this.http.get(`course/embed?url=${this.video}`).then( r => {
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
        this.http.put("leads"+this.$toQuery(this.form)).then( r => {});
        e.target.style.display = 'none';
        this.showPhone = true;
      }
    },
    getArticle: function () {
      this.http.get("articles?number=3").then( r => {
        if(this.$error(r.data)) {
          this.article = r.data.data.array;
        }
      })
    },
    getArticleBySpeciality: function () {
      this.http.get(`articles/speciality?course_id=${this.id}&number=3`).then( r => {
        if(this.$error(r.data)) {
          this.article = r.data.data;
        }
      })
    },    
    toRedirect: function(url, form) {      
      this.http.put("leads"+this.$toQuery(form)).then( r => {});
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