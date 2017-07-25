
import Vue from 'vue'
import store from './store/'
import VueResource from "vue-resource"


import App from './App'
import router from './router'
import mock from './mock/mock'
import './common/css/reset.css'

Vue.config.productionTip = false
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
	request.credentials = true
  	request.headers.set('Content-Type', 'application/json;charset=UTF-8');
	next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App></App>',
  components: { App}
})
