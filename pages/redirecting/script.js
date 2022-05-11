export default {
  data() {
    return {
      url: this.$route.params.url,
      title: this.$route.params.title,
      provider: this.$route.params.provider
    }
  },
  created: function() {
    if(!!this.url) {
      setTimeout(() => {
        location.href = this.url;
      }, 3000);
    } else {
      window.history.back();
    }
  }
}