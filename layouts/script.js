import Header from "../components/header"
import Footer from "../components/footer"
import TopAd  from "./top_ad"
// var AdButler = require('adbutler');
// import AdButler from 'adbutler'
export default {
  components: {
    Header,
    Footer,
    TopAd
  },
  created(){


  },
  methods:{
    access(to) {
      let auth = this.$store.state.mystore.auth;
      if (auth === null) return false;
    
      const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
      if(!!to.meta.auth) {
        if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0) {
          return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
        }
      }
      process.browser ? document.title = to.name : null ;
      return true;
    },
  }
}
