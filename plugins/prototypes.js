import Vue from "vue";

import ElementUI from "../../../front-admin/src/config/element-ui";

let unknownError = "Something went wrong.";

export default (context, inject) => {
const auth = () => {
  return context.store.state.mystore.auth;
}
inject('auth', auth)
context.$auth = auth

const rank = () => {
  return context.store.state.mystore.auth ? context.store.state.mystore.auth.rank : -1;
}
inject('rank', rank)
context.$rank = rank

// Vue.prototype.$CSRF = document.querySelector('meta[name="csrf_token"]').content;

/**
 * Global loader popup for ajax request
 *
 * @param num {number}
 */

const load = (num = -1) => {
  console.log("here")
  context.store.commit("mystore/load", num === 1 ? 1 : -1);
}
inject('load', load)
context.$load = load

/**
 * Route permission validation
 *
 * @return boolean
 */
const access = to => {
  
  console.log("here")
  console.log(context)
  let auth = context.store.state.mystore.auth;
  if (auth === null) return false;

  const names = ['Your Courses', 'Edit Alert', 'Privacy Dashboard'];
  if(!!to.meta.auth) {
    if(to.meta.auth.indexOf(auth.role) === -1 && names.indexOf(to.name) >= 0) {
      return location.href = 'https://my.vettimes.co.uk/login?redirectTo='+window.location.href;
    }
  }
  document.title = to.name;
  return true;
}
inject('access', access)
context.$access = access

const ntf = obj => { 
  console.log("here") 
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
}
inject('ntf', ntf)
context.$ntf = ntf

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
const error = (data, message = false, duration = 5000) => {    
  console.log("here")
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
}
inject('error', error)
context.$error = error


/** Get Live Providers array from API */
const providers = key => {
  console.log("here")
  
  if ( !key || key.length < 2 ) return context.store.state.mystore.providers = [];
  context.$axios.get('/rest/providers/live?keyword='+key).then( r => {
    context.store.commit('mystore/providers', r.status ? r.array : {});
  });
}
inject('providers', providers)
context.$providers = providers

const isEmptyObj = obj => {
  console.log("here")
  for (var key in obj) {
    return false;
  }
  return true;
};
inject('isEmptyObj', isEmptyObj)
context.$isEmptyObj = isEmptyObj

const toQuery = obj => {
  console.log("here")
  return "?"+ Object.keys(obj)
  .map(key => key + "=" + (obj[key] || ""))
  .join("&")
};
inject('toQuery', toQuery)
context.$toQuery = toQuery

const scrollToTop = () => {
  console.log("here")
  window.scrollTo(0, 0);
};
inject('scrollToTop', scrollToTop)
context.$scrollToTop = scrollToTop

const scrollToElement = (id) => {
  console.log("here")
  let elem = document.getElementById(id);
  let coords = elem.getBoundingClientRect();
  window.scrollTo(0, coords.top + pageYOffset);
};
inject('scrollToElement', scrollToElement)
context.$scrollToElement = scrollToElement

const unique = function(arr) {
  console.log("here")
  return arr.filter( (value, index, self) => {
    return self.indexOf(value) === index;
  });
};
inject('unique', unique)
context.$unique = unique

/** Open Media popup */
const mediaOpen = (form, key, type) => {
  console.log("here")
  context.store.commit("mystore/media", {
    form: form, // Form of page, witch will update
    key: key,   // Key in form
    type: type  // Media type: 0, 1, 2
  });
};
inject('mediaOpen', mediaOpen)
context.$mediaOpen = mediaOpen

/** Clear Media field */
const mediaClear = (form, key) => {
  console.log("here")
  form[key] = null;
  form[key+"_data"] = null;
};
inject('mediaClear', mediaClear)
context.$mediaClear = mediaClear

/** Get Lead name */
const leads = {
  "-1": "All",
  0: "View",
  1: "Book",
  2: "Email",
  3: "Phone",
  4: "Web",
  5: "CBE",
  6: "Alert"
};
inject('leads', leads)
context.$leads = leads

const truncate = function(text, max) {
  console.log("here")
  return (typeof text === 'string' && text.length > max ? text.substring(0,max)+'...' : text);
};
inject('truncate', truncate)
context.truncate = truncate

console.log("CONTEXT=====>",context)

}
