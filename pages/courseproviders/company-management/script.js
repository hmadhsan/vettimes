// import CKEditor from '@ckeditor/ckeditor5-vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import mixins from "../../../config/mixins";
import ProvidersOnly from "../../../components/providers-only"
import UserManagement from "../../user-management"
import Media from "../../../components/company-management-popup";
//import { VueEditor } from "vue2-editor";

export default {
  
  mixins: [ mixins.helpers ],
  name: 'appEditor',
  components: {
    // ckeditor: CKEditor.component,
  //  VueEditor,
    ProvidersOnly,
    UserManagement,
    Media
  },
  data() {
    return {
      media: null,
      dialogBox: false,
      dialogOpen: false,
      accept: {
        0: ".png,.jpg,.jpeg,.gif"
      },
      notAuth: false,
      // editor: ClassicEditor,
      // editorConfig: { toolbar: ["heading","bold","italic","underline", "|", "numberedList","bulletedList", "|", "alignment", "link", "undo", "redo"] },
      customToolbar: this.vueEditorCustomToolbar(),
      hasFocus: false,
      content: {
        logo_data: null,
        logo: null,
        provider_id: "",
        phoneCompany: '(0)1733 383534',
        emailCompany: 'cpd@vettimes.co.uk',
        name: {
          title: 'Name',
          content: ''
        },
        description: {
          title: 'Description',
          content: ''
        },
        overview: {
          title: 'Overview',
          content: ''
        },
        providerLogo: {
          title: 'Upload your provider logo',
          content: ''
        },
        cpd_certify: {
          title: 'Cpd Certify',
          // show: Boolean,
          content: ''
        },
        course_enquires_title: 'Contact details for general course enquiries',
        course_enquires: {
          contact_name: {
            name: 'Name',
            title: 'Contact name',
            content: ''
          },
          email: {
            name: 'Email',
            title: 'Email',
            content: ''
          },
          website: {
            name: 'Website',
            title: 'Website',
            content: ''
          },
          phone: {
            name: 'Telephone',
            title: 'Telephone',
            content: ''
          }
        }
      }
    }
  },
  created: function() {
    this.get();
  },
  methods: {
    /* onReady(editor)  {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    }, */
    get: function() {
      this.$axios.$get("/rest/provider?action=edit&_path=" + this.$route.path).then( r => {        
        if ( r.data ) {
          this.content.name.content = r.data.data.name;
          this.content.description.content = r.data.data.description;
          this.content.overview.content = r.data.data.overview;
          // this.content.cpd_certify.show = (this.$auth().role != 2) ? true : false;
          this.content.course_enquires.contact_name.content = r.data.data.contact;
          this.content.course_enquires.email.content = r.data.data.email;
          this.content.course_enquires.website.content = r.data.data.site;
          this.content.course_enquires.phone.content = r.data.data.phone;
          this.content.provider_id = r.data.data.id;
          this.content.logo_data = r.data.data.logo_data,
          this.content.logo = r.data.data.logo
        } else {
          this.notAuth = true;
        }
      })
    },
    formSubmit: function(e) {                  
      e.preventDefault();
      this.$axios.$put('/rest/provider', {
        name: this.content.name.content,
        description: this.content.description.content,
        overview: this.content.overview.content,
        cpd_certify: this.content.cpd_certify.content,
        contact: this.content.course_enquires.contact_name.content,
        email: this.content.course_enquires.email.content,
        site: this.content.course_enquires.website.content,
        phone: this.content.course_enquires.phone.content,
        logo: (this.content.logo_data) ? this.content.logo_data.id : null
      })
      .then( (r) => {
        if(r.data.message.email) {          
          this.$error(r.data, false, 0);
          return;
        }

        if( this.$error(r.data) ) {          
          this.$router.push('/courseproviders/courses/new');
          window.location.reload();
        }    
      });
    },
    change() {
      this.dialogBox = {
        name: "provider",
        id: this.content.provider_id,
        course_id: "",
        description: "",
        type: 0,
        allowAllRoles: true
      };
      this.dialogOpen = true;
    },
    remove() {
      this.$confirm("", "Are You sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.$axios.$delete("/rest/provider/remove/logo").then( r => {
          if ( this.$error(r.data) ) {
            this.get();
            this.dialogOpen = false;
          }
        });
      }).catch(() => {});
    },
    validateUrl: function(url, e) {      
      if( url ){ 
        url = url.replace('www.', '');
        if( !(url.substring(0, 8) == 'https://') && !(url.substring(0, 7) == 'http://') ) {
          url = 'https://' + url;           
        }

        this.content.course_enquires.website.content = url;
      }
    },
  }
}