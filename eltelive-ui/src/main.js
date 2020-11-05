import Vue from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap';
import './assets/app.scss';
Vue.config.productionTip = false
;

Vue.component('NavBar',require('./components/NavBar.vue').default);
Vue.component('Footer',require('./components/Footer.vue').default);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

