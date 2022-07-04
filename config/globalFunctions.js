import Vue from "vue";
import ElementUI from "../../../front-admin/src/config/element-ui";

let unknownError = "Something went wrong.";
export function ntf (obj)  {  
    if (typeof obj === "string") obj = { type: "error", message: obj };
    if (typeof obj !== "object") obj = { type: "error", message: unknownError };
    if (!obj.type) obj.type = "error";
    if (!obj.message) obj.message = unknownError;
    if (!obj.duration) obj.duration = 5000;
    ElementUI.Message({
      duration: obj.duration,
      message: obj.message,
      showClose: true,
      type: obj.type
    });
  };
  
  /**
   * Checking response data for error.
   * True - all right. Can move next.
   * Also show notification (message or error).
   *
   * @param data
   * @param {string|boolean} message
   *
   * @return {boolean}
   */
  export function error  (data, message = false, duration = 5000)  {    
    if (data.status && data.message) {
      ntf({
        message: data.message,
        type: "success",
        duration: duration
      });
      return true;
    }
  
    let res = false;
    
    if (data.error) {
      message = data.error;
    } else if (!data.status) {    
      if(data.valid) {
        message = '';
        if(typeof data.message === 'object') {
          for(let key in data.message) {
            message += key + ': ' + data.message[key] + '; ';
          }
        } else {
          message = data.message;
        }
  
      } else {      
        message = unknownError;
      }
    } else {
      res = true;
    }
    
    if(duration === 0) {ntf({ message: message, type: "error", duration: duration }); return res;}
    if (res && message) ntf({ message: message, type: "success", duration });
    if (!res) ntf(message);
  
    return res;
  };

  export function isStar (id) {
    if(this.$store.state.mystore.auth) {
      return this.$store.state.mystore.stars.indexOf(id) >= 0;
    } else {
      return false;
    }
  }

  export function scrollToTop () {
    process.browser ? window.scrollTo(0, 0) : null;
  };

  export function toQuery (obj) {
    return "?"+ Object.keys(obj)
    .map(key => key + "=" + (obj[key] || ""))
    .join("&")
  };

  export function isEmptyObj ( obj ) {
    for (var key in obj) {
      return false;
    }
    return true;
  };


  export function load (num = -1) {
    this.$store.commit("mystore/load", num === 1 ? 1 : -1);
  };

  export function auth ()  {
    return this.$store.state.mystore.auth;
  };
  
  export function rank ()  {
    return this.$store.state.mystore.auth ? this.$store.state.mystore.auth.rank : -1;
  };

  export function access (to) {
    let auth = this.$store.state.mystore.auth;
    if (auth === null) return false;
  
    const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
    if(!!to.meta.auth) {
      if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0 && process.browser) {
        return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
      }
    }
    process.browser ? document.title = to.name : null;
    return true;
  };

  export function providers(key) {
    if ( !key || key.length < 2 ) return this.$store.state.mystore.providers = [];
    this.$axios.$get('/rest/providers/live?keyword='+key).then( r => {
      this.$store.commit('mystore/providers', r.status ? r.array : {});
    });
  };

  export function scrollToElement(id){
    let elem;
    process.browser ? elem = document.getElementById(id) : null;
    let coords = elem.getBoundingClientRect();
    process.browser ? window.scrollTo(0, coords.top + pageYOffset) : null;
  };
  
  export function unique(arr) {
    return arr.filter( (value, index, self) => {
      return self.indexOf(value) === index;
    });
  };




  /** Open Media popup */
  export function mediaOpen  (form, key, type)  {
  this.$store.commit("mystore/media", {
    form: form, // Form of page, witch will update
    key: key,   // Key in form
    type: type  // Media type: 0, 1, 2
  });
};

/** Clear Media field */
  export function mediaClear (form, key)  {
  form[key] = null;
  form[key+"_data"] = null;
};

/** Get Lead name */
export const leads = {
  "-1": "All",
  0: "View",
  1: "Book",
  2: "Email",
  3: "Phone",
  4: "Web",
  5: "CBE",
  6: "Alert"
};

export function truncate (text, max) {
  return (typeof text === 'string' && text.length > max ? text.substring(0,max)+'...' : text);
};
