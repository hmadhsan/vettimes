import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    stars: [],
    base: process.env.BASE_URL,
    load: 0,
    enquireEmailDialog: false,
    courseEmailDialog: false,
    courseAlertDialog: false,
    url: '',
    searchList: [], // list of cats for RemoteSearch
    categories: {}, // categories from database, RemoteSearch, courses, course-providers
    categoriesSlugsName: {}, // need for mixin, RemoteSearch, courses, course-providers,
    categoriesNameSlugs: {}, // need for mixin, RemoteSearch, courses, course-providers,
    categoriesSlugsCatgroup: {},
    categoriesNamesCatgroup: {},
    credits: []
  },
  mutations: {
    auth(state, value = false) {
      state.auth = typeof value === "object" ? value : false;
    },
    load(state, value) {
      state.load += value === 1 ? 1 : -1;
      if (state.load < 0) state.load = 0;
    },
    changeStars(state, payload) {
      state.stars = payload.stars
    },
    changeEnquireEmailDialog(state, payload) {
      state.enquireEmailDialog = payload.dialog
    },
    changeCourseEmailDialog(state, payload) {
      state.url = payload.url;
      state.courseEmailDialog = payload.dialog;      
    },
    changeCourseAlertDialog(state, payload) {
      state.url = payload.url;
      state.courseAlertDialog = payload.dialog;      
    },
    setCategories(state, payload) {
      state.categories = { ...state.categories, ...payload };
    },
    setSearchList(state, payload) {
      state.searchList = payload;
    },
    setCategoriesSlugsName(state, payload) {
      state.categoriesSlugsName = { ...state.categoriesSlugsName, ...payload };
    },
    setCategoriesNameSlugs(state, payload) {
      state.categoriesNameSlugs = { ...state.categoriesNameSlugs, ...payload };
    },
    setCategoriesSlugsCatgroup(state, payload) {
      state.categoriesSlugsCatgroup = { ...state.categoriesSlugsCatgroup, ...payload };
    },
    setCategoriesNamesCatgroup(state, payload) {
      state.categoriesNamesCatgroup = { ...state.categoriesNamesCatgroup, ...payload };
    },
    setCredits(state, payload) {
      state.credits = payload;
    },
    googleAnalyticsTagManager() {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WF7H2LP');
    }
  },
  actions: {}
});
