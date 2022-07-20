export default {
  data() {
    return {
      table: []
    }
  },
  created() {
    this.$axios.$get('/rest/user/payments').then(r => {
      if ( this.$error(r) && r.array ) {
        this.table = r.array;
      }
    })
  }
}
