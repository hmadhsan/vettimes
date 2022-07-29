import RemoteSearch from "../../components/remoteSearch";
import Loader from "../../components/loader";
import Rolling from "../../components/rolling";
import mixins from "../../config/mixins";
import CoursePreview from "../../components/course-preview";
import Provider from "../../components/provider-preview";
import EmailMeCourses from "../../components/email-me-courses";
import HiddenLinks from '../../components/hidden-links'

export default {
  mixins: [ mixins.helpers ],
  components: {
    RemoteSearch,
    Loader,
    Rolling,
    CoursePreview,
    Provider,
    EmailMeCourses,
    HiddenLinks
  },
  data() {
    return {
      categoriesKeywords:[],
      sortType: '', // sort courses
      pid: '', // search provider id
      keywords: [],//search words in RemoteSearch and this template
      categoriesNumbers: [], // numbers of categories in database
      coursesSearchNumber: [],
      listLoad: false,
      dialogTableVisible: false, // loader for popup for choose categories
      categoryDialog: false, // head for category group
      searchCoursesLoad: false, // what we search in database now
      courses: {
        array: [],
        seo: [],
        total: 0
      },
      page: 1,
      provider: {
        logo_data: ''
      },
      loader: false,
      searchWords: {
        audience: [],
        course_type: [],
        location: [],
        price: [],
        skill_level: [],
        speciality: [],
        keywords: []
      },
      findCourses: [], // array for concat in template
      categoriesKeys: {
        'speciality': 'speciality',
        'course_type' : 'course type',
        'price' : 'price',
        'location': 'location',
        'audience': 'audience',
        'skill_level': 'skill level'
      },
      modelCategories: {
        'speciality': '',
        'course_type': '',
        'audience': '',
        'skill_level': '',
        'price': '',
        'location': ''
      },
      providers: {
        array: [],
        total: 0
      },
      noData: false,
      providersPage: 1,
      popoverVisible: false,
      sponsorship: false,
      sponsorshipHtml: '',
    }
  },
  watch: {
    'keywords': 'searchCourses',
  },
  async fetch(){
    let c = this.$route.query.page;
    await this.$axios.$post(`/rest/courses/search?_position=courses&_path=${this.$route.path}`, {
      typeSearch: this.keywords.length,
      page: c ? c : 1,
      speciality: this.searchWords['speciality'].join('|'),
      audience: this.searchWords['audience'].join('|'),
      course_type: this.searchWords['course_type'].join('|'),
      location: this.searchWords['location'].join('|'),
      price: this.searchWords['price'].join('|'),
      skill_level: this.searchWords['skill_level'].join('|'),
      kw: this.searchWords['keywords'].join('|'),
      sortBy: this.sortType,
      pid: this.pid,
      isProviders: this.$attrs.providers,
      providersPage: this.providersPage
    })
    .then( r => {
      
      if ( r.total > 0 ) {
        this.courses.total = r.total;
        this.courses.array = r.array;
        this.courses.seo = r.seoData;
        this.categoriesNumbers = r.filter;
        this.providers.total = r.providers_total;
        this.providers.array = r.providers.array;
      } else {
        this.courses.total = 0;
        this.courses.array = [];
        this.categoriesNumbers = [];
        this.providers.total = 0;
        this.providers.array = [];
      }
      this.searchCoursesLoad = false;
      this.loader = true;
    });

    await this.$axios.$get(`/rest/course/categories?count=false&_position=courses`).then( r => {
        
      let arr = [];
      let categories = {};
      let categoriesSlugsName = {};
      let categoriesNameSlugs = {};
      if(r.status) {
        categories = r.vars;
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
        this.loadingProviders = true;

        for(const [key, value] of Object.entries(categories)){
          value.forEach((obj)=>{
            this.categoriesKeywords.push(obj.name)
          })
        }
      }
    });
  },
  mounted: function () {
    this.$nextTick(function () {
      if(this.isEmptyObj(this.$store.state.mystore.searchList) || this.isEmptyObj(this.$store.state.mystore.categories) || this.isEmptyObj(this.$store.state.mystore.categoriesSlugsName)) {
        this.get();
      } else {
        this.listLoad = true;
      }
    })
  },
  created: function() {
    process.browser ? window.addEventListener('resize', this.onResize) : null;
  },
  methods: {
    scrollToElement (id) {
      let elem;
      process.browser ? elem = document.getElementById(id) : null;
      let coords = elem.getBoundingClientRect();
    
      process.browser ? window.scrollTo(0, coords.top + pageYOffset) :null;
    
    },
    isEmptyObj (obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    },
    addNewKeyword: function(value) {
      this.keywords.push(value);
      let block = process.browser ? document.getElementById('filterBar') : null ;
      block.style.display = '';
    },
    onResize() {
      if(process.browser ? document.getElementById('filterBar') : false) {
        process.browser ? document.getElementById('filterBar').style.display = '' : null ;
      }
    },
    showFilterBar: function() {
      let block = process.browser ? document.getElementById('filterBar') : null ;
      block.style.display = block.style.display === 'block' ? '': 'block';
    },
    setKeywords: function (data) {
      this.page = 1;
      this.keywords = data;
    },
    filterEmptyCats: function(cats, catHeading) {
      let result = cats.filter(item => {
        if(['speciality','audience','skill_level'].indexOf(catHeading) >= 0 && this.searchWords[catHeading].length > 0) {
          if(this.categoriesNumbers[item.name] && this.searchWords[catHeading].indexOf(this.categoriesNumbers[item.name])) {
            return item;
          }
        } else {
          if(this.categoriesNumbers[item.name] ) {
            return item;
          }
        }
      });

      if(['speciality','audience','skill_level','location'].indexOf(catHeading) >= 0 && this.searchWords[catHeading].length > 0) {
        return result
      }

      return result.slice(0, 10)

    },
    filterAllEmptyCats: function(cats, catHeading) {
      return cats.filter(item => {
        if(['speciality','audience','skill_level'].indexOf(catHeading) >= 0 && this.searchWords[catHeading].length > 0) {
          if(this.categoriesNumbers[item.name] && this.searchWords[catHeading].indexOf(this.categoriesNumbers[item.name])) {
            return item;
          }
        } else {
          if(this.categoriesNumbers[item.name] ) {
            return item;
          }
        }
      });
    },
    filterPopupEmptyCats: function(cats) {
      return cats.filter(item => {
        if(this.categoriesNumbers[item.name] ) {
          return item;
        }
      })
    },
    get: function() {
      this.$axios.$get(`/rest/course/categories?count=false&_position=courses`).then( r => {
        
        let arr = [];
        let categories = {};
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(r.status) {
          categories = r.vars;
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
          this.loadingProviders = true;
          this.$store.commit('mystore/setCategories', categories);
          this.$store.commit('mystore/setCategoriesSlugsName', categoriesSlugsName);
          this.$store.commit('mystore/setCategoriesNameSlugs', categoriesNameSlugs);
          this.$store.commit('mystore/setCategoriesSlugsCatgroup', r['categories_slugs']);
          this.$store.commit('mystore/setCategoriesNamesCatgroup', r['categories_names']);
          this.$store.commit('mystore/setSearchList', arr);
        }
      });
    },
    searchCourses: async function () {
      console.log('199')
      this.loader = false;
      this.clickToCourse = false;
      
      if(this.keywords.length > 0) {
        this.searchWords = this.keywordIsCategory(this.keywords, this.$store.state.mystore.categories);
      } else {
        this.searchWords = this.findCategories(this.keywords, this.$store.state.mystore.categories);
      }

      let query_str = '';

      this.$axios.$post(`/rest/courses/search?_position=courses&_path=${this.$route.path}`, {
        typeSearch: this.keywords.length,
        page: this.$route.query.page ? this.$route.query.page : this.page,
        speciality: this.searchWords['speciality'].join('|'),
        audience: this.searchWords['audience'].join('|'),
        course_type: this.searchWords['course_type'].join('|'),
        location: this.searchWords['location'].join('|'),
        price: this.searchWords['price'].join('|'),
        skill_level: this.searchWords['skill_level'].join('|'),
        kw: this.searchWords['keywords'].join('|'),
        sortBy: this.sortType,
        pid: this.pid,
        isProviders: this.$attrs.providers,
        providersPage: this.providersPage
      })
      .then( r => {
        if ( r.total > 0 ) {
          this.courses.total = r.total;
          this.courses.array = r.array;
          this.courses.seo = r.seoData;
          this.categoriesNumbers = r.filter;
          this.providers.total = r.providers_total;
          this.providers.array = r.providers.array;
        } else {
          this.courses.total = 0;
          this.courses.array = [];
          this.categoriesNumbers = [];
          this.providers.total = 0;
          this.providers.array = [];
        }
        this.searchCoursesLoad = false;
        this.loader = true;
      });
      
      if(this.keywords.length === 1) this.sponsorShip();

      this.clearModelCategories();
    },
    categoryDialogClose(done) {
      setTimeout(function() {
        this.categoryDialog = false;
      }, 400);
      done();
    },
    clearModelCategories: function() {
      for (let keyCat in this.modelCategories) {
        this.modelCategories[keyCat] = '';
      }
      if(this.keywords.length > 0) {
        this.keywords.forEach(item => {
          this.modelCategories[this.$store.state.mystore.categoriesNamesCatgroup[item]] = item;
        })
      }
      let block;
      process.browser ? (block =  document.getElementById('filterBar')) : null ;
      block.style.display = '';
    },
    handleNewSearchItem: function (e) { //add new cat to search
      e.preventDefault();
      this.page = 1;
      let keyword = e.target.getAttribute('data-cat');
      if(this.keywords.indexOf(keyword) < 0 ) {
        this.searchCoursesLoad = keyword;
        this.keywords.push(keyword);
      }
      this.dialogTableVisible = false;
      this.scrollToElement('search-block');
    },
    handleDeleteSearchItem: function (e) { // delete cat from search
      let keyword = e.target.closest('div').firstChild.getAttribute('data-cat');
      let keywordGroup = e.target.closest('div').firstChild.getAttribute('data-key');
      let startPos = this.keywords.indexOf(keyword);
      if( startPos >= 0 ) {
        this.keywords.splice(startPos, 1);
      }
      startPos = this.searchWords[keywordGroup].indexOf(this.$store.state.mystore.categoriesSlugsName[keyword]);
      if(startPos >= 0) {
        this.searchWords[keywordGroup].splice(startPos, 1);
      }
      console.log('289')
      this.searchCourses();
      if(this.keywords.length === 0) {
        this.$router.push(`/courses/`);
      }
      this.scrollToElement('search-block');
    },
    specialitySearchNow: function (key, cat) { // filter speciality group cats for view after search
      let searchWords = this.findCategories(this.keywords, this.$store.state.mystore.categories);
      if(['speciality','audience','skill_level'].indexOf(key) >= 0  && searchWords[key].length > 0) {
         return searchWords[key].indexOf(cat) >= 0;
      }
      return true;
    },
    goToPage: function (page) {
      this.page = page;
      console.log('305')
      this.searchCourses();//Q
      this.scrollToElement('search-block');
    },
    goToProvidersPage: function (page) {
      this.providersPage = page;
      console.log('311')
      this.searchCourses();
      this.scrollToElement('search-block');
    },
    sortCourses: function () {
      console.log('316')
      this.searchCourses();
    },
    selectedOption: function(type) {
      return this.sortType === type;
    },
    tabListener: function() {
      this.page = 1;
      this.providersPage = 1;
      console.log('325')
      this.searchCourses();
    },
    sponsorShip: function() {
      this.resetSponsorShip();
      this.$axios.$post(`/rest/course/sponsorship`, {
        path: this.$route.path
      }).then( r => {
        if(r.status && r.data != 'noup') {
          this.sponsorship = true;
          this.sponsorshipHtml = r.data;
        }
      });
      
    },
    resetSponsorShip: function() {
      this.sponsorship = false;
      this.sponsorshipHtml = '';
    },
    findSponsorship(word) {
      if(this.keywords.length === 0 || word === null || word === '' || !word) return false;
      let words = this.keywords.map(item => item.toLowerCase());
      if(words.indexOf(word.toLowerCase()) >= 0) return true;
    }    
  }
}