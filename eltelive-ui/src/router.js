import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SignUp from '@/components/User/SignUp'
import Guest from '@/components/User/Guest'
import Profile from '@/components/User/Profile'
import Login from '@/components/User/Login'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import ActiveStreams from '@/components/Stream/ActiveStreams'
import CreateStream from '@/components/Stream/CreateStream'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/guest',
      name: 'Guest',
      component: Guest
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/active-stream',
      name: 'ActiveStream',
      component: ActiveStreams
    },
    {
      path: '/create-stream',
      name: 'CreateStream',
      component: CreateStream
    },
    {
      path: '/legal-disclaimer',
      name: 'LegalDisclaimer',
      component: LegalDisclaimer
    }
  ],
  mode: 'history'
})