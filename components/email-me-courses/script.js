import store from '../../config/store';

export default {
    store,
    props: ['keywords'],
    data() {
      return {
        content: {
          "title" : "Get new courses for this search by email",
          "placeholderMessage": "Your email",
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
        },
        form: {
          email: '',
          value: '',
          frequency: 'Daily',
          received: '1',
          action: 'addAlert'
        }
      }
    },
    created: function() {
      if(store.state.auth) {
        this.form.email = store.state.auth.email
      }
    },
    methods: {
      userAlerts: function() {
        this.http.post('useralerts', this.form).then( r => {
          this.$error(r.data);
        }).catch((e) => {
          console.log(e);
        });
      },
      submitForm: function () {        
        this.form.value = this.$attrs.value.slice();
        this.userAlerts();
        this.$parent.$parent.popoverVisible = false;
      }
    }
}