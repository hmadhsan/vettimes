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
      this.http.get("course/dates?id="+this.id + "&_path=/courseproviders/courses").then( r => {
        this.$error(r.data) && (this.array = r.data.array);
      });
    },
    update() {
      this.dialog.course_id = this.id;
      this.http.post("course/dates", this.dialog).then( r => {
        if ( this.$error(r.data) ) {
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
        this.http.delete("course/dates"+this.$toQuery(obj)).then( r => {
          if ( this.$error(r.data) ) {
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
