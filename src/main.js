import '@babel/polyfill'
import Vue from "vue";
import './plugins/bootstrap-vue'
import Vuebar from "vuebar";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuebar);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

document.addEventListener("contextmenu", event => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener("mousedown", e => {
  e.preventDefault();
});
