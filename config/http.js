import Vue from "vue";
import axios from "axios";

axios.interceptors.response.use(response => response, () => {});

Vue.prototype.http = axios.create({
  baseURL: process.env.BASE_URL + "rest/",
  headers: { 'X-CSRF-TOKEN': Vue.prototype.$CSRF },
  transformRequest: (data, headers) => {
    Vue.prototype.$load(1);
    return axios.defaults.transformRequest[0](data, headers);
  },
  transformResponse: (data, headers) => {
    Vue.prototype.$load();
    if(!!headers.title && headers.title !== '' && !!headers.path) {
      // document.title = headers.title;
      setTimeout(() =>{
        document.title = headers.title;
      }, 100);
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      Vue.prototype.$error({});
    }
  }
});
