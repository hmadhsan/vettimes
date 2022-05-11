import ProvidersOnly from "../../components/providers-only";
import Loader from "../../components/loader";

export default {
  components: {
    ProvidersOnly,
    Loader
  },
  data() {
    return {
      page: 1,
      loader: true,
      data: {
        array: [],
        total: 0
      },
      roles: {
        1: '',
        2: 'Provider site admin',
        3: 'Provider site user',
        4: ''
      },
      notAuth: false
    }
  },
  created: function () {
    this.get();
  },
  methods: {
    get() {
      this.http.get(`users?page=${this.page}&_path=${this.$route.path}`).then( r => {
        // if ( r.data.total === undefined ) return this.$ntf();
        if ( this.$error(r.data) ) {
          this.data = r.data;
        } else {
          this.notAuth = true;
        }
        this.loader = false;
      });
    },
    doExpire: function(user_id) {
      this.http.post("user", {'id': user_id}).then( r => {
        if(this.$error(r.data)) {
          this.get();
        };
      });
    },
    toPage(page) {
      this.page = page || 1;
      this.get();
      this.$scrollToTop();
    }
  }
}
