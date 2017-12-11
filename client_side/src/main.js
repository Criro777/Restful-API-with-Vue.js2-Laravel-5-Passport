// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import API from './API'
import axios from 'axios'
import router from './router'
import AUTH from './components/auth/AUTH'

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH.getToken();

window.axios = axios;
window.API = API;


Vue.config.productionTip = false;

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forGuest)) {
      if (AUTH.isAuthenticated()) {
        next({
          path: '/companies'
        })
      } else {
        next()
      }
    }

    else if (to.matched.some(record => record.meta.forAuth)) {
      if (!AUTH.isAuthenticated()) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }

    else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
