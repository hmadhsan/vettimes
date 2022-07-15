export default {
  data() {
    return {
      url: this.$route.params.url,
      title: this.$route.params.title,
      provider: this.$route.params.provider
    }
  },
  created: function() {
    debugger
    if(!!this.url) {
      setTimeout(() => {
        process.browser ? location.href = this.url : null;
      }, 3000);
    } else {
      process.browser ? window.history.back() : null;
    }
  }
}