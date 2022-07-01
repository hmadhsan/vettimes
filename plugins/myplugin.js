import Vue from 'vue';
// your imported custom plugin or in this scenario the 'vue-session' plugin
import VueSession from 'vue-session';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang);

// Vue.use(Message,{locale})
// Vue.use(MessageBox,{locale})

Vue.use(VueSession);