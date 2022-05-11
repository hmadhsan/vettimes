import NF from "../404"

export default {
  components: { NF },
  data() {
    return {
      page: null,
      extra: false
    }
  },
  mounted() {
    this.http.get("page?slug="+this.$route.params.slug + "&_path=" + this.$route.path).then( r => {
      this.page = r.data.data || false;
    });
    if ( this.$route.params.slug === 'contact-us' ) {
      this.extra = true;

      setTimeout(() => {
        let qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/";
        if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) }
      }, 500);

    }
  },
  beforeRouteUpdate (to, from, next) {
    next();
    this.http.get("page?slug="+this.$route.params.slug + "&_path=" + this.$route.path).then( r => {
      this.page = r.data.data || false;
    });
  }
}
