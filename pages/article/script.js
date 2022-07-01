import { error, scrollToTop } from "~/config/globalFunctions";
import NF from "../404";

export default {
  components: { NF },
  data() {
    this.get();
    return {
      page: null,
      search: "",
      options: [],
      list: [],
      loading: false
    }
  },
  methods: {
    getCategories: function() {
      this.$axios.$get(`/rest/course/categories?count=false&list=true`).then( r => {
        if(r.status) {
          for (let key in r.vars) {
            if(key === 'speciality') {
              r.vars[key].forEach(item => {
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
    get() {
      this.$axios.$get("/rest/article?id="+this.$route.params.id + "&_path=" + this.$route.path).then( r => {
        if ( error(r) ) {
          this.page = r.data || false;
        }
      });
    },
    key() {
      this.$router.push("/articles?keyword="+this.search);
    },
  },
  created() {
    scrollToTop();
    this.getCategories();
  }
}
