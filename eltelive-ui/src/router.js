import Vue from 'vue';
import Router from 'vue-router';

import HomePageComponent from '@/eltelive-frontend/components/home-page';
import AboutComponent from '@//eltelive-frontend/components/about-us';
import ContactComponent from '@/eltelive-frontend/components/contact-us';
import SignUpComponent from '@/eltelive-frontend/components/user/sign-up';
import GuestComponent from '@/eltelive-frontend/components/user/login-as-guest';
import ProfileComponent from '@/eltelive-frontend/components/user/profile';
import LoginComponent from '@/eltelive-frontend/components/user/login';
import LegalDisclaimer from '@/eltelive-frontend/components/legal-disclaimer';
import ActiveStreamsComponent from '@/eltelive-frontend/components/stream/active-streams'
import NotFoundComponent from '@/eltelive-frontend/components/not-found-page';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: HomePageComponent,
    },
    {
      path: '/home',
      component: HomePageComponent,
    },
    {
      path: '/about',
      component: AboutComponent,
    },
    {
      path: '/contact',
      component: ContactComponent,
    },
    {
      path: '/signup',
      component: SignUpComponent,
    },
    {
      path: '/guest',
      component: GuestComponent,
    },
    {
      path: '/profile',
      component: ProfileComponent,
    },
    {
      path: '/login',
      component: LoginComponent,
    },
    {
      path: '/active-streams',
      component: ActiveStreamsComponent,
    },
    {
      path: '/legal-disclaimer',
      component: LegalDisclaimer,
    },
    {
      path: "**",
      component: NotFoundComponent,
    }
  ]
})
