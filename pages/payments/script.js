export default {
  data() {
    return {
      table: []
    }
  },
  created() {
    this.http.get('user/payments').then(r => {
      if ( this.$error(r.data) && r.data.array ) {
        this.table = r.data.array;
      }
    })
  }
}
