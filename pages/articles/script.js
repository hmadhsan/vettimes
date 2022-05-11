import Loader from "../../components/loader"

export default {
  components: {
    Loader
  },
  data() {
    return {
      array: [],
      total: 0,
      search: "",
      page: 1,
      options: [],
      list: [],
      loading: false,
      loadArticles: false
    }
  },
  methods: {
    getCategories: function() {
      this.http.get(`course/categories?count=false&list=true`).then( r => {
        if(r.data.status) {
          for (let key in r.data.vars) {
            if(key === 'speciality') {
              r.data.vars[key].forEach(item => {
                this.list.push({
                  'value': item.name,
                  'label': item.name
                });
              })
            }
          }
        }
      });
    },
    get() {
      if(this.search === null) {
        this.search = "";
      }
      this.http.get("articles?keyword="+this.search + '&page=' + this.page + '&_path=' + this.$route.path).then( r => {
        if(this.$error(r.data)) {
          this.array = r.data.data.array;
          this.total = r.data.data.total;
        }
        this.loadArticles = true;
      })
    },
    key() {
      this.$router.push("/articles?keyword="+this.search);
    },
    img(val) {
      if ( !val ) return null;
      return `url(${val.url})`;
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
    },
    goToPage: function (page) {
      this.page = page;
      this.get()
    },
  },
  created() {
    this.getCategories();
    let search = location.search.substr(1).split("&");
    if ( search && search[0] ) {
      search.forEach(item => {
        let key = item.split("=");
        if ( key[0] === "keyword" ) this.search = key[1];
      });
    }
    this.get();
  }
}
