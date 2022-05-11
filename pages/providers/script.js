import Loader from "../../components/loader";
import Provider from "../../components/provider-preview";
import store from "../../config/store";

export default {
  store,
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
      page: 1,
      options: [],
      value: [],
      list: [],
      loading: false
    }
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
      this.http.get(`providers?name=${this.value}&page=${this.page}&_path=${this.$route.path}`).then( r => {
        if(r.data.total === 1) {
          this.$router.push(`/provider-details/${r.data.array[0].id}/${r.data.array[0].slug}`);
        } else if(r.data.total > 1) {
          this.noData = false;
          this.providers = r.data;
          this.$router.push(`/providers?q=${this.value.replace(' ', '+')}`);
        } else {
          this.noData = true;
          this.$router.push(`/providers`);
        }
        this.loadingProviders = false;
      });
    },
    searchProvider: function (e) {
      e.preventDefault();
      this.get();
    },
    getSearchList: function () {
      this.http.get(`providers/names`).then( r => {
        if(r.data) {
          this.list = r.data.map(item => {
            return { value: item.name, label: item.name };
          });
        }
      });
    },
    goToPage: function (page) {
      this.page = page;
      this.get();
      this.$scrollToTop();
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