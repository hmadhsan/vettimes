import store from "../../store";

export default {
  store,
  data() {
    return {
      options: [],
      value: [],
      list: [],
      loading: false,
      form: {
        alert_id: this.$route.params.id,
        value: [],
        frequency: 'Daily',
        received: 'Monday',
        action: 'addAlert'
      },
      alert: {},
      rules: {
        value: [
          { required: true, message: 'Please select Keywords', trigger: 'blur' }
        ],
        frequency: [
          { required: true, message: 'Please select Frequency', trigger: 'blur' }
        ],
        received: [
          { required: true, message: 'Please select Received', trigger: 'blur' }
        ]
      },
    }
  },
  created: function () {
    this.getCategories();
    this.getUserAlert();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post('useralerts', this.form).then( r => {
            this.$error(r.data)
          }).catch((e) => {
            console.log(e);
          });
        } else {
          return false;
        }
      });
    },
    getUserAlert: function() {
      this.http.post('useralerts?_path=' + this.$route.path, {'action': 'getAlert', 'id': this.$route.params.id }).then( r => {
        this.form.value = r.data[0].categories;
        this.form.frequency = r.data[0].frequency;
        this.form.received = r.data[0].receive + '';
      }).catch((e) => {
        console.log(e);
      });
    },
    getCategories: function() {
      this.http.get(`course/categories?count=false&list=true`).then( r => {
        let arr = [];
        let categoriesSlugsName = {};
        let categoriesNameSlugs = {};
        if(this.$error(r.data)) {
          for (let key in r.data.vars) {
            if(key !== 'cpd_hours') {
              r.data.vars[key].forEach(item => {
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
          store.commit('setCategories', r.data.vars);
          store.commit('setCategoriesSlugsName', categoriesSlugsName);
          store.commit('setCategoriesNameSlugs', categoriesNameSlugs);
          store.commit('setCategoriesSlugsCatgroup', r.data['categories_slugs']);
          store.commit('setCategoriesNamesCatgroup', r.data['categories_names']);
          store.commit('setSearchList', arr);
          this.list = arr;
        }
      });
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
