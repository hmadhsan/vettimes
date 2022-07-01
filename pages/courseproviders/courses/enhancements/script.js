import mixins from "../../../../config/mixins";
// import CKEditor from '@ckeditor/ckeditor5-vue';
import MessageInfo from "../../../../components/message-info";
import Payment from "./payment";
import Loader from "../../../../components/loader";
import {loadStripe} from '@stripe/stripe-js';
import { error } from "~/config/globalFunctions";
export default {
  mixins: [ mixins.helpers ],
  components: {
    // ckeditor: CKEditor.component,
    MessageInfo,
    Payment,
    Loader
  },
  data() {    
    return {
      addCredits: false,
      advertOldType: '',
      credits: {},
      form: {},
      products: {},
      prices: {},
      load: "Loading...",
      loading: false,      
      last_subscription_plan: '',
      old_subscription_plan: '',
      subscription_plan: '9', // default free package
      course_id: this.$route.params.id,
      changeThemeBronze: '',
      changeThemeSilver: '',
      changeThemeGold: '',
      // changeThemePlatinum: '',
      bronzePackage: false,
      silverPackage: false,
      goldPackage: false,
      // platinumPackage: false,
      vatPercentage: 20,
      vatPrice: 0,
      packagePrice: 0,
      packageName: 'Free',
      totalPrice: 0,
      cardElement: '',
      cardholderName: '',
      provider: '',
      invoice_no: '',
      invoice: '',
      paymentSection: true,
      showButtonPublish: false,
      ecommerce: true,
      haveCredit: false,
      paymentIntent: null 
    }
  },
  mounted: function () {    
    this.$nextTick(function () {
        this.scrollToTop();
        this.get();
        this.mountStripe();
    });
  },
  updated: function () {},
  computed: {},
  methods: {
    scrollToTop (){
      process.browser ? window.scrollTo(0, 0) : null;
    },
    get: function(credits = false) {   
      
      this.$axios.$get("/rest/course/info?id=" + this.course_id + "&_path=/courseproviders/courses").then(r => {          
      if (error(r)) {
        
          if ( credits ) {
            this.credits = r.credits;
            return;
          }
          console.log("PRICE=====>",r.prices)
          this.prices = r.prices;
          this.form = r.data;
          this.products = r.products;
          this.credits = r.credits;
          this.provider = r.provider;
          this.invoice_no = r.invoice;
          this.last_subscription_plan = r.data.product_id;
          
          this.invoiceNo();
          // this.$parent.showPublishButton = !this.isEmptyObj(this.credits);
          this.advertOldType = this.form.product_id;
          if ( !this.form.product_id ) this.form.product_id = '9';
          
          if( this.last_subscription_plan ) this.setTheme(this.last_subscription_plan);
      } else {
          this.load = "Nothing Found."
      }
      }).catch(e => {
        console.log(e);
      });
    },
    mountStripe: async function() {
      // this.stripe = await loadStripe('pk_live_kSJZY8Ilm38Cq98vsKD5hCWD00zeNlkwhi'); 
      this.stripe = await loadStripe('pk_test_0PA9VM8o1d6aLbMIvtQ9vhCP00dM96abyo');  
      var elements = this.stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    },
    setTheme: function(subs_package) {            
        this.last_subscription_plan = subs_package;
        this.resetTheme();
        this.changeTheme();
        this.updateThemeValues();
        this.havePackageCredit();
        this.updatePaymentDetailValues();
    },
    resetTheme: function() {
      this.changeThemeBronze = this.changeThemeSilver = this.changeThemeGold /* = this.changeThemePlatinum */ = '';
      this.bronzePackage = this.silverPackage = this.goldPackage /* = this.platinumPackage */ = false;
      this.subscription_plan = '9';
    },
    changeTheme: function() {
      let theme = 'selected-package';
      if(this.last_subscription_plan == '1') { this.changeThemeBronze = theme; this.bronzePackage = !this.bronzePackage }
      else if(this.last_subscription_plan == '2') { this.changeThemeSilver = theme; this.silverPackage = !this.silverPackage }
      else if(this.last_subscription_plan == '8') { this.changeThemeGold = theme; this.goldPackage = !this.goldPackage }
      // else if(this.last_subscription_plan == '4') { this.changeThemePlatinum = theme; this.platinumPackage = !this.platinumPackage }
    },
    updateThemeValues: function() {
      this.subscription_plan = (this.last_subscription_plan) ? this.last_subscription_plan : '9';
      // when toggle subscription plan
      if(this.old_subscription_plan == this.subscription_plan) { this.resetTheme(); }
      this.old_subscription_plan = this.subscription_plan;
    },
    havePackageCredit: function() {            
      if( this.credits.product_ids && this.credits.product_ids[this.subscription_plan] == this.subscription_plan) {
        this.haveCredit = true; 
        this.hidePaymentSection();
      } else {
        this.showPaymentSection();
      }      
    },
    updatePaymentDetailValues: function () {
      let subs_package = this.subscription_plan;

      if( subs_package == '9' ) {
        this.hidePaymentSection();
        return;
      } 
      
      let price = this.prices['t' + subs_package];      
      this.packageName = this.products.title[subs_package];
      this.packagePrice = price;
      this.vatPrice = (this.vatPercentage/100) * price;
      this.totalPrice = price + this.vatPrice;
    },
    showPaymentSection() {
      this.paymentSection = true; this.showButtonPublish = false;
    },
    hidePaymentSection() {
      this.paymentSection = false; this.showButtonPublish = true;
    },
    chargePayment: function () {      
      var error = [];
      var el = this;

      if( this.cardholderName == '' ) {
        error['error'] = 'Card holder name is required';
        error(error);
      } else {        
        this.loading = true;        
         
        this.$axios.$post("/rest/user/payment-intent",
          { price: this.totalPrice, invoice: this.invoice, provider: this.provider, package: this.packageName }
          ).then(r => {         
          if (r) {
            
            var clientSecret = r.client_secret;
            this.paymentIntent = r.payment_intent;
            
            this.stripe.handleCardPayment(
              clientSecret, this.cardElement, {
                payment_method_data: {
                  billing_details: {name: this.cardholderName}
                }
              }
            ).then(function(result) {
              if (result.error) {
                error['error'] = result.error.message; 
                el.$error(error);                                
              } else {
                el.userCredit(clientSecret);
              }
              el.loading = false;
            });
          } else {
            this.loading = false;
          }

          }).catch(e => {
            console.log(e);

            error['error'] = 'Something went wrong please try again.';
            error(error);
            this.loading = false;
        });
      }
      
    },
    userCredit: function(clientSecret) {
      this.$axios.$post('/rest/user/credits',
        { product_id: this.subscription_plan, quantity: 1, token: clientSecret, course_id: this.course_id, invoice: this.invoice })
        .then( r => {
        if ( error(r) ) {
          this.get(true);
          this.setStatus(1, false);
          this.sendPaymentInfo();
        } else {
          error['error'] = 'Error: Something went wrong with user credits'; error(error);
        }
      }).catch(e => {
        console.log(e);
      });
    },
    sendEmailAboutJob: function() {      
      this.$axios.$post('/rest/course/send-email-about-job', 
        { data: this.form, product: { id: this.subscription_plan, name: this.packageName } })
        .then( r => {})
        .catch(e => {
          console.log(e);
        });
    },
    setStatus(value, popup = true) {

      if( popup ) {
        this.$confirm("", "Are you sure?", {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(() => {
          this.setCourseStatus(value);
        }).catch(() => {});
      } else {
        this.setCourseStatus(value);
      }

    },
    setCourseStatus(value) {
      this.$axios.$put("/rest/course/status", { id: this.course_id, value: value, selected_product: this.subscription_plan })
      .then( r => {
        if(error(r)) {
          if( this.subscription_plan == '2' || this.subscription_plan == '8' ) this.sendEmailAboutJob();
          this.$router.push('/courseproviders/courses');
          // process.browser ? window.location.reload() : null;
        }
      }).catch(e => {
          console.log(e);
      });
    },
    sendPaymentInfo: function() {
      this.$axios.$post('/rest/course/send-invoice', { form: this.form, provider: this.provider, packageName: this.packageName, invoice: this.invoice, packagePrice: this.packagePrice, vatPrice: this.vatPrice, paymentIntent: this.paymentIntent, cardHolder: this.cardholderName })
      .then( r => {
        error(r);
      }).catch(e => {
        console.log(e);
      });
    },
    saveEnhancement: function() {
      this.$axios.$post('/rest/course/enhancement',
      { 
        product_id:   this.subscription_plan,
        course_id:    this.course_id
      }
      ).then( r => {    
        error(r);
      }).catch(e => {
        console.log(e);
      });
    },
    invoiceNo: function() {
      let split = (this.provider.name.split(' ')[0]).toUpperCase();
      this.invoice = split.substring(0, 3) + '_' + this.invoice_no;
    },
    close: function() {
      // this.saveEnhancement();
      this.$router.push('/courseproviders/courses');
    }
  }  
}