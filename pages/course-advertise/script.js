import Sidebar from "../../components/sidebar";
import Advert from "./advert"
import AdditionalDates from "./additional-dates"
import Attachments from "./attachments"
import Enhancements from "./enhancements"
import Categorisation from "./categorisation"
import Leads from "./leads"
import store from "../../config/store";

export default {
  store,
  components: {
    Sidebar,
    Advert,
    Attachments,
    Enhancements,
    AdditionalDates,
    Categorisation,
    Leads
  },
  data() {
    return {
      deleteCourse: false,
      deleteCourseStatus: false,
      info: {},
      load: "Loading...",
      tab: null,
      tabs: {
        "details": 'Advert',
        "categorisation": 'Categorisation',
        "venues": 'Additional Dates',
        "attachments": 'Attachments',
        "enhancements": 'Enhancements',
        "leads": 'Leads',
      },
      products: {
        1: 'Bronze',
        2: /* 'Premium listing' */'Silver',
        // 4: /* 'Top Course' */'Platinum',
        8: 'Gold',
        9: 'Free',
      },
      showPublishButton: true,
      onEnhancementsTab: false,
      tabLeadsOnlyPlatinum: false,
      activeTabAdvert: true,
      activeTabCategorisation: false,
      activeTabAdditionalDates: false,
      activeTabAttachments: false,
      activeTabEnhancements: false,      
      closeButton: false,

    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.get();

      if( this.$route.query.fromEdit ) {
        this.activeAllTabs();
      }
      
    })
  },
  methods: {
    get() {

      if(!store.state.auth) window.location.href = 'https://my.vettimes.co.uk/login?redirectTo=' + window.location.href;

      this.http.get("course/title?id="+ this.$router.currentRoute.params.id + "&_path=" + this.$route.path).then( r => {
        if ( this.$error(r.data) ) {
          this.info = r.data.data;          
          if(this.info.product_id == 8 && [1,3,4].indexOf(this.info.status === 0) ) {
            this.tabLeadsOnlyPlatinum = true;
          }
          if(this.tabs[this.$route.params.tab]) {
            this.tab = this.tabs[this.$route.params.tab];            
          } else {
            this.$router.push('/');
          }
          if(!this.info.product_id) this.info.product_id = 9
        } else {
          this.$router.push('/courseproviders/courses');
        }
      }).catch(e => {
        console.log(e);
      });
    },
    getCreditBalance: function() {
      let auth = store.state.auth;
      if(!auth) {
        return false;
      }

      let roles = [2,3];

      if(roles.indexOf(auth.role) >= 0 ) {
        this.http.get("credits").then( r => {
          store.commit('setCredits', r.data.data);
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    setActive(item) {
      this.onEnhancementsTab = (item == 'Enhancements') ? true : false;
      this.tab = item;
    },
    setStatus(value) {
      this.$confirm("", "Are you sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.http.put("course/status", { id: this.info.id, value: value }).then( r => {
          if(this.$error(r.data)) {
            this.get();
            this.getCreditBalance();
          }
        }).catch((e) => {
          console.log(e);
        })
      }).catch(() => {});
    },
    doCopy() {
      this.http.post("course/copy", { id: this.info.id }).then( r => {
        if ( this.$error(r.data) ) {
          if ( !r.data.id ) return this.$ntf({});
          this.$router.push(`/courseproviders/courses/${r.data.id}/details/`);
          window.location.reload();
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    doDelete() {
      this.$confirm("", "Are you sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.http.delete("course?id="+this.info.id).then( r => {
          if(this.$error(r.data) ) {
            setTimeout(() => {
              this.$router.push(`/courseproviders/courses/`);
            }, 2000)
          }
        }).catch((e) => {
          console.log(e);
        });
      }).catch(() => {});
    },
    statusDescription() {
      if(this.info.status === 1 && this.info.postTo !== null) {
        return {
          'status': true,
          'desc': `(expires ${this.info.postTo})`
        }
      }

      if(this.info.status === 3 ) {
        return {
          'status': true,
          'desc': `(live ${this.info.postFrom})`
        }
      }

      return {
        'status': false
      }
    },
    getPreviewLink() {
      if(this.info.status === 1) {
        return {
          'link': `/course-details/${this.info.id}/${this.info.slug}/`,
          'title': 'View Advert'
        }
      } else {
        return {
          'link': `/course-details/${this.info.id}/${this.info.slug}/?preview=preview`,
          'title': 'Preview'
        }
      }
    },
    activeTab(old_item, item) {     
      this.$router.push(this.$router.currentRoute.fullPath.replace('/' + old_item, '/' + item));
      item = (item == 'venues') ? 'Additional Dates' : item;
      this.setActive(item); 
    },
    activeAllTabs() {      
      this.activeTabAdvert = this.activeTabCategorisation = this.activeTabAdditionalDates = this.activeTabAttachments = this.activeTabEnhancements = this.closeButton = true;
    }
  }
}
