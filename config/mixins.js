

let helpers = {
  
  computed: {
    dialog () {
      return this.$store.state.mystore.enquireEmailDialog
    },
    courseDialog () {
      return this.$store.state.mystore.courseEmailDialog
    },
    courseAlertDialog() {
      return this.$store.state.mystore.courseAlertDialog
    }
  },
  methods: {
    openEnquireEmailPopup: function(event) {
      event.preventDefault();
      this.$store.commit({
        type: 'mystore/changeEnquireEmailDialog',
        dialog: true
      });
      document.body.style.overflow = 'hidden';
    },
    openCourseEmailPopup: function(bookUrl) {            
      this.$store.commit({
        type: 'mystore/changeCourseEmailDialog',
        status: 'course',
        url: bookUrl,
        dialog: true
      });
      document.body.style.overflow = 'hidden';      
    },
    openCourseAlertPopup: function(bookUrl) {            
      this.$store.commit({
        type: 'mystore/changeCourseAlertDialog',
        status: 'course',
        url: bookUrl,
        dialog: true
      });
      document.body.style.overflow = 'hidden';      
    },
    getSlugsFromRoutes: function () {

      let paths = {
        slugs: []
      };

      if(this.$parent.$attrs.providers) {
        if(!!this.$route.query.porder) {
          paths.slugs = this.$route.query.porder.split('|').filter(item => {
            if(store.state.categoriesSlugsName[item]) {
              return item;
            }
          });
        } else {
          paths.slugs = [];
        }
      } else {
        if(!!this.$route.params.keyword) {
          if(store.state.categoriesSlugsName[this.$route.params.keyword]) {
            paths.slugs.push(this.$route.params.keyword);
          }
        } else if(!!this.$route.params.pathMatch) {
          paths.slugs = this.$route.params.pathMatch.split('/').filter(item => {
            if(store.state.categoriesSlugsName[item]) {
              return item;
            }
          });
        } else {
          paths.slugs = [];
        }
      }

      if(!!this.$route.query.kw) {
        paths.kw = this.$route.query.kw.split('|').filter(item => {
          if(this.$route.query.kw.indexOf(item) >= 0 ) {
            return item.replace(/ /g, '+')
          }
        });
      } else {
        paths.kw = [];
      }

      // sort provider
      if(!!this.$route.query.so) {
        if(this.$route.query.so.indexOf('Date') >= 0) {
          this.$parent.sortType = 'Date';
        }
      }

      // provider id
      if(!!this.$route.query.pid) {
        if(this.$route.query.pid) {
          this.$parent.pid = this.$route.query.pid;
        }
      }

      return paths;
    },
    checkRoutes: function () {
      let paths = this.getSlugsFromRoutes();
      if(paths.slugs.length > 0) {
        this.value = paths.slugs.map(item => {
          if(store.state.categoriesSlugsName[item]) {
            return store.state.categoriesSlugsName[item];
          }
        });
        this.value = this.value.concat(paths.kw);
        let searchWords = this.keywordIsCategory(this.value, this.$store.state.mystore.categories);
      } else if (paths.kw.length > 0) {
        this.value = this.value.concat(paths.kw);
        let searchWords = this.keywordIsCategory(this.value, this.$store.state.mystore.categories);
      } else if (!!this.$route.query.porder) {
          if(this.$route.query.porder) {
            this.value = this.$route.query.porder.split('|');
          } else {
            this.value = [];
          }
      } else {
        this.value = [];
      }
    },
    createSearchRoute: function (searchWords) {
      let isProviders = this.$parent.$attrs.providers === undefined  ? this.$attrs.providers : this.$parent.$attrs.providers;

      let tempSearchWords = [];

      let catsYes = false;
      let kwYes = false;

      for (let key in searchWords) {
        let temp = [];
        if(key === 'keywords') {
          temp = searchWords[key].map(item => item.replace(/ /g, '+'));
        } else {
          temp = searchWords[key].map(item => {
            if(this.$store.state.mystore.categoriesNameSlugs[item]) {
              return this.$store.state.mystore.categoriesNameSlugs[item]
            }
          });
        }
        tempSearchWords[key] = temp;
      }

      let slugs = [];
      slugs = slugs.concat(tempSearchWords.speciality, tempSearchWords.audience, tempSearchWords.course_type, tempSearchWords.location, tempSearchWords.skill_level, tempSearchWords.price);
      
      // if(this.$parent.pid === '' || this.$parent.so === '') {
      let queryEnd = '';
      let isSortType = '';

      let sortType = !this.$parent.sortType ? this.sortType : this.$parent.sortType;
      let pid = !this.$parent.pid ? this.pid : this.$parent.pid;


      if(sortType !== '' ) {
        isSortType = '&';
        queryEnd += 'so=' + sortType;
      }

      if(pid !== '' && !!pid) {
        queryEnd += isSortType + 'pid=' + pid;
      }
      
      if(slugs.length > 0 && searchWords.keywords.length === 0) {

        catsYes = true;
        if(isProviders) {
          queryEnd = queryEnd === '' ? queryEnd : "&" + queryEnd ;
          this.$router.push(`/course-providers/?porder=${slugs.join('|')}${queryEnd}`);
        } else {
          queryEnd = queryEnd === '' ? queryEnd : "?" + queryEnd ;
          this.$router.push(`/courses/${slugs.join('/')}${queryEnd}`);
        }

      } else if (slugs.length === 0 && searchWords.keywords.length > 0) {

        queryEnd = queryEnd === '' ? queryEnd : "&" + queryEnd ;

        kwYes = true;
        if(isProviders) {
          this.$router.push(`/course-providers/?kw=${tempSearchWords.keywords.join('|')}${queryEnd}`);
        } else {
          this.$router.push(`/courses/?kw=${tempSearchWords.keywords.join('|')}${queryEnd}`);
        }

      } else {

        queryEnd = queryEnd === '' ? queryEnd : "&" + queryEnd ;

        kwYes = true;
        catsYes = true;
        if(isProviders) {
          this.$router.push(`/course-providers/?porder=${slugs.join('|')}&kw=${tempSearchWords.keywords.join('|')}${queryEnd}`);
        } else {
          this.$router.push(`/courses/${slugs.join('/')}?kw=${tempSearchWords.keywords.join('|')}${queryEnd}`);
        }
      }
      if(!catsYes && !kwYes) {

        queryEnd = queryEnd === '' ? queryEnd : "?" + queryEnd ;

        this.$router.push(`/courses/${queryEnd}`);
      }
    },
    findCategories: function(keywords) {
      let searchWords = {
        audience: [],
        course_type: [],
        location: [],
        price: [],
        skill_level: [],
        speciality: [],
        keywords: []
      };
      if(keywords.length > 0) {
        keywords.forEach(item => {
          if(item!=null) {
            if(this.$store.state.mystore.categoriesNamesCatgroup[item]) {
              searchWords[this.$store.state.mystore.categoriesNamesCatgroup[item]].push(item);
            } else {            
                searchWords['keywords'].push(item);            
            }
          }
        });
      }      
      return searchWords;
    },
    keywordIsCategory: function (keywords) {

      let searchWords = this.findCategories(keywords);
      this.createSearchRoute(searchWords);
      return searchWords;
    },
    onFocus: function(e) {
      e.target.closest('.cm-form__field').classList.add('hasFocus');
    },
    onBlur: function(e) {
      e.target.closest('.cm-form__field').classList.remove('hasFocus');
    },
    onElFocus: function(e) {
      e.$el.closest('.cm-form__field').classList.add('hasFocus');
    },
    onElBlur: function(e) {
      e.$el.closest('.cm-form__field').classList.remove('hasFocus');
    },
    onFocusEditor: function (/* event, index */e) {
      // index.sourceElement.closest('.cm-form__field').classList.add('hasFocus');
      e.container.offsetParent.closest('.cm-form__field').classList.add('hasFocus');
    },
    onBlurEditor: function (/* event, index */e) {
      // index.sourceElement.closest('.cm-form__field').classList.remove('hasFocus');
      e.container.offsetParent.closest('.cm-form__field').classList.remove('hasFocus');
    },
    isStar: function(id) {
      if(this.$store.state.mystore.auth) {
        return this.$store.state.mystore?.stars?.data?.indexOf(id) >= 0;
      } else {
        return false;
      }
    },
    checkUrl: function (url) {
      if(url.indexOf('http') >= 0) {
        return url;
      } else {
        return `//${url}`
      }
    },
    doExport(name) {      
      let data = Object.assign({}, this.search);
      data.export = name;
      
      if ( this.data.total < 101 ) {
        this.http.post("export", data).then( r => {
          if ( this.$error(r.data) && r.data.name ) {            
            window.open(this.$store.state.mystore.base +"rest/download?filename="+ r.data.name);
          }
        });
        return;
      }

      this.$prompt("Please input your e-mail address", "Export records", {
        customClass: "prompt",
        inputValue: this.$auth().email
      }).then( res => {
        data.email = res.value;
        this.http.post("export-plan", data).then( r => {
          this.$error(r.data);
        });
      }).catch(() => {});
    },
    vueEditorCustomToolbar() {
      return [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
        [
          { list: "ordered" },
          { list: "bullet" }
        ],           
        ["link"]
      ];
    },
    validateUrl: function(url, e) {
      if( url ){ 
        url = url.replace('www.', '');
        if( !(url.substring(0, 8) == 'https://') && !(url.substring(0, 7) == 'http://') ) {
          url = 'https://' + url;
          e.target.value = url;
        }
      }
    },
    diffMonths(from, to) {
      let months;      
      months = (to.getFullYear() - from.getFullYear()) * 12;      
      months -= from.getMonth() + 1;
      months += to.getMonth();
      return months <= 0 ? 0 : months + 1;

      /* let diff = (to.getTime() - from.getTime()) / 1000;
      diff /= (60 * 60 * 24 * 7 * 4);
      return Math.abs(Math.round(diff)); */
    },
    range: function(start, edge, step) {
      // If only 1 number passed make it the edge and 0 the start      
      if (arguments.length === 1) {
        edge = start;
        start = 0;
      }
    
      // Validate edge/start
      edge = edge || 0;
      step = step || 1;
    
      // Create array of numbers, stopping before the edge
      let arr = [];
      for (arr; (edge - start) * step > 0; start += step) {
        arr.push(start);
      }
      return arr;
    }
  }
};

export default {
  helpers
};