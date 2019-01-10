import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

document.addEventListener('contextmenu', event => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener('mousedown', e => {
  e.preventDefault();
})