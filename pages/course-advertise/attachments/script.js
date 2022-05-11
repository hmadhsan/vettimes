import Media from "../../../components/attachment-popup";

export default {
  components: {
    Media
  },
  data() {
    return {
      id: this.$parent.info.id,
      array: [],
      media: null,
      dataUpdateSuccess: false,
      dataUpdateError: false,
      dialog: false,
      dialogOpen: false,
      accept: {
        0: ".doc,.docx,.pdf,.pages,.png,.jpg,.jpeg,.gif"
      },
      name: "",
      page: 1
    }
  },
  methods: {
    get() {
      this.http.get("course/attachments?id="+this.id + "&_path=/courseproviders/courses").then( r => {
        this.$error(r.data) && (this.array = r.data.array);
      });
    },
    update() {
      this.http.post("course/attachments", { course_id: this.id, media_id: this.media }).then( r => {
        this.$error(r.data) && this.get();
      });
      this.media = null;
    },
    remove(id, media_id) {
      this.$confirm("", "Are You sure?").then(() => {
        this.http.delete("course/attachments"+this.$toQuery({ id: id, course_id: this.id, media_id: media_id })).then( r => {
          this.$error(r.data) && this.get();
        });
      }).catch(() => {});
    },
    add() {
      this.dialog = {
        course_id: this.id,
        description: "",
        type: 0
      };
      this.dialogOpen = true;
    },
    next() {
      // window.location.href = this.$router.currentRoute.fullPath.replace('/attachments', '/enhancements');
      this.$parent.activeTab('attachments', 'enhancements'); this.$parent.activeTabEnhancements = true;
    }
  },
  created() {
    this.get();
  }
}
