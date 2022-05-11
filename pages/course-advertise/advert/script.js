import mixins from "../../../config/mixins";
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MessageInfo from "../../../components/message-info";
import Payment from "./payment"
import { VueEditor } from "vue2-editor";

export default {
  mixins: [ mixins.helpers ],
  components: {
    // ckeditor: CKEditor.component,
    VueEditor,
    MessageInfo,
    Payment
  },
  data() {    

    var vm = this;

    return {
      pickerOptions: {
        disabledDate(time) {
          
          let from = new Date(vm.form.posting_from);
          if( time < from ) {
            return time;
          }
          
          // let to = new Date(from.setMonth(from.getMonth() + 12));
          let to = new Date(from.setMonth(from.getMonth() + 6));
          if( time > new Date(to) ) {
            return time;
          }        

        }
      },
      // editor: ClassicEditor,
      // editorConfig: { toolbar: ["heading","bold","italic","underline", "|", "numberedList","bulletedList", "|", "alignment", "link", "undo", "redo"] },
      customToolbar: this.vueEditorCustomToolbar(),
      dataUpdateSuccess: false,
      dataUpdateError: false,
      form: {},
      advertType: false,
      advertOldType: '',
      html: false,
      load: "Loading...",
      products: {},
      credits: {},
      prices: {},
      purchaseCreditsInfo: 'Call us on (0)1733 383534 to purchase credits',
      adwProduct: false,
      disableDatepicker: true,
      rules: {
        adwProduct: false,
        title: false,
        startDate: false,
        delivery: false,
        atLeast: false,
        advert: false,
        description: false
      },
      addCredits: false,
      disableFP: true,
      disableFPC: true,
      disableFromDate: false,
      disableToDate: true,
      maxToDate: ''
    }
  },
  watch: {
    'dataUpdateError': '$scrollToTop',
    'dataUpdateSuccess': '$scrollToTop'
  },
  mounted: function () {
    this.$nextTick(function () {
      this.get();
    });
    this.http.get('user/f-providers').then(r => {
      if ( Array.isArray(r.data) ) {
        this.disableFPC = r.data.length > 2;
        this.disableFP = r.data.length > 2;
        if ( this.disableFP ) return;
        r.data.forEach(item => {
          if ( parseInt(item.provider) === this.$auth().provider_id ) this.disableFP = true;
        })
      }
    });
  },
  computed: {
    deliveryMethod () {
      return !(["Online","Distance"].indexOf(this.form.delivery_method) > -1);
    }
  },
  methods: {
    get: function(credits = false) {      
      this.http.get("course/info?id="+this.$parent.info.id + "&_path=/courseproviders/courses").then(r => {
        if (this.$error(r.data)) {          
          if ( credits ) {
            this.credits = r.data.credits;
            return;
          }
          this.prices = r.data.prices;
          this.form = r.data.data;
          this.products = r.data.products;
          this.credits = r.data.credits;
          // this.$parent.showPublishButton = !this.isEmptyObj(this.credits);
          this.advertOldType = this.form.product_id;
          if(this.form.status == 1 || this.form.status == 4) this.disableFromDate = true; this.disableToDate = true;
          if(this.form.status == 2 && this.form.posting_to) this.disableToDate = false;
          if ( !this.form.product_id ) this.form.product_id = 9;          
        } else {
          this.load = "Nothing Found."
        }
      }).catch(e => {
        console.log(e);
      });
    },
    checkCredit: function(id) {
      return this.form.product_id === id;
    },
    disableCredit: function(id) {
      return !this.credits[id];
    },
    onChange: function (e) {
      this.advertType = true;
      this.form.product_id = parseInt(e.target.value);
    },
    checkRequiredField: function() {
      this.dataUpdateError = false;

      this.rules = {
        title: false,
        adwProduct: false,
        startDate: false,
        delivery: false,
        booking_url: false,
        atLeast: false,
        advert: false,
        description: false
      };

      let flag = false;

      if( this.form.product_id === null ) {
        this.$refs.adwProduct.focus();
        this.rules.adwProduct = true;
        flag = true;
      } else if (!this.form.title) {
        this.$refs.title.focus();
        this.rules.title = true;
        flag = true;
      } else if (this.form.delivery_start_if && !this.form.delivery_start) {
        this.$refs.startDate.focus();
        this.rules.startDate = true;
        flag = true;
      } else if (!this.form.description) {
        this.$refs.description.focus();
        this.rules.description = true;
        flag = true;
      } else if (!this.form.delivery_method) {
        this.$refs.delivery.focus();
        this.rules.delivery = true;
        flag = true;
      } else if (!this.form.booking_url) {
        this.$refs.booking_url.focus();
        this.rules.booking_url = true;
        flag = true;
      } else if (!this.form.email && !this.form.site && !this.form.phone) {
        this.$refs.atLeast.focus();
        this.rules.atLeast = true;
        flag = true;
      } else if (!this.form.posting_from || !this.form.posting_to) {
        this.rules.advert = true;
        flag = true;
      } 

      return !flag;
    },
    submit(e) {
      if ( true !== e ) e.preventDefault();

      // if(this.isEmptyObj(this.credits)) {
      //   return false;
      // }

      let check = this.checkRequiredField();

      if(check) {
        if(this.advertType && this.form.product_id !== this.advertOldType) {
          if (this.advertOldType !== null && this.advertOldType !== '') {
            this.form['productQuantity'] = {
              'used': this.credits[this.form.product_id].used + 1,
              'id': this.credits[this.form.product_id].id
            };
          }
          this.advertType = false;
        }

        //console.log('put')
        this.http.put("course", this.form).then( r => {
          if (this.$error(r.data)) {
            //if(r.data.status) {
              // this.dataUpdateSuccess = 'The course details have been saved. To make your course live on the site, you must use the <strong>"Publish"</strong> button. A single credit will be taken from your balance. If you do not have any credits, please call us on <a href="callto:(0)1733 383534">(0)1733 383534</a> or email <a href="mailto:cpd@vettimes.co.uk">cpd@vettimes.co.uk</a> to purchase credits.'
            //}
            if ( true === e ) {
              // window.location.href = this.$router.currentRoute.fullPath.replace('/details', '/categorisation');
              this.$parent.activeTab('details', 'categorisation'); this.$parent.activeTabCategorisation = true;
            } else {
              this.$parent.get();
            }
          }
        }).catch(e => {
          //console.log(e)
        });
      }
    },
    addMonthsForTo: function() {
      let from = new Date(this.form.posting_from);
      // let to = new Date(from.setMonth(from.getMonth() + 12));
      let to = new Date(from.setMonth(from.getMonth() + 6));
      
      this.form.posting_to = this.maxToDate = to.getFullYear() + '-' + ('0'+(to.getMonth()+1)).slice(-2) + '-' + ('0'+(to.getDate())).slice(-2);
      this.disableToDate = false;
    }
  }
}