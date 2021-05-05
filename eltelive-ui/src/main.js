import Vue from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap';
import './assets/app.scss';
import Notifications from 'vue-notification';
Vue.config.productionTip = false;

Vue.component('NavBar',require('./eltelive-frontend/components/common/nav-bar.vue').default);
Vue.component('Footer',require('./eltelive-frontend/components/common/footer.vue').default);
Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
