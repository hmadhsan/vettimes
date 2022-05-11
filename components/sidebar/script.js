export default {
  
  methods: {
    filterParentTabs: function() {
      let tabs = {};                  
      for(let key in this.$parent.tabs){      
        if(key === 'leads' && !this.$parent.tabLeadsOnlyPlatinum) continue;
        tabs[key] = this.$parent.tabs[key];
      }
      return tabs;
    },
    change(item) {
      if ( typeof this.$parent.setActive === "function" ) {
        this.$parent.setActive(item);        
      }
    },
    getClass(item) {
      
      if(item.toLowerCase() === this.$parent.tab.toLowerCase()) return 'list-nav__item_active';
      
      if( item == 'Advert' ) {  return { 'disabled': !this.$parent.activeTabAdvert, 'list-nav__item_tick' : this.$parent.activeTabCategorisation } } 

      else if( item == 'Categorisation' ) { return { 'disabled': !this.$parent.activeTabCategorisation, 'list-nav__item_tick' : this.$parent.activeTabAdditionalDates } } 

      else if( item == 'Additional Dates' ) { return { 'disabled': !this.$parent.activeTabAdditionalDates, 'list-nav__item_tick' : this.$parent.activeTabAttachments } } 

      else if( item == 'Attachments' ) { return { 'disabled': !this.$parent.activeTabAttachments, 'list-nav__item_tick' : this.$parent.activeTabEnhancements } } 

      else if( item == 'Enhancements' ) { return { 'disabled': !this.$parent.activeTabEnhancements } } 
    }
  }
}
 