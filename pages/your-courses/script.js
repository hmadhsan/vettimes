import store from "../../config/store";
import Table from "./table";
import Popup from "./popup";
import mixins from "../../config/mixins";
import ProvidersOnly from "../../components/providers-only";
import Loader from "../../components/loader";

export default {
  store,
  mixins: [ mixins.helpers ],
  components: {
    Loader,
    Table,
    Popup,
    ProvidersOnly
  },
  data() {
    return {
      searchKeywords: '',
      providerStatus: 'Live',
      data: {
        array: [],
        total: 0
      },
      leads: {
        withLeads: 0,
        withViews: 0
      },
      page: 1,
      status: '1',
      order_by: "id",
      order: "descending" ,
      advertise: false,
      showCourses: false,
      notAuth: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if(!this.isEmptyObj(this.$route.query)) {
        this.page = parseInt(this.$route.query.page);
        this.searchKeywords = this.$route.query.keywords;
        this.providerStatus = this.$route.query.status;
        this.order_by = this.$route.query.order_by;
        this.order = this.$route.query.order;
      }
      this.get();
    })
  },
  methods: {
    get: function () {
      
      if(!store.state.auth) window.location.href = 'https://my.vettimes.co.uk/login?redirectTo=' + window.location.href;

      this.http.get("courses/providercourses"+this.$toQuery({
        page: this.page,
        keywords: this.searchKeywords,
        status: this.providerStatus,
        order_by: this.order_by,
        order: this.order
      }) + "&_path=" + this.$route.path).then( r => {        
          if(this.$error(r.data)) {
            this.data.array = r.data.array;
            this.data.total = r.data.total;
            this.leads = r.data.leads;
            this.showCourses = true;
          } else {            
            this.notAuth = true;
          }
      })
      .catch(e => {
        console.log(e);
      });

    },
    handlerSubmitSearchCourse: function (e) {
      e.preventDefault();
      this.get();
    },
    setStatus(id, value) {
      this.$confirm("", "Are you sure?", {
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(() => {
        this.http.put("course/status", { id: id, value: value }).then( r => {
          this.$error(r.data) && this.get();
        })
      }).catch((e) => {
        console.log(e);
      });
    },
    doCopy(id) {
      this.http.post("course/copy", { id: id }).then( r => {
        if ( this.$error(r.data) ) {
          if ( !r.data.id ) return this.$ntf({});
          this.$router.push(`/courseproviders/courses/${r.data.id}/details/`);
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    doDelete(id) {
      this.$confirm("", "Are you sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.http.delete(`course?id=${id}`).then( r => {
          if(this.$error(r.data) ) {
            this.get();
          }
        }).catch((e) => {
          console.log(e);
        });
      }).catch(() => {});
    },
    toPage(page) {
      this.page = parseInt(page) || 1;
      this.$scrollToElement('courses-table');
      this.$router.replace( this.$toQuery({
        page: this.page,
        keywords: this.searchKeywords,
        status: this.providerStatus,
        id: store.state.currentProviderId,
        order_by: this.order_by,
        order: this.order
      }) );
      this.get();
    },
    toOrder(obj) {
      this.order = obj.order;
      this.order_by = obj.prop;
      this.toPage(parseInt(this.page));
    },
    gotoLeads(id) {
      this.$router.push(`/courseproviders/courses/${id}/leads/`);
    },
    gotoCourse(id) {
      this.$router.push(`/courseproviders/courses/${id}/details?fromEdit=true`);
    }
  }
}
