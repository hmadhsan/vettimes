import RemoteSearch from "../../components/remoteSearch";
import Loader from "../../components/loader";
import mixins from "../../config/mixins"
import store from "../../config/store"

export default {
  store,
  mixins: [ mixins.helpers ],
  components: {
    RemoteSearch,
    Loader
  },
  data: function () {
    return {
      listLoad: false,
      keywords: [],
      categoriesNumbers: [], // numbers of categories in database
      keys: {
        'speciality': 'speciality',
        'course_type' : 'course type',
        'price' : 'price',
        'location': 'location',
        'skill_level': 'skill level',
        'audience': 'job role/target audience'
      },
      category: ''
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
    })
  },
  computed: {
    goToLink: function() {
      if(this.category) this.$router.push(this.category)
    },
  },
  methods: {
    get: function() {
      this.http.get(`course/categories?count=true&list=true`).then( r => {
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
          store.commit('setCategories', r.data.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r.data['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r.data['categories_names']);
          store.commit('setSearchList', arr);
        }
      });
    },
    getCategoriesNumber: function() {
      this.http.get(`course/categories?count=true&list=false`).then( r => {
        if(r.data.status) {
          this.categoriesNumbers = r.data.count;
        }
      });
    },
    filterEmptyCats: function(cats) {
      return cats.filter(item => {
        if(this.categoriesNumbers[item.name] ) {
          return item;
        }
      })
    }
  }

}