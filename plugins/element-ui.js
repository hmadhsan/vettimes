import Vue from 'vue'
import ElementUI  from 'element-ui'
import {MessageBox, Message} from 'element-ui'
// import "../config/filters";
// import "../config/prototypes";
// import "../config/http";

Vue.use(ElementUI);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;