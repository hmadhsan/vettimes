import RemoteSearch from "../components/remoteSearch";
import Loader from "../components/loader";
import mixins from "../config/mixins"

import TopHeading from "./top-heading"
import RightAd from "./right_ad"
import FbAd from "./fb_ad"
// import Axios from "axios";
import { cpdBaseUrl } from "~/config/constants";
// import router from "~/config/routes";
export default {
  
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
      cpdBaseUrl,
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
      uploadCourseUrl: (this.$store.state.mystore.auth) ?
        '/courseproviders/courses/new' :
        (this.$store.auth) ? '/courseproviders/company-management' :
        'https://my.vettimes.co.uk/register?redirectTo=' + `${cpdBaseUrl}` + '&fromCPD=true',
      registerHere: 'https://my.vettimes.co.uk/register?redirectTo=' + `${cpdBaseUrl}`,
      location: `${cpdBaseUrl}`,
      cpdPlusUrl: 'https://cpd.vettimes.co.uk/cpd-plus?utm_source=CPD%20Homepage&utm_medium=MPU&utm_campaign=CPDlaunch'
    }
  },
  mounted(){

    // this.$axios.get("/rest/auth").then(res => {
    //   this.$store.commit( "mystore/auth", ( !res.data || !res.data || !res.data.id ) ? false : res.data );
    //   this.access(this.$route);
    // }).catch( () => {
    //   this.$store.commit("mystore/auth");
    //   this.access(this.$route);
    // });

    
  }
  ,
  created() {
    this.facebookInit()
    this.$nextTick(function () {
      if (this.$store.state.mystore.searchList || this.$store.state.mystore.categories || this.$store.state.mystore.categoriesSlugsName) {
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
   
      for (let key in this.$store.state.mystore.categories) {
        if (key !== 'audience' && key !== 'skill_level') {
          result[keys[key]] = this.$store.state.mystore.categories[key];
        }
      }
      return result;

    }
  },

  methods: {
    facebookInit() {
      
     
      process.browser ?
      window.fbAsyncInit = function () {
     
        FB.init({ appId: '558179724973146', cookie: true, xfbml: true, oauth: true });
    
        // *** here is my code ***
        if (typeof facebookInit == 'function') {
            facebookInit();
        }
    }:null;
    process.browser ?
    (function(d){
        var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        d.getElementsByTagName('head')[0].appendChild(js);
    }(document)) : null;


   },
    access(to) {
      let auth = this.$store.state.mystore.auth;
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
          this.$store.commit('mystore/setCategories', r.vars);
          this.$store.commit('mystore/setCategoriesSlugsName', categoriesSlugsName);
          this.$store.commit('mystore/setCategoriesNameSlugs', categoriesNameSlugs);
          this.$store.commit('mystore/setCategoriesSlugsCatgroup', r['categories_slugs']);
          this.$store.commit('mystore/setCategoriesNamesCatgroup', r['categories_names']);
          this.$store.commit('mystore/setSearchList', arr);
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
      
      if (this.$store.state.mystore.auth && [1, 4].indexOf(this.$store.state.mystore.auth.role) >= 0) {
        let action = 'addCourse';
        if (!type) {
          action = 'deleteCourse';
        }

        this.$axios.$post(`/rest/usercourses?_path=${this.$route.path}`, {
          action: action,
          course_id: course_id
        }).then(r => {
          this.$store.commit({
            type: 'mystore/changeStars',
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
      debugger;
      let auth = this.$store.state.mystore.auth;
      if(auth) {
        let a = !!auth.role && [1, 4].indexOf(auth.role) === -1
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}
