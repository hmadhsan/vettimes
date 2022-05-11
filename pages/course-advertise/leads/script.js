import mixins from "../../../config/mixins"

export default {
  mixins: [ mixins.helpers ],
  props: ["type", "value"],
  data() {
    return {
      filter: {
        id: this.$parent.info.id,
        type: 'course_id',
        lead: "-1",
        from: null,
        to: null,
        page: 1
      },
      data: {
        array: [],
        total: 0
      },
      search: {}
    }
  },
  created: function () {
    this.get();
  },
  methods: {
    submit() {
      this.filter.page = 1;
      this.get();
    },
    toPage(page) {
      this.filter.page = page || 1;
      return this.get();
    },
    get() {
      this.search = Object.assign({}, this.filter);
      this.http.get("leads-table"+this.$toQuery(this.search) + "&_path=/courseproviders/courses").then( r => {
        if (this.$error(r.data)) {
          if ( r.data.total === undefined ) return this.$ntf();
          this.data = r.data;
        }
      });
    },
  }
}
