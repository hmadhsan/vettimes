import store from "../../config/store";

export default {
  store,
  data() {
    return {

    }
  },
  created: function() {
    document.title = 'Vet Times CPD';
  },
  methods: {
    unsubscribe: function() {
      let auth = store.state.auth;
      if(!auth) {
        return false;
      }
      this.http.delete(`useralerts/all`).then( r => {
        if( this.$error(r.data) ) {
          setTimeout(() => {
            this.$router.push('/');
          }, 3000)
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  }
}
