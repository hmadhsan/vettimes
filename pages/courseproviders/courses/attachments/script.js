import Media from "../../../../components/attachment-popup";
import { error, toQuery } from "~/config/globalFunctions";
export default {
  components: {
    Media
  },
  data() {
    return {
      id: this.$route.params.id,
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
      this.$axios.$get("/rest/course/attachments?id="+this.id + "&_path=/courseproviders/courses").then( r => {
        error(r) && (this.array = r.array);
      });
    },
    update() {
      this.$axios.$post("/rest/course/attachments", { course_id: this.id, media_id: this.media }).then( r => {
        error(r) && this.get();
      });
      this.media = null;
    },
    remove(id, media_id) {
      this.$confirm("", "Are You sure?").then(() => {
        this.$axios.$delete("course/attachments"+toQuery({ id: id, course_id: this.id, media_id: media_id })).then( r => {
          error(r) && this.get();
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
      // process.browser ? window.location.href = this.$router.currentRoute.fullPath.replace('/attachments', '/enhancements') : null ;
      this.$parent.activeTab('attachments', 'enhancements'); this.$parent.activeTabEnhancements = true;
    }
  },
  created() {
    this.get();
  }
}
