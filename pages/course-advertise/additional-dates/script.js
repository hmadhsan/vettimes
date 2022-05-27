import Popup from "./popup";

export default {
  components: {
    Popup
  },
  data() {
    return {
      id: this.$parent.info.id,
      array: [],
      dialog: false,
      dataUpdateSuccess: false,
      dataUpdateError: false
    }
  },
  methods: {
    get() {
      this.$axios.$get("/rest/course/dates?id="+this.id + "&_path=/courseproviders/courses").then( r => {
        this.$error(r) && (this.array = r.array);
      });
    },
    update() {
      this.dialog.course_id = this.id;
      this.$axios.$post("/rest/course/dates", this.dialog).then( r => {
        if ( this.$error(r) ) {
          this.get();
          this.dialog = false;
        }
      })
    },
    remove(obj) {
      this.$confirm("", "Are You sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.$axios.$delete("/rest/course/dates"+this.$toQuery(obj)).then( r => {
          if ( this.$error(r) ) {
            this.get();
            this.dialog = false;
          }
        });
      }).catch(() => {});
    },
    next() {
      // window.location.href = this.$router.currentRoute.fullPath.replace('/venues', '/attachments');
      this.$parent.activeTab('venues', 'attachments'); this.$parent.activeTabAttachments = true;
    }
  },
  created() {
    this.get();
  }
}
