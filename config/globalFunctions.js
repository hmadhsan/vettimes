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