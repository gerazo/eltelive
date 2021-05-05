import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./eltelive-frontend/components/home-page'),
    },
    {
      path: '/home',
      component: () => import('./eltelive-frontend/components/home-page'),
    },
    {
      path: '/about',
      component: () => import('./eltelive-frontend/components/about-us'),
    },
    {
      path: '/contact',
      component: () => import('./eltelive-frontend/components/contact-us'),
    },
    {
      path: '/signup',
      component: () => import('./eltelive-frontend/components/user/sign-up'),
    },
    {
      path: '/guest',
      component: () => import('./eltelive-frontend/components/user/login-as-guest'),
    },
    {
      path: '/login',
      component: () => import('./eltelive-frontend/components/user/login'),
    },
    {
      path: '/active-streams',
      component: () => import('./eltelive-frontend/components/stream/active-streams'),
    },
    {
      path: '/change-password',
      component: () => import('./eltelive-frontend/components/user/change-password'),
    },
    {
      path: '/legal-disclaimer',
      component: () => import('./eltelive-frontend/components/legal-disclaimer'),
    },
    {
      path: "**",
      component: () => import('./eltelive-frontend/components/not-found-page'),
    }
  ]
})
