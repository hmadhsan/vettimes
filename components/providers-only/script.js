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
      this.http.get("auth/expiry?_path=" + this.$route.path).then(res => {
        if(res.data.expiry) {
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