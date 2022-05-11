export default {
  props: ['provider_id'],
  data() {
    return {
      id: this.$route.params.id,
      courses: {
        total: 0,
        array: []
      },
      page: 1,
      course_number: 3,
      founder: []
    }
  },
  created: function () {
    this.findCategoriesInRoute();
  },
  methods: {
    get: function () {
      this.http.get(`courses/latest?provider=${this.provider_id}&page=${this.page}&course_number=${this.course_number}`).then( r => {
        if ( r.data.total > 0 ) {
          this.courses = r.data;
        }
      });
    },
    findCategoriesInRoute: function() {
      if(!!this.$parent.$route.query.porder) {
        if(this.$parent.$route.query.porder) {
          this.founder = this.$route.query.porder.split('|');
        }
      }
      this.searchCourses();
    },
    searchCourses: function () {

      let pid = !this.$route.query.pid ? null : this.$route.query.pid;

      this.http.post('courses/searchsimilar', {
        page: this.page,
        keywords: this.founder.join('|'),
        pid: pid
      })
      .then( r => {
        if ( r.data.total > 0 ) {
          this.courses.total = r.data.total;
          this.courses.array = r.data.array;
        } else {
          this.courses.total = 0;
          this.courses.array = [];
        }
      });
    },
    goToPage: function (page) {
      this.page = page;
      this.searchCourses();
    },
    getNewCourse: function () {
      this.$parent.id = this.$route.params.id;
      this.id = this.$route.params.id;
      this.$parent.get();
    }
  },

}