import Vue from "vue";
import store from "./store2";
import router from "./routes";
import ElementUI from "../../../front-admin/src/config/element-ui";

let unknownError = "Something went wrong.";

Vue.prototype.$auth = () => {
  return store.state.auth;
};

Vue.prototype.$rank = () => {
  return store.state.auth ? store.state.auth.rank : -1;
};

Vue.prototype.$CSRF = document.querySelector('meta[name="csrf_token"]').content;

/**
 * Global loader popup for ajax request
 *
 * @param num {number}
 */

Vue.prototype.$load = (num = -1) => {
  store.commit("load", num === 1 ? 1 : -1);
};

/**
 * Route permission validation
 *
 * @return boolean
 */
Vue.prototype.$access = to => {
  let auth = store.state.auth;
  if (auth === null) return false;

  const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
  if(!!to.meta.auth) {
    if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0) {
      return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
    }
  }
  document.title = to.name;
  return true;
};

Vue.prototype.$ntf = obj => {  
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
Vue.prototype.$error = (data, message = false, duration = 5000) => {    
  if (data.status && data.message) {
    Vue.prototype.$ntf({
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
  
  if(duration === 0) {Vue.prototype.$ntf({ message: message, type: "error", duration: duration }); return res;}
  if (res && message) Vue.prototype.$ntf({ message: message, type: "success", duration });
  if (!res) Vue.prototype.$ntf(message);

  return res;
};

/** Get Live Providers array from API */
Vue.prototype.$providers = key => {
  if ( !key || key.length < 2 ) return store.state.providers = [];
  Vue.prototype.http.get('providers/live?keyword='+key).then( r => {
    store.commit('providers', r.data.status ? r.data.array : {});
  });
};

Vue.prototype.isEmptyObj = obj => {
  for (var key in obj) {
    return false;
  }
  return true;
};

Vue.prototype.$toQuery = obj => {
  return "?"+ Object.keys(obj)
  .map(key => key + "=" + (obj[key] || ""))
  .join("&")
};

Vue.prototype.$scrollToTop = () => {
  window.scrollTo(0, 0);
};

Vue.prototype.$scrollToElement = (id) => {
  let elem = document.getElementById(id);
  let coords = elem.getBoundingClientRect();
  window.scrollTo(0, coords.top + pageYOffset);
};

Vue.prototype.$unique = function(arr) {
  return arr.filter( (value, index, self) => {
    return self.indexOf(value) === index;
  });
};

/** Open Media popup */
Vue.prototype.$mediaOpen = (form, key, type) => {
  store.commit("media", {
    form: form, // Form of page, witch will update
    key: key,   // Key in form
    type: type  // Media type: 0, 1, 2
  });
};

/** Clear Media field */
Vue.prototype.$mediaClear = (form, key) => {
  form[key] = null;
  form[key+"_data"] = null;
};

/** Get Lead name */
Vue.prototype.$leads = {
  "-1": "All",
  0: "View",
  1: "Book",
  2: "Email",
  3: "Phone",
  4: "Web",
  5: "CBE",
  6: "Alert"
};

Vue.prototype.truncate = function(text, max) {
  return (typeof text === 'string' && text.length > max ? text.substring(0,max)+'...' : text);
};
