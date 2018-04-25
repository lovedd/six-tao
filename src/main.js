// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import './assets/css/base.css'
import './assets/css/login.css'
import './assets/css/product.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: '../static/loading/loading-bars.svg',
  error: '../static/ok-2.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
