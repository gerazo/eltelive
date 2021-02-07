import Vue from 'vue';
import Router from 'vue-router';
import HomePageComponent from '@/components/home-page';
import AboutComponent from '@/components/about-us';
import ContactComponent from '@/components/contact-us';
import SignUpComponent from '@/components/user/sign-up';
import GuestComponent from '@/components/user/login-as-guest';
import ProfileComponent from '@/components/user/profile';
import LoginComponent from '@/components/user/login';
import LegalDisclaimer from '@/components/legal-disclaimer';
import ActiveStreamsComponent from '@/components/stream/active-stream'
import CreateStreamComponent from '@/components/stream/create-stream';
import NotFoundComponent from '@/components/not-found-page';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
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
      path: '/active-stream',
      component: ActiveStreamsComponent,
    },
    {
      path: '/create-stream',
      component: CreateStreamComponent,
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
