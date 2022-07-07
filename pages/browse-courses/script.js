import RemoteSearch from "../../components/remoteSearch";
import Loader from "../../components/loader";
import mixins from "../../config/mixins"


export default {
  
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
      if (this.$store.state.mystore.searchList || this.$store.state.mystore.categories || this.$store.state.mystore.categoriesSlugsName) {
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
      
      this.$axios.$get(`/rest/course/categories?count=true&list=true`).then( r => {
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
          this.$store.commit('mystore/setCategories', r.vars);
          this.$store.commit('mystore/setCategoriesSlugsName', categoriesSlugsName);
          this.$store.commit('mystore/setCategoriesNameSlugs', categoriesNameSlugs);
          this.$store.commit('mystore/setCategoriesSlugsCatgroup', r['categories_slugs']);
          this.$store.commit('mystore/setCategoriesNamesCatgroup', r['categories_names']);
          this.$store.commit('mystore/setSearchList', arr);
        }
      });
    },
    getCategoriesNumber: function() {
      this.$axios.$get(`/rest/course/categories?count=true&list=false`).then( r => {
        
        if(r.status) {
          this.categoriesNumbers = r.count;
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