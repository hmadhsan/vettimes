import MessageInfo from "../../components/message-info";
import Loader from "../../components/loader"

export default {
  components: {
    MessageInfo,
    Loader
  },
  data() {
    return {
      isLoading: true,
      dataUpdateSuccess: false,
      dataUpdateError: false,
    }
  },
  created: function () {
    this.unsubscribe();
  },
  methods: {
    unsubscribe: function() {
      if(this.$route.query.token) {
        this.$axios.$delete(`/rest/useralerts?token=${this.$route.query.token}&_path=${this.$route.path}`).then( r => {
          this.isLoading = false;
          this.dataUpdateSuccess = 'Your course alert has been deleted.'
          setTimeout(() => {
            this.$router.push('/');
          }, 3000)
        }).catch((e) => {
          console.log(e);
        });
      } else {
        this.isLoading = false;
        this.dataUpdateError = 'Error!!! Wrong Token.'
        setTimeout(() => {
          this.$router.push('/');
        }, 3000)
      }
    }
  }
}
