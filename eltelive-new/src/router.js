import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./components/home-page'),
    },
    {
      path: '/about',
      component: () => import('./components/about-us'),
    },
    {
      path: '/contact',
      component: () => import('./components/contact-us'),
    },
    {
      path: '/signup',
      component: () => import('./components/user/sign-up'),
    },
    {
      path: '/guest',
      component: () => import('./components/user/login-as-guest'),
    },
    {
      path: '/login',
      component: () => import('./components/user/login'),
    },
    {
      path: '/active-streams',
      component: () => import('./components/stream/active-streams'),
    },
    {
      path: '/change-password',
      component: () => import('./components/user/change-password'),
    },
    {
      path: "**",
      component: () => import('./components/not-found-page'),
    }
  ]
})
