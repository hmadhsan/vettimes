

export default {
  
  data() {
    return {

    }
  },
  created: function() {
    document.title = 'Vet Times CPD';
  },
  methods: {
    unsubscribe: function() {
      let auth = this.$store.state.mystore.auth;
      if(!auth) {
        return false;
      }
      this.$axios.$delete(`/rest/useralerts/all`).then( r => {
        if( this.$error(r) ) {
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
