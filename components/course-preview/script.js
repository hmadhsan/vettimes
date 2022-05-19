import store from "../../config/store"
import mixins from "../../config/mixins";

export default {
  store,
  mixins: [ mixins.helpers ],
  props: ['course', 'logo', 'porder', 'type'],
  data() {
    return {
      location: window.location.href
    }
  },
  methods: {
    courseProcess: function (course_id, type) {
      if(store.state.auth && [1,4].indexOf(store.state.auth.role) >= 0) {
        let action = 'addCourse';
        if(!type) {
          action = 'deleteCourse';
        }

        this.http.post('usercourses', {  action: action ,course_id: course_id }).then( r => {
          store.commit({
            type: 'changeStars',
            stars: r.data.data
          });
          this.$error(r.data);
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
      let auth = store.state.auth;
      if(auth) {
        return !!auth.role && [1, 4].indexOf(auth.role) === -1;
      } else {
        return true;
      }
    }
  }
}