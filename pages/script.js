import RemoteSearch from "../components/remoteSearch";
import Loader from "../components/loader";
import mixins from "../config/mixins"
import store from "../config/store"
import TopHeading from "./top-heading"
import RightAd from "./right_ad"
import FbAd from "./fb_ad"
import Axios from "axios";
// import router from "~/config/routes";

export default {
  store,
  mixins: [mixins.helpers],
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
      uploadCourseUrl: (store.auth) ?
        '/courseproviders/courses/new' :
        (store.auth) ? '/courseproviders/company-management' :
        'https://my.vettimes.co.uk/register?redirectTo=' + `${cpdBaseUrl}` + '&fromCPD=true',
      registerHere: 'https://my.vettimes.co.uk/register?redirectTo=' + `${cpdBaseUrl}`,
      location: `${cpdBaseUrl}`,
      cpdPlusUrl: 'https://cpd.vettimes.co.uk/cpd-plus?utm_source=CPD%20Homepage&utm_medium=MPU&utm_campaign=CPDlaunch'
    }
  },
  mounted(){
    this.$axios.get("/rest/auth").then(res => {
      store.commit( "auth", ( !res.data || !res.data || !res.data.id ) ? false : res.data );
      this.access(this.$route);
    }).catch( () => {
      store.commit("auth");
      this.access(this.$route);
    });
  },
  created() {
    this.$nextTick(function () {
      if (store.state.searchList || store.state.categories || store.state.categoriesSlugsName) {
        this.get();
      } else {
        this.getCategoriesNumber();
        this.listLoad = true;
     
      }
      this.getCoursesHomeContent();
      this.getRss();
      this.getCpdHubs();
      this.getArticles();
    })
  },
  computed: {
    goToLink: async function () {
      if (this.category) await this.$router.push(this.category)
    },
    filteredCategories:  function () {
  
      let result = {};
      const keys = {
        'speciality': 'speciality',
        'course_type': 'course type',
        'price': 'price',
        'location': 'location'
      };
   
      for (let key in store.state.categories) {
        if (key !== 'audience' && key !== 'skill_level') {
          result[keys[key]] = store.state.categories[key];
        }
      }
      return result;

    }
  },

  methods: {
    access(to) {
      let auth = store.state.auth;
      if (auth === null) return false;
    
      const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
      if(!!to.meta.auth) {
        if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0) {
          return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
        }
      }
      document.title = to.name;
      return true;
    },
    getContentPosition: async function () {
    await this.$axios.$get(`/rest/pages/block?slug=courses`).then(r => {
        // console.log(r);
      });
    },
    get: async function () {
    //  this.coursesTotal = 32;
       await this.$axios.$get(`/rest/course/categories?count=true&list=true&courses=count&_path=/`).then((r) => {   
        
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if (r.status) {
          this.categoriesNumbers = r.count;
          for (let key in r.vars) {
            if (key !== 'cpd_hours') {
              r.vars[key].forEach(item => {
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
          this.coursesTotal = r.courses_total;
          store.commit('setCategories', r.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r['categories_names']);
          store.commit('setSearchList', arr);
        }
      })


    },
    getArticles: async function () {
      await this.$axios.$get("/rest/articles?homePage=true&_path=articles").then(r => {
        console.log(r)
        if (r) {
          this.articles = r.array;
        }
      });
    },
    getCategoriesNumber: async function () {
    await  this.$axios.$get(`/rest/course/categories?count=true&list=false&courses=count&_path=${this.$route.path}`).then(r => {
        if (r.status) {
          this.categoriesNumbers = r.count;
          this.coursesTotal = r['courses_total'];
        }
      });
    },
    filterEmptyCats: function (cats) {
      return cats.filter(item => {
        if (this.categoriesNumbers[item.name]) {
          return item;
        }
      })
    },
    getCoursesHomeContent: async function () {
    await this.$axios.$get(`/rest/pages?slug=courses`).then(r => {
        if (r.status) {
          this.page = r.block || [];
        }
      });
    },
    getRss: async function () {
     await this.$axios.$get(`/rest/pages/rss`).then(r => {
        if (r.status) {
          this.rssLinks = r.links.item.slice(0, 6);
        }
      }).catch(e => {
        console.log(e);
      });
    },
    getCpdHubs: async function () {
    await this.$axios.$get(`/rest/cpd/hubs`).then(r => {

        this.cpdPlusHubs = r.hubs;
    
      }).catch(e => {
        console.log(e);
      });
    },
    courseProcess:  function (course_id, type) {
      if (store.state.auth && [1, 4].indexOf(store.state.auth.role) >= 0) {
        let action = 'addCourse';
        if (!type) {
          action = 'deleteCourse';
        }

        this.$axios.$post(`/rest/usercourses?_path=${this.$route.path}`, {
          action: action,
          course_id: course_id
        }).then(r => {
          store.commit({
            type: 'changeStars',
            stars: r
          });
          this.$error(r);
        }).catch((e) => {
          console.log(e);
        });
      }
      return false;
    },
    checkAuth: function () {
      let auth = store.state.auth;
      if (auth) {
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}
