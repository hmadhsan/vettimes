import store from "../../config/store";
import Popup from "./popup";

export default {
  store,
  components: {
    Popup
  },
  data() {
    return {
      isCourses: false,
      courses: [],
      alerts:[],
      activeNames: ['1', '2'],
      addAlert: false,
      options: [],
      value: [],
      list: [],
      loading: false,
      form: {
        alert_id: '',
        value: [],
        frequency: 'Weekly',
        received: '1',
        action: ''
      },
      rules: {
        value: [
          { required: true, message: 'Please select Keywords' }
        ],
        frequency: [
          { required: true, message: 'Please select Frequency' }
        ],
        received: [
          { required: true, message: 'Please select Received' }
        ]
      },
      keys: {
        'speciality': 'Speciality',
        'course_type' : 'Course type',
        'price' : 'Price',
        'location': 'Location',
        'skill_level': 'Skill level',
        'audience': 'Audience',
        'keyword': 'Keyword'
      }
    }
  },
  created: function () {
    if(store.state.searchList || store.state.categories || store.state.categoriesSlugsName) {
      this.getCategories();
    } else {
      this.list = store.state.searchList;
    }
    this.getUserCourses();
    this.getUserAlerts();
  //  if ( window.location.hash === '#add-alert' ) this.addAlert = true;
  },
  methods: {
    createPreviewLink: function (categories) {

      let slugs = [];
      let keywords = '';

      for (let key in categories) {
        if(key === 'keyword') {
          keywords = categories[key].replace(/ /g, '+');
        } else {
          categories[key].split('|').forEach(item => {
            if(store.state.categoriesNameSlugs[item]) {
              slugs.push(store.state.categoriesNameSlugs[item]);
            }
          });
        }
      }
      let rout = '';
      if(slugs.length > 0 && keywords === '') {
        rout = `/courses/${slugs.join('/')}`;
      } else if (slugs.length === 0 && keywords !== '') {
        rout = `/courses/?kw=${keywords}`;
      } else {
        rout = `/courses/${slugs.join('/')}?kw=${keywords}`;
      }
      return rout;
    },
    deleteAlert: function (data) {

      let str = '';
      for (let key in this.getNotNullCategories(data.keywords)) {
        str += `<p>${this.keys[key]}: ${data.keywords[key].split('|').join(', ')}</p>`;
      }
      str += `<p>Sent: ${data.frequency}</p>`;

      this.$confirm(str, "Delete your alert?", {
        confirmButtonText: "Delete",
        cancelButtonText: 'No',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.http.post('useralerts', {'action': 'deleteAlert', 'alert_id': data.id}).then( r => {
          this.alerts = r.data.array;
        })
      }).catch((e) => {
        console.log(e);
      });
    },
    editAlert: function(data) {
      this.form.alert_id = data.id;
      this.form.value = data.categories.slice();
      this.form.frequency = data.frequency;
      this.form.received = data.receive + '';
      this.form.action = 'addAlert';
      this.addAlert = true;
    },
    getNotNullCategories: function(obj) {
      let temp = {};
      for(let key in obj) {
        if(obj[key] !== null) {
          temp[key] = obj[key];
        }
      }
      return temp;
    },
    submitForm() {
      this.$refs.alert.$refs.form.validate((valid) => {
        if (valid) {
          this.userAlerts();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.alert.$refs.form.resetFields();
      this.form = {
        alert_id: '',
        value: [],
        frequency: 'Weekly',
        received: '1',
        action: ''
      }
    },
    userAlerts: async function() {
      this.form.action = 'addAlert';
     await this.$axios.$post('/rest/useralerts', this.form).then( r => {
        if ( this.$error(r) ) {
          this.alerts = r.array;
          this.resetForm();
          this.addAlert = false;
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    getUserAlerts: function() {
      this.$axios.$post('/rest/useralerts', {'action': 'getAlerts'}).then( r => {
        if ( this.$error(r) ) {
          this.alerts = r.array;
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    getCategories: function() {
      this.$axios.$get(`/rest/course/categories?count=false&list=true`).then( r => {
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(r.status) {
          for (let key in r.vars) {
            if(key !== 'cpd_hours') {
              r.vars[key].forEach(item => {
                categoriesSlugsName[item.slug] = item.name;
                categoriesNameSlugs[item.name] = item.slug;
                arr.push({
                  'value': item.name,
                  'label': item.name
                });
              })
            }
          }
          this.listLoad = true;
          store.commit('setCategories', r.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r['categories_names']);
          store.commit('setSearchList', arr);
          this.list = arr;
        }
      });
    },
    getUserCourses: async function() {
    await  this.$axios.$get("/rest/course/users?_path=" + this.$route.path).then( r => {
        if(r.status) {
          this.courses = r.array;
          this.isCourses = true;
        } else {
          this.courses = [];
          this.isCourses = false;
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    getStars: function () {
      let stars = store.state.stars.length;
      if (stars > 0) {
        return stars;
      } else {
        return '';
      }
    },
    deleteCourse: function(course_id) {
      if(store.state.auth) {
        this.$axios.$post('/rest/usercourses', {  action: 'deleteCourse' ,course_id: course_id }).then( r => {
          store.commit({
            type: 'changeStars',
            stars: r.data
          });
          this.getUserCourses();
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    remoteMethod: function(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
}
