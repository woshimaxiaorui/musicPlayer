// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazy from 'vue-lazyload'
import Axios from 'axios';
import VueJsonp from 'vue-jsonp'
import store from './store'

import './common/style/reset.css' //引入重置样式
import Banner from './components/common/Banner.vue'

Vue.prototype.$bannerG = Banner;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

Vue.use(VueJsonp);
Vue.use(lazy,{
  loading: require('./assets/logo.png'),//在js 中通过require 加载图片
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
