export default {
  data() {
    return {
      sendEmail: false
    }
  },
  methods: {
    deleteAccount: function() {
      alert('delete');
      this.sendEmail = true;
    }
  }
}
