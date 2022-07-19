import Loader from "../../components/loader";
import Provider from "../../components/provider-preview";


export default {
  
  components: {
    Loader,
    Provider
  },
  data() {
    return {
      providers: {
        array: [],
        total: 0
      },
      noData: false,
      loadingProviders: true,
      page: this.$route.query.page ? this.$route.query.page : 1,
      options: [],
      value: [],
      list: [],
      loading: false
    }
  },
  async fetch(){
    await this.$axios.$get(`/rest/providers?q=&name=${this.value}&page=${this.$route.query.page ? this.$route.query.page : 1}&_path=${this.$route.path}`).then( r => {
        this.noData = false;
        this.providers = r;
        this.loadingProviders = false;
    });
  },
  watch: {
    'value': 'get'
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getSearchList();
      if(!!this.$route.query.q) {
        this.getKeywords();
      }
    })
  },
  methods: {
    getKeywords: function () {
        this.value = this.$route.query.q.replace('+', ' ');
    },
    get: function () {
      this.loadingProviders = true;
      if(!this.value) {
        this.value = '';
      }
      this.$axios.$get(`/rest/providers?name=${this.value}&page=${this.$route.query.page ? this.$route.query.page : 1}&_path=${this.$route.path}`).then( r => {
        if(r.total === 1) {
          this.$router.push(`/provider-details/${r.array[0].id}/${r.array[0].slug}`);
        } else if(r.total > 1) {
          this.noData = false;
          this.providers = r;
          // this.$router.push(`/providers?q=${this.value.replace(' ', '+')}`);
        } else {
          this.noData = true;
          this.$router.push(`/providers`);
        }
        this.loadingProviders = false;
        this.$route.query.page ? window.scroll(0, 0) : null;
      });
    },
    searchProvider: function (e) {
      e.preventDefault();
      this.get();
    },
    getSearchList: function () {
      this.$axios.$get(`/rest/providers/names`).then( r => {
        if(r) {
          this.list = r.map(item => {
            return { value: item.name, label: item.name };
          });
        }
      });
    },
    goToPage: function (page) {

      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.$router.replace({query: {...this.$route.query, page: page}})

      setTimeout(()=>{
        process.browser ? window.location.reload() : null
      },500)
    },
    remoteMethod: function(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
}