import RemoteSearch from "../../components/remoteSearch";
import Loader from "../../components/loader";
import mixins from "../../config/mixins"
import store from "../../config/store"
import TopHeading from "./top-heading"
import RightAd from "./right_ad"
import FbAd from "./fb_ad"

export default {
  store,
  mixins: [ mixins.helpers ],
  components: {
    RemoteSearch,
    Loader,
    TopHeading,
    RightAd,
    FbAd
  },
  data() {
    return {
      listLoad: false,
      keywords: [],
      categoriesNumbers: [], // numbers of categories in database
      activeName: 'first', // tabs
      loadTopCourses: false,
      page: [],
      rssLinks: [],
      cpdPlusHubs: [],
      category: '',
      coursesTotal: 0,
      articles: [],
      uploadCourseUrl: 
        ( this.$auth() && this.$auth().role === 2 )
        ? '/courseproviders/courses/new'
        : ( this.$auth() ) ? '/courseproviders/company-management' 
        : 'https://my.vettimes.co.uk/register?redirectTo=' + window.location.href + '&fromCPD=true',
      registerHere:
        'https://my.vettimes.co.uk/register?redirectTo=' + window.location.href,
      location: window.location.href,
      cpdPlusUrl: 'https://cpd.vettimes.co.uk/cpd-plus?utm_source=CPD%20Homepage&utm_medium=MPU&utm_campaign=CPDlaunch'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if(this.isEmptyObj(store.state.searchList) || this.isEmptyObj(store.state.categories) || this.isEmptyObj(store.state.categoriesSlugsName)) {
        this.get();
      } else {
        this.getCategoriesNumber();
        this.listLoad = true;
      }
      this.getCoursesHomeContent();
      // this.getContentPosition();
      this.getRss();
      this.getArticles();
      this.getCpdHubs();
    })
  },
  computed: {
    goToLink: function() {
      if(this.category) this.$router.push(this.category)
    },
    filteredCategories: function () {
      let result = {};
      const keys = {
        'speciality': 'speciality',
        'course_type' : 'course type',
        'price' : 'price',
        'location': 'location'
      };
      for(let key in store.state.categories) {
        if(key !== 'audience' && key !== 'skill_level') {
          result[keys[key]] = store.state.categories[key];
        }
      }
      return result;
    }
  },
  methods: {
    getContentPosition: function() {
      this.http.get(`pages/block?slug=courses`).then( r => {
        // console.log(r.data);
      });
    },
    get: function() {
      this.http.get(`course/categories?count=true&list=true&courses=count&_path=${this.$route.path}`).then( r => {
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(r.data.status) {
          this.categoriesNumbers = r.data.count;
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
          this.coursesTotal = r.data['courses_total'];
          store.commit('setCategories', r.data.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r.data['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r.data['categories_names']);
          store.commit('setSearchList', arr);
        }
      });
    },
    getArticles: function() {
      this.http.get("articles?homePage=true&_path=articles").then( r => {
        if(this.$error(r.data)) {
          this.articles = r.data.data.array;          
        }      
      });
    },
    getCategoriesNumber: function() {
      this.http.get(`course/categories?count=true&list=false&courses=count&_path=${this.$route.path}`).then( r => {
        if(r.data.status) {
          this.categoriesNumbers = r.data.count;
          this.coursesTotal = r.data['courses_total'];
        }
      });
    },
    filterEmptyCats: function(cats) {
      return cats.filter(item => {
        if(this.categoriesNumbers[item.name] ) {
          return item;
        }
      })
    },
    getCoursesHomeContent: function() {
      this.http.get(`pages?slug=courses`).then( r => {
        if(r.data.status) {
          this.page = r.data.block || [];          
        }
      });
    },
    getRss: function() {
      this.http.get(`pages/rss`).then( r => {
        if(r.data.status) {
          this.rssLinks = r.data.links.item.slice(0, 6);
        }
      }).catch(e => {
        console.log(e);
      });
    },
    getCpdHubs: function() {
      this.http.get(`cpd/hubs`).then( r => {
      this.cpdPlusHubs = r.data.hubs;
      //console.log(this.cpdPlusHubs);
      }).catch(e => {
        console.log(e);
      });
    },
    courseProcess: function (course_id, type) {
      if(store.state.auth && [1,4].indexOf(store.state.auth.role) >= 0) {
        let action = 'addCourse';
        if(!type) {
          action = 'deleteCourse';
        }

        this.http.post(`usercourses?_path=${this.$route.path}`, {  action: action ,course_id: course_id }).then( r => {
          store.commit({
            type: 'changeStars',
            stars: r.data.data
          });
          this.$error(r.data);
        }).catch((e) => {
          console.log(e);
        });
      }
      return false;
    },
    checkAuth: function () {
      let auth = store.state.auth;
      if(auth) {
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}
