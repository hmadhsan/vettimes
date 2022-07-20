
import Table from "./table";
import Popup from "./popup";
import mixins from "../../../config/mixins";
import ProvidersOnly from "../../../components/providers-only";
import Loader from "../../../components/loader";
import { error, isEmptyObj, ntf, toQuery } from "~/config/globalFunctions";

export default {
  
  mixins: [ mixins.helpers ],
  components: {
    Loader,
    Table,
    Popup,
    ProvidersOnly
  },
  head() {
    return {
      title: "Providers Courses"
    }
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
      if(!isEmptyObj(this.$route.query)) {
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
      
      if(!this.$store.state.mystore.auth){
        // window.location.href = 'https://my.vettimes.co.uk/login?redirectTo=' + window.location.href;
      }

      this.$axios.$get("/rest/courses/providercourses"+toQuery({
        page: this.page,
        keywords: this.searchKeywords,
        status: this.providerStatus,
        order_by: this.order_by,
        order: this.order
      }) + "&_path=" + this.$route.path).then( r => {        
          if(error(r)) {
            this.data.array = r.array;
            this.data.total = r.total;
            this.leads = r.leads;
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
        this.$axios.$put("/rest/course/status", { id: id, value: value }).then( r => {
          error(r) 
          && 
          this.get();
        })
      }).catch((e) => {
        console.log(e);
      });
    },
    doCopy(id) {
      this.$axios.$post("/rest/course/copy", { id: id }).then( r => {
        if ( error(r) ) {
          if ( !r.id ) return ntf({});
          this.$router.push(`/courseproviders/courses/${r.id}/details/`);
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    doDelete(id) {
      debugger
      this.$confirm("", "Are you sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.$axios.$delete(`/rest/course?id=${id}`).then( r => {
          if(error(r)) {
            this.get();
          }
        }).catch((e) => {
          console.log(e);
        });
      }).catch(() => {});
    },
    toPage(page) {
      this.page = parseInt(page) || 1;
     // this.$scrollToElement('courses-table');
      process.browser ? window.scroll(0,0) : null;
      this.$router.replace(toQuery({
        page: this.page,
        keywords: this.searchKeywords,
        status: this.providerStatus,
        id: this.$store.state.mystore.currentProviderId,
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
