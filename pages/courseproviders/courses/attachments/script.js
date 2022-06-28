import Media from "../../../../components/attachment-popup";

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
    
    toQuery(obj) {
      return "?"+ Object.keys(obj)
      .map(key => key + "=" + (obj[key] || ""))
      .join("&")
    },
    ntf(obj) {  
      if (typeof obj === "string") obj = { type: "error", message: obj };
      if (typeof obj !== "object") obj = { type: "error", message: unknownError };
      if (!obj.type) obj.type = "error";
      if (!obj.message) obj.message = unknownError;
      if (!obj.duration) obj.duration = 5000;
      ElementUI.Message({
        duration: obj.duration,
        message: obj.message,
        showClose: true,
        type: obj.type
      });
    },
    error(data, message = false, duration = 5000) {    
      if (data.status && data.message) {
        this.ntf({
          message: data.message,
          type: "success",
          duration: duration
        });
        return true;
      }
    
      let res = false;
      
      if (data.error) {
        message = data.error;
      } else if (!data.status) {    
        if(data.valid) {
          message = '';
          if(typeof data.message === 'object') {
            for(let key in data.message) {
              message += key + ': ' + data.message[key] + '; ';
            }
          } else {
            message = data.message;
          }
    
        } else {      
          message = unknownError;
        }
      } else {
        res = true;
      }
      
      if(duration === 0) {this.ntf({ message: message, type: "error", duration: duration }); return res;}
      if (res && message) this.ntf({ message: message, type: "success", duration });
      if (!res) this.ntf(message);
    
      return res;
    },
    get() {
      this.$axios.$get("/rest/course/attachments?id="+this.id + "&_path=/courseproviders/courses").then( r => {
        this.error(r.data) && (this.array = r.data.array);
      });
    },
    update() {
      this.$axios.$post("/rest/course/attachments", { course_id: this.id, media_id: this.media }).then( r => {
        this.error(r.data) && this.get();
      });
      this.media = null;
    },
    remove(id, media_id) {
      this.$confirm("", "Are You sure?").then(() => {
        this.$axios.$delete("course/attachments"+this.toQuery({ id: id, course_id: this.id, media_id: media_id })).then( r => {
          this.error(r.data) && this.get();
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
      process.browser ? window.location.href = this.$router.currentRoute.fullPath.replace('/attachments', '/enhancements') : null ;
      this.$parent.activeTab('attachments', 'enhancements'); this.$parent.activeTabEnhancements = true;
    }
  },
  created() {
    this.get();
  }
}
