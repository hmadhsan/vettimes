import { cpdBaseUrl } from "~/config/constants";
export default function ({ $axios, redirect, app }, inject) {
window.onNuxtReady(() => {
    $axios.get(`${cpdBaseUrl}/rest/auth`).then(res => {
        
        app.store.commit( "mystore/auth", ( !res.data || !res.data || !res.data.id ) ? false : res.data );
        app.$access($nuxt.$route);
        getCourses()
        getCreditBalance()
      }).catch( () => {
        app.store.commit("mystore/auth");
        app.$access($nuxt.$route);
      });
})
function getCourses() {
  
      let auth = app.store.state.mystore.auth;
  
  
      if(!auth) {
        return false;
      }
  
      let roles = [1,4];
  
      if(roles.indexOf(auth.role) >= 0 ) {
        $axios.post(`${cpdBaseUrl}/rest/usercourses`, {  action: 'getCourses' }).then( r => {
          app.store.commit({
            type: 'mystore/changeStars',
            stars: r
          });
        }).catch((e) => {
          console.log(e);
        });
      }
    }
    function getCreditBalance(){
      
      let auth = app.store.state.mystore.auth;
      if(!auth) {
        return false;
      }
  
      let roles = [2,3];
  
      if(roles.indexOf(auth.role) >= 0 ) {
        $axios.get(`${cpdBaseUrl}/rest/credits`).then( r => {
          app.store.commit('mystore/setCredits', r.data);
        }).catch((e) => {
          console.log(e);
        });
      }
    }
}