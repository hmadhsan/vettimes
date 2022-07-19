import SocialButtons from "../footerSocialButtons"
import { cpdBaseUrl } from "~/config/constants";

export default {

  components: {
    SocialButtons
  },
  data() {
    return {
      footerMenuItems: [
        {
          title: 'Vet Times',
          url: 'https://www.vettimes.co.uk/'
        },
        {
          title: 'News',
          url: 'https://www.vettimes.co.uk/category/news/'
        },
        {
          title: 'Vets',
          url: 'https://www.vettimes.co.uk/category/vets/'
        },
        {
          title: 'RVNs',
          url: 'https://www.vettimes.co.uk/category/RVNs/'
        },
        {
          title: 'Business',
          className: '',
          url: 'https://www.vettimes.co.uk/category/business/'
        },
        {
          title: 'CPD',
          url: 'https://www.vettimes.co.uk/cpd/'
        },
        {
          title: 'Opinion',
          url: 'https://www.vettimes.co.uk/category/opinon/'
        },
        {
          title: 'Jobs',
          url: 'https://jobs.vettimes.co.uk/'
        },
        {
          title: 'Competitions',
          url: 'https://www.vettimes.co.uk/competitions/'
        },
        {
          title: 'Students',
          url: 'https://www.vettimes.co.uk/category/students/'
        }
      ],
      footerBotMenuItems: [
        {
          title: 'Courses',
          url: '/courses'
          
        },
        {
          title: 'Browse courses',
          url: '/browse-courses'
        },
        {
          title: 'Course providers',
          url: '/providers'
        },
        {
          title: 'CPD+',
          url: `${cpdBaseUrl}/cpd-plus`
        },
        {
          title: 'Terms & Conditions',
          url: `${cpdBaseUrl}/terms-and-conditions/`
        },
        {
          title: 'About us',
          url: '/info/about-us'
        },
      ],
      footerMenuProvider: [
        {
          title: 'Contact Us',
          url: '/info/contact-us'
        },
        {
          title: 'About us',
          url: '/info/about-us'
        },
        {
          title: 'Terms & Conditions',
          url: '/info/terms'
        },
        {
          title: 'Privacy policy',
          url: '/info/privacy-policy'
        }
      ]
    }
  },
  methods: {
    scrollToTopPage: function () {
      window.scrollTo(0, 0);
    },
    footerMenu: function () {
      if(this.$route.path.indexOf('courseproviders') === -1) {
        return this.footerMenuItems
      } else {
        return this.footerMenuProvider
      }
    }
  }
}