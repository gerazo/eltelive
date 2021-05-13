import Vue from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap';
import './assets/app.scss';

Vue.config.productionTip = false;

Vue.component('NavBar',require('./components/common/nav-bar.vue').default);
Vue.component('Footer',require('./components/common/footer.vue').default);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
