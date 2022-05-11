import EnquireEmail from "./index";
import store from "../../config/store"

export default {
  store,
  components: { EnquireEmail },
  props: ['course_id', 'provider_id'],
  data() {
    return {
      loadData: true,
      form: {
        course_id: this.$props.course_id,
        provider_id: this.$props.provider_id,
        type: 'email',
        email: '',
        message: ''
      },
      content: {
        "title" : "Make an enquiry",
        "labelEmail": "Your email address",
        "labelMessage": "Your message",
        "placeholderMessage": "Please send me more information about…",
        "description" : {
          "title": "Other marketing communication",
          "subtitle": "We'd love to send you information about courses and services from vet times CPD by email.",
          "checkboxes": [
            {
              "title": "I would like to receive emails sent directly from Vet Times CPD",
              "id": "PrivacyField_first-party-marketing-True",
              "name": "PrivacyField_first-party-marketing",
              "value": "true"
            },
            {
              "title": "I would like to receive emails from selected third parties",
              "id": "PrivacyField_third-party-marketing-True",
              "name": "PrivacyField_third-party-marketing",
              "value": "true"
            }
          ]
        },
        "termConditionsLink": "https://cpd.vettimes.co.uk/info/terms/"
      }
    }
  },
  computed: {

  },
  created: function () {
    window.addEventListener('keyup', this.closePopupByKeyboard)
  },
  methods: {
    closeEnquireEmailPopup: function() {
      store.commit({
        type: 'changeEnquireEmailDialog',
        dialog: false
      });
      document.body.style.overflow = '';
    },
    closePopup: function(e) {
      if(e.target.parentNode.classList.contains('ee-wrap')) {
        this.closeEnquireEmailPopup();
      }
    },
    closePopupByKeyboard: function(e) {
      if(e.keyCode == 27) {
        this.closeEnquireEmailPopup();
      }
    },
    submitForm: function (e) {
      e.preventDefault();
      this.http.put("leads"+this.$toQuery(this.form)).then( r => {
        if(r.data.error !== undefined) return this.$ntf(r.data.error);
        this.closeEnquireEmailPopup();
      });
    }
  }
}
