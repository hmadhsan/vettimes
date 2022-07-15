
import mixins from "../../config/mixins";

export default {

  mixins: [ mixins.helpers ],
  props: ['course', 'logo', 'porder', 'type'],
  data() {
    return {
      location: window.location.href
    }
  },
  methods: {
    courseProcess: function (course_id, type) {
      if(this.$store.state.mystore.auth && [1,4].indexOf(this.$store.state.mystore.auth.role) >= 0) {
        let action = 'addCourse';
        if(!type) {
          action = 'deleteCourse';
        }
        debugger
        this.$axios.$post('/rest/usercourses', {  action: action ,course_id: course_id }).then( r => {
          this.$store.commit({
            type: 'mystore/changeStars',
            stars: r
          });
          this.$error(r);
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    generateQuery: function() {
      if(this.$props.type && this.$props.type === 'provider') {
        return `?porder=Provider: ${this.$props.course.provider.name}&so=Date&pid=${this.$props.course.provider.id}`
      } else if(this.$props.porder && !this.$props.porder) {
        return '?porder=' + this.$props.porder.join('|')
      } else {
        return '';
      }
    },
    getMetaInfo: function (item, cat) {
      if(!item.tab_category) {
        if(!item[cat]) {
          return false
        } else {
          return item[cat];
        }
      } else {
        if(item.tab_category[cat]) {
          return item.tab_category[cat];
        } else {
          return false
        }
      }
    },
    checkAuth: function () {
      let auth = this.$store.state.mystore.auth;
      if(auth) {
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}