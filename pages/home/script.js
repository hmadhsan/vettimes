import RemoteSearch from "../../components/remoteSearch";
import Loader from "../../components/loader";
import mixins from "../../config/mixins"

import TopHeading from "./top-heading"
import RightAd from "./right_ad"
import FbAd from "./fb_ad"
import { cpdBaseUrl } from "~/config/constants";

export default {

  
  mixins: [ mixins.helpers ],
  components: {
    RemoteSearch,
    Loader,
    TopHeading,
    RightAd,
    FbAd
  },
  data() {
console.log('first')
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
    
       
        ( this.$store.state.mystore.auth  ) 
        ? '/courseproviders/courses/new'
        : ( this.$store.state.mystore.auth ) ? '/courseproviders/company-management' 
        : 'https://my.vettimes.co.uk/register?redirectTo=' + cpdBaseUrl + '&fromCPD=true',
      registerHere:
        'https://my.vettimes.co.uk/register?redirectTo=' + cpdBaseUrl,
      location: cpdBaseUrl,
      cpdPlusUrl: 'https://cpd.vettimes.co.uk/cpd-plus?utm_source=CPD%20Homepage&utm_medium=MPU&utm_campaign=CPDlaunch'
    }
  },

  mounted  : function () {
    this.$nextTick(function () {
      console.log('mounted')
      if(this.isEmptyObj(this.$store.state.mystore.searchList) || this.isEmptyObj(this.$store.state.mystore.categories) || this.isEmptyObj(this.$store.state.mystore.categoriesSlugsName)) {
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
      this.$axios.$get(`/rest/pages/block?slug=courses`).then( r => {
        // console.log(r.data);
      });
    },
    get: async function() {
      console.log('mounted')
     await this.$axios.$get(`/rest/course/categories?count=true&list=true&courses=count&_path=${this.$route.path}`).then( r => {     
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(r.status) {
          this.categoriesNumbers = r.count;
          for (let key in r.vars) {
            if(key !== 'cpd_hours') {
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
          this.coursesTotal = r['courses_total'];
          this.$store.commit('mystore/setCategories', r.vars);
          this.$store.commit('mystore/setCategoriesSlugsName', categoriesSlugsName);
          this.$store.commit('mystore/setCategoriesNameSlugs', categoriesNameSlugs);
          this.$store.commit('mystore/setCategoriesSlugsCatgroup', r['categories_slugs']);
          this.$store.commit('mystore/setCategoriesNamesCatgroup', r['categories_names']);
          this.$store.commit('mystore/setSearchList', arr);
        }
      });
    },
    getArticles: function() {
      console.log('mounted')
      this.$axios.$get("/rest/articles?homePage=true&_path=articles").then( r => {
        if(r) {
          this.articles = r.array;          
        }      
      });
    },
    getCategoriesNumber: function() {
      this.$axios.$get(`/rest/course/categories?count=true&list=false&courses=count&_path=${this.$route.path}`).then( r => {
        if(r.status) {
          this.categoriesNumbers = r.count;
          this.coursesTotal = r['courses_total'];
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
      this.$axios.$get(`/rest/pages?slug=courses`).then( r => {
        if(r.status) {
          this.page = r.block || [];          
        }
      });
    },
    getRss: function() { 
      this.$axios.$get(`pages/rss`).then( r => {
        if(r.status) {
          this.rssLinks = r.links.item.slice(0, 6);
        }
      }).catch(e => {
        console.log(e);
      });
    },
    getCpdHubs: function() {
      this.$axios.$get(`/rest/cpd/hubs`).then( r => {
      this.cpdPlusHubs = r.hubs;
      //console.log(this.cpdPlusHubs);
      }).catch(e => {
        console.log(e);
      });
    },
    courseProcess: function (course_id, type) {
      if(this.$store.state.mystore.auth && [1,4].indexOf(this.$store.state.mystore.auth.role) >= 0) {
        let action = 'addCourse';
        if(!type) {
          action = 'deleteCourse';
        }

        this.$axios.$post(`/rest/usercourses?_path=${this.$route.path}`, {  action: action ,course_id: course_id }).then( r => {
          this.$store.commit({
            type: 'changeStars',
            stars: r.data
          });
          this.$error(r.data);
        }).catch((e) => {
          console.log(e);
        });
      }
      return false;
    },
    checkAuth: function () {
      let auth = this.$store.state.mystore.auth;
      if(auth) {
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}
