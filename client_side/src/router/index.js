import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import Companies from '../components/Companies'
import CompanyCreate from '@/components/CompanyCreate'
import CompanyEdit from '@/components/CompanyEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
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
    },

    {
      path: '/companies/create',
      name: 'CompanyCreate',
      component: CompanyCreate,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/companies/edit/:id',
      name: 'CompanyEdit',
      component: CompanyEdit,
      meta: {
        forAuth: true
      }
    }
  ]
})
