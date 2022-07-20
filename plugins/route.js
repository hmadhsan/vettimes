export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from,next) => {
        app.store.commit('mystore/googleAnalyticsTagManager');
        if(app.store.state.mystore.auth === null || app.$access(to)) next();
    })
 }