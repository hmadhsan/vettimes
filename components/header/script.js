import store from "../../config/store"
import IsLogout from "./is-logout"
import IsLogin from "./is-login"
import ProviderLogin from "./provider-login"
import { cpdBaseUrl } from "~/config/constants"
export default {
  store,
  components: {
    IsLogout,
    IsLogin,
    ProviderLogin
  },
  data() {

    const contactUs = 'https://vettimes2.typeform.com/to/ONnQs0';
    var header = "(item.title === 'Why choose us?' || item.title === 'Packages') && $route.path.indexOf('courseproviders')>= 0"

    return {
      stars: 0,
      activeMenu: false,
      menuOpen: false,
      userMenuOpen: false,
      provider: {
        name: '',
        slug: ''
      },
      menuItems: [
        {
          title: 'Home',
          exact: true,
          url: '/',
          role: 'all',
          auth: [1,2,3,4]
        },
        {
          title: 'Home Providers',
          exact: true,
          url: '/courseproviders',
          role: 'provider',
          auth: [1,2,3,4]
        },
        {
          title: 'Find courses',
          url: '/courses',
          role: 'all',
          auth: [1,2,3,4]
        },
        {
          title: 'Course providers',
          url: '/providers',
          role: 'all',
          auth: [1,2,3,4]
        },
        {
          title: 'Why choose us?',
          // url: 'https://courseadvertising.vettimes.co.uk',          
          scrollTo: 'why-choose-us',
          role: 'provider',
          auth: [1,2,3,4]
        },
        /*{
          title: 'Provider Information',
          url: '/courseproviders/company-management',
          role: 'provider',
          auth: [2]
        },*/
        /*{
          title: 'Users',
          url: '/courseproviders/user-management',
          role: 'provider',
          auth: [2]
        },*/
        {
          title: 'CPD+',
          url: 'https://cpd.vettimes.co.uk/cpd-plus',
          role: 'all',
          auth: [1,2,3,4]
        }
        /* ,
        {
          title: 'Your courses',
          url: '/your-courses',
          role: 'user',
          auth: [4]
        } */,
        {
          title: 'Your courses',
          url: '/courseproviders/courses',
          role: 'provider',
          auth: [2,3]
        },
        {
          title: 'Packages',
          // url: 'https://courseadvertising.vettimes.co.uk/online-upgrades/',
          scrollTo: 'packages',
          role: 'provider',
          auth: [1,2,3,4]
        },
        {
          title: 'Contact us',
          url: contactUs,
          role: 'all',
          auth: [1,2,3,4]
        },
        {
          title: 'Contact us',
          url: contactUs,
          role: 'provider',
          auth: [1,2,3,4]
        },
        /*{
          title: 'Let\'s get you started',
          exact: true,
          url: '/courseproviders/courses/new',
          role: 'provider',
          auth: [2,3]
        },*/
      ],
      secondMenuItems: [
        {
          title: 'find a job',
          url: 'https://jobs.vettimes.co.uk/'
        },
        {
          title: 'visit vet times',
          url: 'https://www.vettimes.co.uk/'
        }
      ],
      providerMenuItems: [
        {
          title: 'Upload course',
          // url: this.$auth() ? '/courseproviders/courses/new' : contactUs,
          url: 
           // ( store.state.auth && store.state.auth.role === 2 )
          //  ? 
            '/courseproviders/courses/new'
          //  : ( store.state.auth ) ? '/courseproviders/company-management' 
           // : 'https://my.vettimes.co.uk/register?redirectTo=http://cpdlocal.vettimes.co.uk:3000'+'&fromCPD=true',
          //role: 'provider',
          //auth: [-1,1,2,3,4]
        }
      ],
    }
  },
  created: function () {
   // window.addEventListener('click', this.closeActiveMenu);
    this.getCourses();
    this.getProviderName();
    this.getCreditBalance();
  },
  methods: {
    getProviderName: function() {
      let auth = store.state.auth;
      if(!auth) {
        return false;
      }

      let roles = [2,3];

      if(roles.indexOf(auth.role) >= 0 ) {
        this.http.get("provider/name").then( r => {
          if(this.$error(r.data)) {
            this.provider = r.data.data;
          }
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    getCourses: function () {
      let auth = store.state.auth;
      if(!auth) {
        return false;
      }

      let roles = [1,4];

      if(roles.indexOf(auth.role) >= 0 ) {
        this.http.post("usercourses", {  action: 'getCourses' }).then( r => {
          store.commit({
            type: 'changeStars',
            stars: r.data
          });
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    getCreditBalance: function() {
      let auth = store.state.auth;
      if(!auth) {
        return false;
      }

      let roles = [2,3];

      if(roles.indexOf(auth.role) >= 0 ) {
        this.$axios.$get("/rest/credits").then( r => {
          store.commit('setCredits', r.data);
        }).catch((e) => {
          console.log(e);
        });
      }
    },
    mainMenuHandler: function (e) {
      e.preventDefault();

      if(this.menuOpen) {
        this.menuOpen = false;
        this.activeMenu = false;
      } else {
        this.menuOpen = true;
        this.userMenuOpen = false;
        this.activeMenu = e.target;
      }
    },
    userMenuHandler: function (e) {
      e.preventDefault();

      if(this.userMenuOpen) {
        this.userMenuOpen = false;
        this.activeMenu = false;
      } else {
        this.userMenuOpen = true;
        this.menuOpen = false;
        this.activeMenu = e.target;
      }

    },
    closeActiveMenu: function(e) {
      if (e.target !== this.activeMenu && this.activeMenu ) {
        this.userMenuOpen = false;
        this.menuOpen = false;
        this.activeMenu = false;
      }
    },
    logOut() {
      location.href = "https://my.vettimes.co.uk/logout?redirectTo="+window.location.origin;
      /*this.http.delete('auth').then( () => {

        this.http.get("auth").then(res => {
          store.commit( "auth", ( !res || !res.data || !res.data.id ) ? false : res.data );
          this.$access(router.currentRoute);
        }).catch( () => {
          store.commit("auth");
          this.$access(router.currentRoute);
        });

        this.$router.push('/')
      })*/
    },
    scrollToElement: function(section) {
      if( this.$route.path != '/courseproviders' ) {
        this.$router.push('/courseproviders#' + section );
        return;
      }      
     // this.$scrollToElement(section);
      window.scroll(0,0)
    },
  },
  computed: {
    filteredMenuList: function() {
      let route = this.$route.path;
      let auth = store.state.auth;
      let role = 4;
      if(auth) {
        role = auth.role;
      }


      return this.menuItems.filter(item => {        
        if( this.$route.path.indexOf('courseproviders') >= 0 ) {

          if(item.role === 'provider' && item.auth.indexOf(role) >= 0) {
            return item;
          } else if(item.role === 'all' && item.auth === -1 && !auth) {
            return item
          } else if( item.role === 'user' && item.auth.indexOf(role) >= 0) {
            return item;
          } else if(item.auth.indexOf(-1) >= 0 && !auth) {
            return item;
          }
        } else {

          if(!item.role || item.role === 'all') {
            return item;
          } else if( item.role === 'user' && item.auth.indexOf(role) >= 0) {
            return item;
          }
        }
      })
    }
  }
}
