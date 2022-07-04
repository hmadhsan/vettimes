import Vue from "vue";
import axios from "axios";

axios.interceptors.response.use(response => response, () => {});
export default (context, inject) => {
const http = axios.create({
  baseURL: process.env.BASE_URL + "rest/",
  // headers: { 'X-CSRF-TOKEN': this.$csrfToken() },
  transformRequest: (data, headers) => {
    this.$load(1);
    return axios.defaults.transformRequest[0](data, headers);
  },
  transformResponse: (data, headers) => {
    this.$load();
    if(!!headers.title && headers.title !== '' && !!headers.path) {
      // document.title = headers.title;
      setTimeout(() =>{
        document.title = headers.title;
      }, 100);
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      this.error({});
    }
  }
});
inject('http', http)
context.$http = http
}