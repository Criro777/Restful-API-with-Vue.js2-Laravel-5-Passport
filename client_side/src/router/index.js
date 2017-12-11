import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import Companies from '../components/Companies'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        forGuest: true
      }
    },

    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        forGuest: true
      }
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        forGuest: true
      }

    },

    {
      path: '/companies',
      name: 'Companies',
      component: Companies,
      meta: {
        forAuth: true
      }
    }
  ]
})
