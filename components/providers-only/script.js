export default {
  data() {
    return {
      isExpiry: false,
      show: false,
    }
  },
  created: function() {
    this.getExpireStatus();
  },
  methods: {
    getExpireStatus: function() {
      this.$axios.$get("/rest/auth/expiry?_path=" + this.$route.path).then(res => {
        if(res.expiry) {
          this.isExpiry = true;
        }
        this.show = true;
      }).catch( (er) => {
        console.log(er);
        this.show = true;
      });
    }
  }
}