export default function ({ $axios, redirect, app }, inject) {
window.onNuxtReady(() => {
    $axios.get("/rest/auth").then(res => {
        
        app.store.commit( "mystore/auth", ( !res.data || !res.data || !res.data.id ) ? false : res.data );
        app.$access($nuxt.$route);
      }).catch( () => {
        app.store.commit("mystore/auth");
        app.$access($nuxt.$route);
      });
})
}