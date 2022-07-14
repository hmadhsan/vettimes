import { cpdBaseUrl } from "~/config/constants";
import axios from "axios";
axios.interceptors.response.use(response => response, () => {});

export default function ({ $axios, redirect, app }, inject) {
  
    // Create a custom axios instance
    const axios = $axios.create({
        baseURL: cpdBaseUrl+"/",
        headers: { 'X-CSRF-TOKEN': app.$csrfToken() },
        // transformRequest: (data, headers) => {
        // //   this.$load(1);
        //   return axios.defaults.transformRequest[0](data, headers);
        // },
        transformResponse: (data, headers) => {
          app.$load();
        
          if(!!headers.title && headers.title !== '' && !!headers.path) {
            // document.title = headers.title;
            setTimeout(() =>{
            document.title = headers.title;
            }, 100);
          }
          try {
            return JSON.parse(data);
          } catch (e) {
            app.$error({});
          }
        }
      });

    inject("axios", axios);


    console.log("APP=======>",app)




  }