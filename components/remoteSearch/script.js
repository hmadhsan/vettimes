import mixins from "../../config/mixins"


export default {
  
  props:['setKeywords', 'catList', 'categoriesObj', 'catsSlugsName', 'keywords', 'pagePosition'],
  mixins: [ mixins.helpers ],
  data() {
    return {
      options: [],
      list: this.$props.catList,
      value: this.$props.keywords, // need for mixins
      loading: false,
      stageLoad: false
    }
  },
  mounted() {
    this.checkRoutes();
  },
  watch: {
    'value': 'addValueToParentAfterLoad'
  },
  methods: {
    addValueToParentAfterLoad: function () {
      if(!this.stageLoad ) {
        this.$emit('setKeywords', this.value);
        this.stageLoad = true
      }
    },
    checkProviderInSearch: function() {
      for (let i = 0; i < this.value.length; i++) {
        if(this.value[i]!==null) {
          if (this.value[i].indexOf('Provider') >= 0)  {
            return true;
          }
        }        
      }

      return false;
    },
    addValueToParent: function (e) {
      e.preventDefault();
      this.$emit('setKeywords', this.value);

      if(!this.checkProviderInSearch()) {
        this.$parent.pid = '';
      }
      this.stageLoad = true;

      this.$parent.typeSort = '';
      if(this.value.length === 0) {
        this.$router.push(`/courses/`);
      }
      if(!!this.$props.pagePosition) {
        this.goToCoursesPage();
      }
    },
    remoteMethod: function (query) {
      if (query !== '') {
        this.loading = false;
        this.options = this.list.filter(item => {
          return item.label.toLowerCase()
          .indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.options = [];
      }
    },
    goToCoursesPage: function() {
      let searchWords = {
        audience: [],
        course_type: [],
        location: [],
        price: [],
        skill_level: [],
        speciality: [],
        keywords: []
      };
      this.value.forEach(item => {
        if(item!=null){
          if(store.state.categoriesSlugsCatgroup[item]) {
            searchWords[store.state.categoriesSlugsCatgroup[item]].push(item);
          } else {
            searchWords['keywords'].push(item);
          }
        }        
      });
      this.createSearchRoute(searchWords);
    }
  }
}