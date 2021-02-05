import Vue from 'vue';
import Router from 'vue-router';
import HomePageComponent from '@/components/home';
import AboutComponent from '@/components/about-us';
import ContactComponent from '@/components/contact-us';
import SignUpComponent from '@/components/user/signUp';
import GuestComponent from '@/components/user/guest';
import ProfileComponent from '@/components/user/profile';
import LoginComponent from '@/components/user/login';
import LegalDisclaimer from '@/components/legal-disclaimer';
import ActiveStreamsComponent from '@/components/stream/activeStream'
import CreateStreamComponent from '@/components/stream/createStream';
import NotFoundComponent from '@/components/notFoundPage';

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
